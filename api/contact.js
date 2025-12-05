// Vercel Serverless Function for Contact Form API
module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const { name, email, phone, message, subject } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          error: 'Missing required fields: name, email, message' 
        });
      }

      // In production, save to database or send email
      console.log('Contact form submission:', {
        name,
        email,
        phone,
        subject,
        message,
        timestamp: new Date().toISOString()
      });

      // TODO: Send email notification or save to database
      // Example: await sendEmail({ to: 'guard.flex@hotmail.com', subject, message });

      return res.status(200).json({ 
        success: true,
        message: 'Contact form submitted successfully' 
      });
    } catch (error) {
      console.error('Contact form error:', error);
      return res.status(500).json({ error: 'Failed to submit contact form' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

