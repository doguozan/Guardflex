import jwt from 'jsonwebtoken';

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      return null;
    }
    return 'dev-only-insecure-secret-change-with-JWT_SECRET';
  }
  return secret;
}

/**
 * Vercel API handler: yetkisizse res + false, yetkiliyse token payload
 */
export function requireAuthVercel(req, res) {
  const secret = getJwtSecret();
  if (!secret) {
    res.status(500).json({ error: 'Server misconfiguration: JWT_SECRET' });
    return false;
  }

  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : null;
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  try {
    const payload = jwt.verify(token, secret);
    return {
      sub: String(payload.sub),
      username: payload.username,
      role: payload.role,
    };
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
    return false;
  }
}
