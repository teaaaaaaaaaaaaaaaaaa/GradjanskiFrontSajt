# Firebase Cloud Functions for Građanski Front

This directory contains Firebase Cloud Functions used by the Građanski Front website.

## Setup Instructions

### Prerequisites

1. Node.js (v14 or later)
2. Firebase CLI (`npm install -g firebase-tools`)
3. A Firebase project
4. Brevo (formerly Sendinblue) account for email sending

### Configuration

1. Log in to Firebase:
   ```
   firebase login
   ```

2. Initialize Firebase in your project (if not already done):
   ```
   firebase init
   ```
   Select "Functions" when prompted for which Firebase features to set up.

3. Set up Brevo for email sending:
   
   a. Create a Brevo account at https://www.brevo.com/ if you don't have one
   
   b. Go to the SMTP & API section in your Brevo account
   
   c. Get your SMTP credentials (server, port, login, and API key)
   
   d. Set up environment variables for Brevo in Firebase:
   ```
   firebase functions:config:set brevo.user="your-brevo-smtp-login" brevo.key="your-brevo-smtp-key" brevo.sender="noreply@gradjanskifront.rs"
   ```

### Dependencies

Install the required dependencies:

```
cd functions
npm install nodemailer cors
```

### CORS Configuration

The HTTP endpoint supports CORS for cross-origin requests. By default, it allows requests from any origin. If you want to restrict it to specific domains, modify the CORS configuration in the `sendEmailHttp` function:

```javascript
const cors = require('cors')({ 
  origin: ['https://gradjanskifront.rs', 'http://localhost:5175'] 
});
```

### Deployment

Deploy the functions to Firebase:

```
firebase deploy --only functions
```

## Available Functions

### sendEmail (Callable)

This function sends emails using predefined templates and is callable from Firebase client SDKs.

**Usage:**

```javascript
const functions = getFunctions();
const sendEmailFunction = httpsCallable(functions, 'sendEmail');

const result = await sendEmailFunction({
  to: 'recipient@example.com',
  subject: 'Optional custom subject',
  template: 'welcome-member',
  templateData: {
    firstName: 'John',
    telegramLink: 'https://t.me/+xVyPlEJOyX4xODY0',
    // Other template-specific data
  }
});
```

### sendEmailHttp (HTTP Endpoint)

This function provides an HTTP endpoint for sending emails, which can be useful for server-to-server communication or when the Firebase client SDK isn't available.

**Usage:**

```javascript
const response = await fetch('https://us-central1-gradjanskifront.cloudfunctions.net/sendEmailHttp', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: 'recipient@example.com',
    subject: 'Optional custom subject',
    template: 'welcome-member',
    templateData: {
      firstName: 'John',
      telegramLink: 'https://t.me/+xVyPlEJOyX4xODY0',
      // Other template-specific data
    }
  }),
});

const result = await response.json();
```

**Available Templates:**

1. `welcome-member` - Sends a welcome email to new members with information about Zbor meetings
   - Required data: `firstName`, `telegramLink`

## Firestore Collections

The functions interact with the following Firestore collections:

- `members` - Stores information about registered members
- `emailLogs` - Logs all sent emails for tracking purposes

## Development Mode

When running in development mode (localhost), the application will simulate successful API calls without actually making requests to Firebase. This helps with development and testing without hitting API limits or requiring a full Firebase setup.

## Using Brevo for Email Sending

Brevo (formerly Sendinblue) is a reliable email service provider that offers a free tier with up to 300 emails per day. It provides better deliverability than using Gmail SMTP and doesn't require enabling less secure apps.

### Benefits of using Brevo:

1. Better email deliverability
2. No need for Gmail "less secure apps" settings
3. Free tier with 300 emails/day
4. Detailed email analytics
5. Compliance with email regulations

### Setting up Brevo:

1. Create a Brevo account at https://www.brevo.com/
2. Verify your domain for better deliverability
3. Create an SMTP key in the SMTP & API section
4. Configure the Firebase function with your Brevo credentials

## Troubleshooting

- Check the Firebase Functions logs in the Firebase Console
- Verify that all required environment variables are set correctly
- For CORS issues, make sure your domain is included in the allowed origins
- Check your Brevo dashboard for email sending status and analytics 