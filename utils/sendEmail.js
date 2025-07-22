const nodemailer = require('nodemailer');

const sendEmail = async ({ email, subject, message }) => {
  try {
    console.log('Attempting to send email to:', email);
    console.log('Using SMTP settings:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      // Password hidden for security
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Enable debugging
      logger: true,
      debug: true // Include SMTP traffic in the logs
    });

    // Verify connection configuration
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: `"Hustler Contact" <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      html: message,
    };

    console.log(`Sending email to: ${email}`);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

module.exports = sendEmail;
