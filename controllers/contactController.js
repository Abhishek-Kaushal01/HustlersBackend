const ContactQuery = require('../models/ContactQuery');
const sendEmail = require('../utils/sendEmail');

// Handle contact form submissions
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }
    
    // Save contact query to database
    const contactQuery = await ContactQuery.create({
      name,
      email,
      subject,
      message
    });
    
    console.log('Contact query saved to database:', contactQuery._id);
    console.log('Admin email from env:', process.env.ADMIN_EMAIL);
    
    try {
      // Send email notification to admin
      await sendEmail({
        email: process.env.ADMIN_EMAIL,
        subject: `New Contact Form Submission: ${subject}`,
        message: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      });
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Continue execution even if email fails
      // We'll still return success since the data was saved
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Your message has been saved successfully!',
      data: contactQuery
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to process your message. Please try again later.' 
    });
  }
};