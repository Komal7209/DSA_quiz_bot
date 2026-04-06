const twilio = require('twilio');
require('dotenv').config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function testInbound() {
  console.log('🧪 Testing Inbound Message to Your Bot\n');
  
  // Your Twilio number that has the webhook configured
  const twilioNumber = '+16623716673';
  
  // A verified test number (must be verified in Twilio Console for trial accounts)
  const testPhoneNumber = '+18777804236'; // Change this to your verified number
  
  console.log('📱 Simulating: Someone sends "start" TO your Twilio number');
  console.log(`   From: ${testPhoneNumber}`);
  console.log(`   To: ${twilioNumber}`);
  console.log('');
  
  try {
    // Send a message TO your Twilio number
    // This will trigger the webhook and your bot will respond
    const message = await client.messages.create({
      body: 'start',
      from: testPhoneNumber,  // The sender (must be verified for trial)
      to: twilioNumber        // Your Twilio number (triggers webhook)
    });
    
    console.log('✅ Message sent successfully!');
    console.log(`📋 Message SID: ${message.sid}`);
    console.log(`📊 Status: ${message.status}`);
    console.log('');
    console.log('🔄 What happens next:');
    console.log('1. Twilio receives the message');
    console.log('2. Twilio calls your webhook: https://dsa-quiz-bot.vercel.app/webhook/sms');
    console.log('3. Your bot processes "start" command');
    console.log('4. Bot sends quiz question back to ' + testPhoneNumber);
    console.log('');
    console.log('⏳ Check the phone ' + testPhoneNumber + ' for the quiz question!');
    console.log('');
    
    // Wait and check status
    setTimeout(async () => {
      try {
        const updated = await client.messages(message.sid).fetch();
        console.log(`📊 Message Status: ${updated.status}`);
        
        if (updated.status === 'delivered') {
          console.log('✅ Message delivered! Check your phone for the quiz.');
        } else if (updated.status === 'failed') {
          console.log('❌ Message failed:', updated.errorMessage);
        }
      } catch (err) {
        console.error('Error checking status:', err.message);
      }
    }, 3000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 21211) {
      console.error('\n⚠️  Invalid phone number format');
      console.error('Use E.164 format: +[country code][number]');
    } else if (error.code === 21608) {
      console.error('\n⚠️  Unverified phone number');
      console.error('For trial accounts, verify the number at:');
      console.error('https://console.twilio.com/us1/develop/phone-numbers/manage/verified');
    } else if (error.code === 21606) {
      console.error('\n⚠️  The "From" number is not a valid, SMS-capable inbound phone number');
      console.error('You need to use a verified phone number for testing');
    }
  }
}

console.log('═══════════════════════════════════════════════════════');
console.log('  DSA Quiz Bot - Inbound Message Test');
console.log('═══════════════════════════════════════════════════════\n');

testInbound();

 
