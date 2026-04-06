/**
 * Test script for DSA Quiz Bot
 * This simulates SMS interactions without requiring actual SMS
 */

const messageHandler = require('../services/messageHandler');
const quizManager = require('../services/quizManager');

// Mock phone number for testing
const TEST_PHONE = '+1234567890';

// Mock sendSMS function to avoid actual SMS sending during tests
const originalSendSMS = require('../config/twilio').sendSMS;
require('../config/twilio').sendSMS = async (to, text) => {
  console.log('\n📱 SMS Response:');
  console.log('To:', to);
  console.log('Message:', text);
  console.log('-'.repeat(60));
  return { sid: 'test-sid', status: 'sent' };
};

/**
 * Simulate user sending an SMS
 */
async function simulateSMS(from, text) {
  console.log('\n📨 User SMS:');
  console.log('From:', from);
  console.log('Message:', text);
  console.log('-'.repeat(60));
  
  await messageHandler.handleMessage(from, text);
  
  // Add delay to simulate real-world timing
  await new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Run test scenarios
 */
async function runTests() {
  console.log('='.repeat(60));
  console.log('🧪 DSA Quiz Bot - Test Suite (Twilio)');
  console.log('='.repeat(60));

  try {
    // Test 1: Help command
    console.log('\n📋 Test 1: HELP Command');
    await simulateSMS(TEST_PHONE, 'HELP');

    // Test 2: Start quiz
    console.log('\n📋 Test 2: START Quiz');
    await simulateSMS(TEST_PHONE, 'START');

    // Test 3: Answer question (correct)
    console.log('\n📋 Test 3: Answer Question (Correct)');
    await simulateSMS(TEST_PHONE, 'A');

    // Test 4: Get next question
    console.log('\n📋 Test 4: NEXT Question');
    await simulateSMS(TEST_PHONE, 'NEXT');

    // Test 5: Answer question (incorrect)
    console.log('\n📋 Test 5: Answer Question (Incorrect)');
    await simulateSMS(TEST_PHONE, 'D');

    // Test 6: Check status
    console.log('\n📋 Test 6: STATUS Check');
    await simulateSMS(TEST_PHONE, 'STATUS');

    // Test 7: Continue quiz
    console.log('\n📋 Test 7: Continue Quiz (Multiple Questions)');
    for (let i = 0; i < 5; i++) {
      await simulateSMS(TEST_PHONE, 'NEXT');
      await simulateSMS(TEST_PHONE, ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]);
    }

    // Test 8: Check status again
    console.log('\n📋 Test 8: STATUS Check (Mid-Quiz)');
    await simulateSMS(TEST_PHONE, 'STATUS');

    // Test 9: Complete remaining questions
    console.log('\n📋 Test 9: Complete Quiz');
    const session = quizManager.sessions.get(TEST_PHONE);
    const remaining = 10 - session.askedQuestions.length;
    
    for (let i = 0; i < remaining; i++) {
      await simulateSMS(TEST_PHONE, 'NEXT');
      await simulateSMS(TEST_PHONE, 'A');
    }

    // Test 10: Try to continue after completion
    console.log('\n📋 Test 10: Try NEXT After Completion');
    await simulateSMS(TEST_PHONE, 'NEXT');

    // Test 11: Start new quiz
    console.log('\n📋 Test 11: Start New Quiz');
    await simulateSMS(TEST_PHONE, 'START');

    // Test 12: Quit quiz
    console.log('\n📋 Test 12: QUIT Quiz');
    await simulateSMS(TEST_PHONE, 'QUIT');

    // Test 13: Invalid command
    console.log('\n📋 Test 13: Invalid Command');
    await simulateSMS(TEST_PHONE, 'INVALID');

    // Test 14: Invalid answer
    console.log('\n📋 Test 14: Invalid Answer Format');
    await simulateSMS(TEST_PHONE, 'START');
    await simulateSMS(TEST_PHONE, 'E');

    console.log('\n' + '='.repeat(60));
    console.log('✅ All tests completed successfully!');
    console.log('='.repeat(60));

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.error(error.stack);
  }
}

// Run tests if executed directly
if (require.main === module) {
  runTests().then(() => {
    console.log('\n👋 Test suite finished. Exiting...');
    process.exit(0);
  }).catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { runTests, simulateSMS };

 
