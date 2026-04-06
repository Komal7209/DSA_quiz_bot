const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function testBot() {
  console.log('🧪 Testing DSA Quiz Bot Deployment...\n');
  
  // Check environment variables
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    console.error('❌ Missing Twilio credentials in .env file');
    process.exit(1);
  }
  
  console.log('✅ Environment variables loaded');
  console.log(`📱 Twilio Number: ${process.env.TWILIO_PHONE_NUMBER}\n`);
  
  // Test phone number (you can change this to your actual phone number)
  const testPhoneNumber = process.env.TEST_PHONE_NUMBER || '+919876543210';
  
  console.log(`📤 Sending test message to: ${testPhoneNumber}`);
  console.log('💬 Message: "start"\n');
  
  try {
    // Send a test SMS
    const message = await client.messages.create({
      body: 'start',
      from: process.env.TWILIO_PHONE_NUMBER,
      to: testPhoneNumber
    });
    
    console.log('✅ Message sent successfully!');
    console.log(`📋 Message SID: ${message.sid}`);
    console.log(`📊 Status: ${message.status}`);
    console.log(`💰 Price: ${message.price || 'Pending'} ${message.priceUnit || ''}`);
    console.log(`📍 Direction: ${message.direction}\n`);
    
    console.log('🎯 What happens next:');
    console.log('1. Twilio receives your message');
    console.log('2. Twilio sends webhook request to: https://dsa-quiz-bot.vercel.app/webhook/sms');
    console.log('3. Your bot processes the message');
    console.log('4. Bot sends response back through Twilio');
    console.log(`5. You receive the quiz question at ${testPhoneNumber}\n`);
    
    console.log('⏳ Waiting for response... (check your phone)');
    console.log('📱 You should receive a welcome message and first quiz question\n');
    
    // Wait a bit and check message status
    setTimeout(async () => {
      try {
        const updatedMessage = await client.messages(message.sid).fetch();
        console.log(`📊 Updated Status: ${updatedMessage.status}`);
        
        if (updatedMessage.status === 'delivered') {
          console.log('✅ Message delivered successfully!');
        } else if (updatedMessage.status === 'failed') {
          console.log('❌ Message delivery failed');
          console.log(`Error: ${updatedMessage.errorMessage}`);
        }
      } catch (error) {
        console.error('Error checking message status:', error.message);
      }
    }, 5000);
    
  } catch (error) {
    console.error('❌ Error sending message:', error.message);
    
    if (error.code === 21211) {
      console.error('\n⚠️  Invalid phone number format');
      console.error('Please use E.164 format: +[country code][number]');
      console.error('Example: +919876543210 for India');
    } else if (error.code === 21608) {
      console.error('\n⚠️  Unverified phone number');
      console.error('For Twilio trial accounts, you need to verify the recipient number first');
      console.error('Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/verified');
    }
    
    process.exit(1);
  }
}

// Run the test
testBot();
