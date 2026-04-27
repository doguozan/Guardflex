// GET, PUT /api/admin/settings
import connectDB from '../../server/lib/vercelMongoConnect.js';
import Settings from '../../server/models/Settings.js';
import { requireAuthVercel } from '../../server/lib/adminAuthVercel.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  const auth = requireAuthVercel(req, res);
  if (!auth) return;

  if (req.method === 'GET') {
    try {
      await connectDB();
      const settings = await Settings.getSettings();
      return res.status(200).json(settings);
    } catch (error) {
      console.error('Error loading settings:', error);
      return res.status(500).json({ error: 'Failed to load settings' });
    }
  }

  if (req.method === 'PUT') {
    try {
      await connectDB();
      const settings = await Settings.getSettings();
      const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

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
      return res.status(200).json({ message: 'Settings updated', settings });
    } catch (error) {
      console.error('Error updating settings:', error);
      return res.status(500).json({ error: 'Failed to update settings' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
