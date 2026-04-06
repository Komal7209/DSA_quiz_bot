const { getRandomQuestion, getQuestionById } = require('../data/questions');

/**
 * Quiz Manager - Manages user quiz sessions and state
 * In production, use a database like Redis or MongoDB
 */
class QuizManager {
  constructor() {
    // Store user sessions in memory (use Redis/DB in production)
    this.sessions = new Map();
  }

  /**
   * Start a new quiz session for a user
   * @param {string} phoneNumber - User's phone number
   * @returns {Object} - Session data with first question
   */
  startQuiz(phoneNumber) {
    const session = {
      phoneNumber,
      currentQuestionId: null,
      askedQuestions: [],
      score: 0,
      totalQuestions: 0,
      startTime: new Date(),
      isActive: true
    };

    this.sessions.set(phoneNumber, session);
    return this.getNextQuestion(phoneNumber);
  }

  /**
   * Get the next question for a user
   * @param {string} phoneNumber - User's phone number
   * @returns {Object} - Question data or completion message
   */
  getNextQuestion(phoneNumber) {
    const session = this.sessions.get(phoneNumber);
    
    if (!session) {
      return {
        type: 'error',
        message: 'No active session. Reply START to begin a new quiz.'
      };
    }

    // Check if quiz is complete (10 questions)
    if (session.askedQuestions.length >= 10) {
      return this.endQuiz(phoneNumber);
    }

    const question = getRandomQuestion(session.askedQuestions);
    
    if (!question) {
      return this.endQuiz(phoneNumber);
    }

    session.currentQuestionId = question.id;
    session.askedQuestions.push(question.id);
    this.sessions.set(phoneNumber, session);

    return {
      type: 'question',
      question: question,
      questionNumber: session.askedQuestions.length,
      totalQuestions: 10
    };
  }

  /**
   * Process user's answer
   * @param {string} phoneNumber - User's phone number
   * @param {string} answer - User's answer (A, B, C, or D)
   * @returns {Object} - Result with feedback
   */
  processAnswer(phoneNumber, answer) {
    const session = this.sessions.get(phoneNumber);
    
    if (!session || !session.isActive) {
      return {
        type: 'error',
        message: 'No active session. Reply START to begin a new quiz.'
      };
    }

    if (!session.currentQuestionId) {
      return {
        type: 'error',
        message: 'No active question. Reply NEXT for a new question.'
      };
    }

    const question = getQuestionById(session.currentQuestionId);
    const normalizedAnswer = answer.toUpperCase().trim();
    
    // Validate answer format
    if (!['A', 'B', 'C', 'D'].includes(normalizedAnswer)) {
      return {
        type: 'error',
        message: 'Invalid answer. Please reply with A, B, C, or D.'
      };
    }

    const isCorrect = normalizedAnswer === question.correctAnswer;
    
    if (isCorrect) {
      session.score++;
    }
    
    session.totalQuestions++;
    session.currentQuestionId = null;
    this.sessions.set(phoneNumber, session);

    return {
      type: 'answer_result',
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      currentScore: session.score,
      totalAnswered: session.totalQuestions
    };
  }

  /**
   * End the quiz and return final results
   * @param {string} phoneNumber - User's phone number
   * @returns {Object} - Final quiz results
   */
  endQuiz(phoneNumber) {
    const session = this.sessions.get(phoneNumber);
    
    if (!session) {
      return {
        type: 'error',
        message: 'No active session found.'
      };
    }

    session.isActive = false;
    const endTime = new Date();
    const duration = Math.round((endTime - session.startTime) / 1000 / 60); // minutes
    
    const percentage = (session.score / session.totalQuestions) * 100;
    let performance = 'Good effort!';
    
    if (percentage >= 90) {
      performance = 'Excellent! 🌟';
    } else if (percentage >= 70) {
      performance = 'Great job! 👏';
    } else if (percentage >= 50) {
      performance = 'Good work! 👍';
    } else {
      performance = 'Keep practicing! 💪';
    }

    this.sessions.set(phoneNumber, session);

    return {
      type: 'quiz_complete',
      score: session.score,
      totalQuestions: session.totalQuestions,
      percentage: percentage.toFixed(1),
      duration,
      performance
    };
  }

  /**
   * Get current session status
   * @param {string} phoneNumber - User's phone number
   * @returns {Object} - Session status
   */
  getStatus(phoneNumber) {
    const session = this.sessions.get(phoneNumber);
    
    if (!session || !session.isActive) {
      return {
        type: 'status',
        hasActiveSession: false,
        message: 'No active quiz session. Reply START to begin.'
      };
    }

    return {
      type: 'status',
      hasActiveSession: true,
      score: session.score,
      questionsAnswered: session.totalQuestions,
      questionsRemaining: 10 - session.askedQuestions.length
    };
  }

  /**
   * Reset/delete a user's session
   * @param {string} phoneNumber - User's phone number
   */
  resetSession(phoneNumber) {
    this.sessions.delete(phoneNumber);
  }

  /**
   * Check if user has an active session
   * @param {string} phoneNumber - User's phone number
   * @returns {boolean}
   */
  hasActiveSession(phoneNumber) {
    const session = this.sessions.get(phoneNumber);
    return session && session.isActive;
  }
}

// Export singleton instance
module.exports = new QuizManager();

 
