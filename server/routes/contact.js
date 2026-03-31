// Express Router for Contact Form
import express from 'express';
import Contact from '../models/Contact.js';
import { requireAuth } from '../middleware/auth.js';
import { sendContactFormNotification } from '../services/mail.js';

const router = express.Router();

const MAX_LEN = { name: 200, email: 320, phone: 50, subject: 200, message: 8000 };

function trimStr(v, max) {
  if (v == null) return '';
  const s = String(v).trim();
  return s.length > max ? s.slice(0, max) : s;
}

// POST submit contact form (public)
router.post('/', async (req, res) => {
  try {
    let { name, email, phone, message, subject } = req.body;

    name = trimStr(name, MAX_LEN.name);
    email = trimStr(email, MAX_LEN.email).toLowerCase();
    phone = trimStr(phone, MAX_LEN.phone);
    message = trimStr(message, MAX_LEN.message);
    subject = trimStr(subject, MAX_LEN.subject);

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, message' 
      });
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Get IP address
    const ipAddress = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'];

    // Save to database
    const contactSubmission = await Contact.create({
      name,
      email,
      phone,
      message,
      subject,
      ipAddress,
      status: 'new'
    });

    console.log('Contact form submission saved:', contactSubmission._id);

    const mailResult = await sendContactFormNotification({
      name,
      email,
      phone,
      message,
      subject,
      id: contactSubmission._id,
    });
    if (!mailResult.sent && mailResult.reason !== 'not_configured') {
      console.error('[contact] Speicherung OK, E-Mail-Benachrichtigung fehlgeschlagen:', mailResult.reason);
    }

    res.status(200).json({ 
      success: true,
      message: 'Contact form submitted successfully',
      id: contactSubmission._id
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
});

// GET all contact submissions (admin only)
router.get('/', requireAuth, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(100);
    
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// GET single contact submission (admin only)
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({ error: 'Failed to fetch contact' });
  }
});

// PUT update contact status (admin only)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    res.json({ message: 'Contact updated', contact });
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

export { router as contactRouter };

