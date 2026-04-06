const express = require('express');
const router = express.Router();
const messageHandler = require('../services/messageHandler');
const { validateWebhook } = require('../config/twilio');

/**
 * Webhook endpoint for receiving incoming SMS messages from Twilio
 * POST /webhook/sms
 */
router.post('/sms', async (req, res) => {
  try {
    const { From, To, Body, MessageSid } = req.body;
    
    // Validate Twilio webhook signature for security (optional but recommended)
    // Temporarily disabled for testing - ENABLE THIS IN PRODUCTION!
    // const skipValidation = req.query.test === 'true';
    
    if (process.env.NODE_ENV === 'production'){ //&& !skipValidation) {
      const signature = req.headers['x-twilio-signature'];
      const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
      
      if (!validateWebhook(signature, url, req.body)) {
        console.error('Invalid Twilio signature');
        return res.status(403).send('Forbidden');
      }
    }
    
    console.log('Received SMS:', {
      from: From,
      to: To,
      body: Body,
      messageSid: MessageSid
    });

    // Validate required fields
    if (!From || !Body) {
      console.error('Missing required fields in webhook request');
      return res.status(400).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
    }

    // Process the message asynchronously
    messageHandler.handleMessage(From, Body)
      .then(result => {
        console.log('Message processed successfully:', result);
      })
      .catch(error => {
        console.error('Error processing message:', error);
      });

    // Respond immediately to Twilio with empty TwiML (200 OK)
    // Twilio expects TwiML response
    res.type('text/xml');
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');

  } catch (error) {
    console.error('Webhook error:', error);
    res.type('text/xml');
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
  }
});

/**
 * Webhook endpoint for message status callbacks (optional)
 * POST /webhook/status
 */
router.post('/status', (req, res) => {
  try {
    const { MessageSid, MessageStatus, To, From } = req.body;
    
    console.log('Message status update:', {
      messageSid: MessageSid,
      status: MessageStatus,
      to: To,
      from: From
    });

    res.type('text/xml');
    res.send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
  } catch (error) {
    console.error('Status callback error:', error);
    res.type('text/xml');
    res.status(500).send('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
  }
});

/**
 * Health check endpoint
 * GET /webhook/health
 */
router.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    service: 'DSA Quiz Bot',
    provider: 'Twilio',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

 
