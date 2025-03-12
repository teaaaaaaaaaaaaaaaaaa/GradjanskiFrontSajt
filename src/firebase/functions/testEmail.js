const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

/**
 * Simple test function to send an email directly through Brevo
 */
exports.testEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Create a nodemailer transporter using Brevo
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: functions.config().brevo.user,
          pass: functions.config().brevo.key,
        },
      });

      // Get email from query parameter or use default
      const to = req.query.email || 'vukasin.lukic.sr@gmail.com';
      
      // Send a test email
      const mailOptions = {
        from: `"Građanski Front Test" <${functions.config().brevo.sender}>`,
        to: to,
        subject: 'Test Email from Građanski Front',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
            <h2 style="color: #e53e3e;">Test Email</h2>
            <p>Ovo je test email sa Građanskog Fronta.</p>
            <p>Vreme slanja: ${new Date().toLocaleString('sr-RS')}</p>
            <p>Ako ste primili ovaj email, znači da je konfiguracija Brevo servisa uspešna.</p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);

      return res.status(200).json({
        success: true,
        message: 'Test email sent successfully',
        messageId: info.messageId,
        to: to
      });
    } catch (error) {
      console.error('Error sending test email:', error);
      
      return res.status(500).json({
        success: false,
        error: 'Failed to send test email',
        details: error.message
      });
    }
  });
}); 