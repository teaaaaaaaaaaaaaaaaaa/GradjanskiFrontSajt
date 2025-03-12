const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({ origin: true });

// Initialize Firebase Admin
admin.initializeApp();

// Create a nodemailer transporter using Brevo (formerly Sendinblue)
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: functions.config().brevo.user, // your Brevo API user
    pass: functions.config().brevo.key, // your Brevo API key
  },
});

/**
 * Email templates
 */
const emailTemplates = {
  'welcome-member': (data) => {
    return {
      subject: 'Dobrodošli u Građanski Front',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://gradjanskifront.rs/logo.png" alt="Građanski Front Logo" style="max-width: 200px;">
          </div>
          
          <h2 style="color: #e53e3e; margin-bottom: 20px;">Poštovani ${data.firstName},</h2>
          
          <p style="margin-bottom: 15px; line-height: 1.5;">
            Vaša prijava za sazivanje zbora je propraćena.
          </p>
          
          <p style="margin-bottom: 15px; line-height: 1.5;">
            Sledi link ka Telegram grupi Vaše mesne zajednice:
            <a href="${data.telegramLink}" style="color: #e53e3e; text-decoration: underline;">${data.telegramLink}</a>
          </p>
          
          <p style="margin-bottom: 15px; line-height: 1.5;">
            Telegram grupa služi za svakodnevno komuniciranje i dogovor između građana na teritoriji istih mesnih zajednica. 
            Za uspešno prvo zasedanje Zbora, predlažemo sledeći dnevni red:
          </p>
          
          <ol style="margin-bottom: 20px; padding-left: 20px; line-height: 1.5;">
            <li>Usvajanje zapisnika prethodne sednice Zbora</li>
            <li>Usvajanje dnevnog reda</li>
            <li>Formiranje predloženih radnih grupa na nivou mesne zajednice</li>
            <li>Odabir moderatora i zapisničara za sledeći Zbor</li>
            <li>Razno</li>
          </ol>
          
          <p style="margin-bottom: 15px; line-height: 1.5;">
            U prilogu Vam šaljemo jednostavno uputstvo za uspešno organizovanje Zbora.
          </p>
          
          <div style="background-color: #f8f8f8; padding: 15px; border-left: 4px solid #e53e3e; margin: 20px 0;">
            <p style="margin: 0; line-height: 1.5;">
              <strong>Napomena:</strong> Ako imate bilo kakva pitanja ili vam je potrebna dodatna pomoć, 
              slobodno odgovorite na ovaj email ili nas kontaktirajte putem Telegram grupe.
            </p>
          </div>
          
          <p style="margin-top: 30px; line-height: 1.5;">
            S poštovanjem,<br>
            <strong>Tim Građanskog Fronta</strong>
          </p>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777; text-align: center;">
            <p>© ${new Date().getFullYear()} Građanski Front. Sva prava zadržana.</p>
            <p>
              <a href="https://gradjanskifront.rs/privacy-policy" style="color: #777; text-decoration: underline;">Politika privatnosti</a> | 
              <a href="https://gradjanskifront.rs/terms" style="color: #777; text-decoration: underline;">Uslovi korišćenja</a>
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'uputstvo-za-organizovanje-zbora.pdf',
          path: 'https://gradjanskifront.rs/documents/uputstvo-za-organizovanje-zbora.pdf',
          contentType: 'application/pdf',
        },
      ],
    };
  },
};

/**
 * HTTP Cloud Function to send emails (with CORS support)
 */
exports.sendEmailHttp = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // Only allow POST requests
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }

      const data = req.body;

      // Validate required fields
      if (!data.to || !data.template || !data.templateData) {
        return res.status(400).json({
          error: 'Bad Request',
          message: 'The request requires "to", "template", and "templateData" fields.'
        });
      }

      // Get template
      const template = emailTemplates[data.template];
      if (!template) {
        return res.status(404).json({
          error: 'Not Found',
          message: `Email template "${data.template}" not found.`
        });
      }

      // Generate email content
      const emailContent = template(data.templateData);

      // Send email
      const mailOptions = {
        from: `"Građanski Front" <${functions.config().brevo.sender}>`,
        to: data.to,
        subject: data.subject || emailContent.subject,
        html: emailContent.html,
        attachments: emailContent.attachments || [],
      };

      await transporter.sendMail(mailOptions);

      // Log email sent to Firestore
      await admin.firestore().collection('emailLogs').add({
        to: data.to,
        template: data.template,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        success: true,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);

      // Log email error to Firestore
      await admin.firestore().collection('emailLogs').add({
        to: data?.to,
        template: data?.template,
        sentAt: admin.firestore.FieldValue.serverTimestamp(),
        success: false,
        error: error.message,
      });

      return res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error sending email',
        details: error.message
      });
    }
  });
});

/**
 * Callable Cloud Function to send emails
 */
exports.sendEmail = functions.https.onCall(async (data, context) => {
  try {
    // Validate required fields
    if (!data.to || !data.template || !data.templateData) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'The function requires "to", "template", and "templateData" fields.'
      );
    }

    // Get template
    const template = emailTemplates[data.template];
    if (!template) {
      throw new functions.https.HttpsError(
        'not-found',
        `Email template "${data.template}" not found.`
      );
    }

    // Generate email content
    const emailContent = template(data.templateData);

    // Send email
    const mailOptions = {
      from: `"Građanski Front" <${functions.config().brevo.sender}>`,
      to: data.to,
      subject: data.subject || emailContent.subject,
      html: emailContent.html,
      attachments: emailContent.attachments || [],
    };

    await transporter.sendMail(mailOptions);

    // Log email sent to Firestore
    await admin.firestore().collection('emailLogs').add({
      to: data.to,
      template: data.template,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      success: true,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);

    // Log email error to Firestore
    await admin.firestore().collection('emailLogs').add({
      to: data.to,
      template: data.template,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      success: false,
      error: error.message,
    });

    throw new functions.https.HttpsError('internal', 'Error sending email', error);
  }
}); 