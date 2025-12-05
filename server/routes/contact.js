// Express Router for Contact Form
import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// POST submit contact form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, subject } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, message' 
      });
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

    // TODO: Send email notification
    // await sendEmail({ 
    //   to: 'guard.flex@hotmail.com', 
    //   subject: subject || 'New Contact Form Submission',
    //   message 
    // });

    console.log('Contact form submission saved:', contactSubmission._id);

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
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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

