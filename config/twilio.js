const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

/**
 * Send SMS message using Twilio API
 * @param {string} to - Recipient phone number (E.164 format)
 * @param {string} text - Message text
 * @returns {Promise} - Promise resolving to message response
 */
async function sendSMS(to, text) {
  try {
    const message = await client.messages.create({
      body: text,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });
    
    console.log('Message sent successfully:', {
      sid: message.sid,
      status: message.status,
      to: message.to
    });
    
    return message;
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
}

/**
 * Validate Twilio webhook signature for security
 * @param {string} signature - X-Twilio-Signature header
 * @param {string} url - Full webhook URL
 * @param {Object} params - Request parameters
 * @returns {boolean} - True if signature is valid
 */
function validateWebhook(signature, url, params) {
  return twilio.validateRequest(
    process.env.TWILIO_AUTH_TOKEN,
    signature,
    url,
    params
  );
}

module.exports = {
  client,
  sendSMS,
  validateWebhook
};

 
