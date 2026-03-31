// Express Router for Admin Operations
import express from 'express';
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';
import { signAdminToken, requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    
    // Find admin user
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Compare password
    const isMatch = await admin.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    const token = signAdminToken(admin);

    res.json({ 
      success: true, 
      message: 'Login successful',
      token,
      admin: {
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

router.get('/me', requireAuth, (req, res) => {
  res.json({
    username: req.admin.username,
    role: req.admin.role,
  });
});

// Get admin settings
router.get('/settings', requireAuth, async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error loading settings:', error);
    res.status(500).json({ error: 'Failed to load settings' });
  }
});

// Update admin settings (patch; verschachtelte Objekte werden zusammengeführt)
router.put('/settings', requireAuth, async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    const b = req.body || {};

    if (b.siteName !== undefined) settings.siteName = b.siteName;

    if (b.hero !== undefined) {
      const cur = settings.hero?.toObject?.() ?? settings.hero ?? {};
      settings.hero = { ...cur, ...b.hero };
      settings.markModified('hero');
    }

    if (b.contactInfo !== undefined) {
      const cur = settings.contactInfo?.toObject?.() ?? settings.contactInfo ?? {};
      settings.contactInfo = { ...cur, ...b.contactInfo };
      settings.markModified('contactInfo');
    }

    if (b.socialMedia !== undefined) {
      const cur = settings.socialMedia?.toObject?.() ?? settings.socialMedia ?? {};
      settings.socialMedia = { ...cur, ...b.socialMedia };
      settings.markModified('socialMedia');
    }

    if (b.cms !== undefined && typeof b.cms === 'object') {
      const cur =
        settings.cms && typeof settings.cms === 'object' && !Array.isArray(settings.cms)
          ? settings.cms
          : {};
      const next = { ...cur };
      const deepMergeKeys = new Set(['history', 'branding']);
      for (const [k, v] of Object.entries(b.cms)) {
        if (v === undefined) continue;
        if (deepMergeKeys.has(k) && v && typeof v === 'object' && !Array.isArray(v)) {
          next[k] = { ...(cur[k] && typeof cur[k] === 'object' ? cur[k] : {}), ...v };
        } else {
          next[k] = v;
        }
      }
      settings.cms = next;
      settings.markModified('cms');
    }

    if (b.legal !== undefined && typeof b.legal === 'object') {
      const cur = settings.legal?.toObject?.() ?? settings.legal ?? {};
      settings.legal = { ...cur, ...b.legal };
      settings.markModified('legal');
    }

    await settings.save();
    res.json({ message: 'Settings updated', settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export { router as adminRouter };

