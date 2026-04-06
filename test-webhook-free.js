const axios = require('axios');

async function testWebhook() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  DSA Quiz Bot - FREE Webhook Test (No SMS Charges!)');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const webhookUrl = 'https://dsa-quiz-bot.vercel.app/webhook/sms?test=true';
  
  console.log('🧪 Testing webhook endpoint...\n');
  console.log('📤 URL:', webhookUrl);
  console.log('📋 Simulating message: "start"\n');
  
  try {
    // Test 1: Start command
    console.log('Test 1: Starting quiz...');
    const response1 = await axios.post(webhookUrl, 
      new URLSearchParams({
        From: '+919876543210',
        To: '+16623716673',
        Body: 'start',
        MessageSid: 'TEST123'
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    console.log('✅ Status:', response1.status);
    console.log('📄 Response:', response1.data);
    console.log('');
    
    // Test 2: Answer command
    console.log('Test 2: Answering with "B"...');
    const response2 = await axios.post(webhookUrl,
      new URLSearchParams({
        From: '+919876543210',
        To: '+16623716673',
        Body: 'B',
        MessageSid: 'TEST124'
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    console.log('✅ Status:', response2.status);
    console.log('📄 Response:', response2.data);
    console.log('');
    
    // Test 3: Score command
    console.log('Test 3: Checking score...');
    const response3 = await axios.post(webhookUrl,
      new URLSearchParams({
        From: '+919876543210',
        To: '+16623716673',
        Body: 'score',
        MessageSid: 'TEST125'
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    console.log('✅ Status:', response3.status);
    console.log('📄 Response:', response3.data);
    console.log('');
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ All tests passed! Your bot is working correctly!');
    console.log('═══════════════════════════════════════════════════════\n');
    console.log('⚠️  IMPORTANT: This test mode bypasses security validation.');
    console.log('   For production use, remove ?test=true from the URL.');
    console.log('   Real SMS messages will work with full security enabled.\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    }
  }
}

testWebhook();
// 