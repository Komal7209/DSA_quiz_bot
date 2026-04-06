const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const webhookRoutes = require('./routes/webhook');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/webhook', webhookRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'DSA Quiz Bot',
    version: '1.0.0',
    status: 'running',
    provider: 'Twilio',
    endpoints: {
      webhook: '/webhook/sms',
      statusCallback: '/webhook/status',
      health: '/webhook/health'
    },
    description: 'Real-time Data Structures & Algorithms Quiz Bot using Twilio SMS API'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: 'The requested endpoint does not exist'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: err.message 
  });
});

// Start server only in local/runtime mode, not when imported by Vercel
let server = null;

function logStartup() {
  console.log('='.repeat(50));
  console.log('🤖 DSA Quiz Bot Server Started');
  console.log('='.repeat(50));
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🌐 Local URL: http://localhost:${PORT}`);
  console.log(`📥 Webhook URL: http://localhost:${PORT}/webhook/sms`);
  console.log(`💚 Health check: http://localhost:${PORT}/webhook/health`);
  console.log('='.repeat(50));
  console.log('📝 Available Commands:');
  console.log('   START - Begin a new quiz');
  console.log('   A/B/C/D - Answer questions');
  console.log('   NEXT - Get next question');
  console.log('   STATUS - Check progress');
  console.log('   HELP - Show commands');
  console.log('   QUIT - End quiz');
  console.log('='.repeat(50));

  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.warn('⚠️  WARNING: Twilio API credentials not configured!');
    console.warn('   Please set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN in .env file');
  }

  if (!process.env.TWILIO_PHONE_NUMBER) {
    console.warn('⚠️  WARNING: Twilio phone number not configured!');
    console.warn('   Please set TWILIO_PHONE_NUMBER in .env file');
  }
}

if (require.main === module) {
  server = app.listen(PORT, () => {
    logStartup();
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
    });
  });

  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down gracefully...');
    process.exit(0);
  });
}

module.exports = app;

