const axios = require('axios');

async function testWebhook() {
  console.log('🧪 Testing Webhook Endpoint...\n');
  
  const webhookUrl = 'https://dsa-quiz-bot.vercel.app/webhook/sms';
  
  // Simulate Twilio webhook request
  const testData = {
    From: '+919876543210',
    To: '+16623716673',
    Body: 'start',
    MessageSid: 'SM' + Math.random().toString(36).substring(2, 15)
  };
  
  console.log('📤 Sending test request to:', webhookUrl);
  console.log('📋 Test data:', testData);
  console.log('');
  
  try {
    const response = await axios.post(webhookUrl, 
      new URLSearchParams(testData).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        validateStatus: () => true // Accept any status code
      }
    );
    
    console.log('📥 Response Status:', response.status);
    console.log('📄 Response Data:', response.data);
    console.log('');
    
    if (response.status === 403) {
      console.log('⚠️  Got 403 Forbidden - This is expected!');
      console.log('The webhook validates Twilio signatures for security.');
      console.log('This means the webhook is working correctly.\n');
      console.log('✅ Deployment is working!');
      console.log('To test with actual SMS, send a message to: +16623716673');
    } else if (response.status === 200) {
      console.log('✅ Webhook responded successfully!');
    } else {
      console.log('⚠️  Unexpected response status');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testWebhook();

 
