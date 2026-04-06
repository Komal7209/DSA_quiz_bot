const quizManager = require('./quizManager');
const twilio = require('../config/twilio');

/**
 * Message Handler - Processes incoming SMS messages and generates responses
 */
class MessageHandler {
  /**
   * Process incoming SMS message
   * @param {string} from - Sender's phone number
   * @param {string} text - Message text
   * @returns {Promise} - Promise resolving to response
   */
  async handleMessage(from, text) {
    const command = text.trim().toUpperCase();
    
    try {
      let response;

      // Handle different commands
      switch (command) {
        case 'START':
        case 'BEGIN':
        case 'NEW':
          response = this.handleStart(from);
          break;
        
        case 'NEXT':
        case 'SKIP':
          response = this.handleNext(from);
          break;
        
        case 'STATUS':
        case 'SCORE':
          response = this.handleStatus(from);
          break;
        
        case 'HELP':
        case 'COMMANDS':
          response = this.handleHelp();
          break;
        
        case 'QUIT':
        case 'STOP':
        case 'END':
          response = this.handleQuit(from);
          break;
        
        default:
          // Check if it's an answer (A, B, C, or D)
          if (['A', 'B', 'C', 'D'].includes(command)) {
            response = this.handleAnswer(from, command);
          } else {
            response = this.handleUnknown();
          }
      }

      // Send SMS response
      await twilio.sendSMS(from, response);
      return { success: true, message: response };
      
    } catch (error) {
      console.error('Error handling message:', error);
      const errorMsg = 'Sorry, an error occurred. Please try again or reply HELP for assistance.';
      await twilio.sendSMS(from, errorMsg);
      return { success: false, error: error.message };
    }
  }

  /**
   * Handle START command
   */
  handleStart(phoneNumber) {
    const result = quizManager.startQuiz(phoneNumber);
    
    if (result.type === 'question') {
      return this.formatQuestion(result);
    }
    
    return result.message;
  }

  /**
   * Handle NEXT command
   */
  handleNext(phoneNumber) {
    const result = quizManager.getNextQuestion(phoneNumber);
    
    if (result.type === 'question') {
      return this.formatQuestion(result);
    } else if (result.type === 'quiz_complete') {
      return this.formatQuizComplete(result);
    }
    
    return result.message;
  }

  /**
   * Handle answer submission
   */
  handleAnswer(phoneNumber, answer) {
    const result = quizManager.processAnswer(phoneNumber, answer);
    
    if (result.type === 'answer_result') {
      return this.formatAnswerResult(result);
    }
    
    return result.message;
  }

  /**
   * Handle STATUS command
   */
  handleStatus(phoneNumber) {
    const result = quizManager.getStatus(phoneNumber);
    
    if (result.hasActiveSession) {
      return `📊 Quiz Status:\n` +
             `Score: ${result.score}/${result.questionsAnswered}\n` +
             `Questions remaining: ${result.questionsRemaining}\n\n` +
             `Reply NEXT for the next question.`;
    }
    
    return result.message;
  }

  /**
   * Handle HELP command
   */
  handleHelp() {
    return `🤖 DSA Quiz Bot Commands:\n\n` +
           `START - Begin a new quiz\n` +
           `A/B/C/D - Answer current question\n` +
           `NEXT - Get next question\n` +
           `STATUS - Check your progress\n` +
           `HELP - Show this message\n` +
           `QUIT - End current quiz\n\n` +
           `Reply START to begin!`;
  }

  /**
   * Handle QUIT command
   */
  handleQuit(phoneNumber) {
    const result = quizManager.endQuiz(phoneNumber);
    
    if (result.type === 'quiz_complete') {
      return this.formatQuizComplete(result) + '\n\nReply START to try again!';
    }
    
    quizManager.resetSession(phoneNumber);
    return 'Quiz ended. Reply START to begin a new quiz anytime!';
  }

  /**
   * Handle unknown command
   */
  handleUnknown() {
    return 'Unknown command. Reply HELP to see available commands.';
  }

  /**
   * Format question for SMS
   */
  formatQuestion(result) {
    const { question, questionNumber, totalQuestions } = result;
    
    return `📝 Question ${questionNumber}/${totalQuestions}\n` +
           `[${question.difficulty.toUpperCase()}] ${question.topic}\n\n` +
           `${question.question}\n\n` +
           `${question.options.join('\n')}\n\n` +
           `Reply with A, B, C, or D`;
  }

  /**
   * Format answer result for SMS
   */
  formatAnswerResult(result) {
    const { isCorrect, correctAnswer, explanation, currentScore, totalAnswered } = result;
    
    let message = isCorrect 
      ? `✅ Correct!\n\n` 
      : `❌ Incorrect. The correct answer is ${correctAnswer}.\n\n`;
    
    message += `💡 ${explanation}\n\n`;
    message += `Score: ${currentScore}/${totalAnswered}\n\n`;
    message += `Reply NEXT for the next question.`;
    
    return message;
  }

  /**
   * Format quiz completion message
   */
  formatQuizComplete(result) {
    const { score, totalQuestions, percentage, duration, performance } = result;
    
    return `🎉 Quiz Complete!\n\n` +
           `${performance}\n\n` +
           `Final Score: ${score}/${totalQuestions} (${percentage}%)\n` +
           `Time: ${duration} minutes\n\n` +
           `Reply START to take another quiz!`;
  }
}

// Export singleton instance
module.exports = new MessageHandler();

// Made with Bob
