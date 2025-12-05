// Express Router for Admin Operations
import express from 'express';
import Admin from '../models/Admin.js';
import Settings from '../models/Settings.js';

const router = express.Router();

// TODO: Add authentication middleware
// const authenticateAdmin = require('../middleware/auth');

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
    
    // TODO: Generate JWT token
    res.json({ 
      success: true, 
      message: 'Login successful',
      admin: {
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
      // token: generateToken(admin)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get admin settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    console.error('Error loading settings:', error);
    res.status(500).json({ error: 'Failed to load settings' });
  }
});

// Update admin settings
router.put('/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }
    
    res.json({ message: 'Settings updated', settings });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export { router as adminRouter };

