import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const s = await Settings.getSettings();
    const o = s.toObject();
    res.json({
      siteName: o.siteName,
      hero: o.hero || {},
      contactInfo: o.contactInfo || {},
      socialMedia: o.socialMedia || {},
      cms: o.cms && typeof o.cms === 'object' ? o.cms : {},
      legal: o.legal || {},
    });
  } catch (error) {
    console.error('Public site payload error:', error);
    res.status(500).json({ error: 'Failed to load site' });
  }
});

export { router as siteRouter };
