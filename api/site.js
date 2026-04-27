// GET /api/site — public site content (Vercel; Express yok)
import connectDB from '../server/lib/vercelMongoConnect.js';
import Settings from '../server/models/Settings.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await connectDB();
    const s = await Settings.getSettings();
    const o = s.toObject();
    return res.status(200).json({
      siteName: o.siteName,
      hero: o.hero || {},
      contactInfo: o.contactInfo || {},
      socialMedia: o.socialMedia || {},
      cms: o.cms && typeof o.cms === 'object' ? o.cms : {},
      legal: o.legal || {},
    });
  } catch (error) {
    console.error('Public site payload error:', error);
    return res.status(500).json({ error: 'Failed to load site' });
  }
}
