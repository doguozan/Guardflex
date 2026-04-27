// GET /api/admin/me
import { requireAuthVercel } from '../../server/lib/adminAuthVercel.js';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const auth = requireAuthVercel(req, res);
  if (!auth) return;
  return res.status(200).json({ username: auth.username, role: auth.role });
}
