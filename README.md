# 🤖 DSA Quiz Bot - Real-time SMS Quiz Application

A real-time Data Structures & Algorithms (DSA) quiz bot built with Node.js and Twilio SMS API. Users can take interactive DSA quizzes via SMS, receiving instant feedback and tracking their progress.

## 📋 Features

- **20 DSA Questions** covering arrays, linked lists, stacks, queues, trees, graphs, sorting, searching, hashing, and dynamic programming
- **Real-time SMS Interaction** using Twilio SMS API
- **Instant Feedback** with explanations for each answer
- **Score Tracking** throughout the quiz session
- **Multiple Difficulty Levels** (Easy, Medium, Hard)
- **Session Management** to track user progress
- **Command-based Interface** for easy navigation

## 🏗️ Architecture

```
dsa-quiz-bot/
├── config/
│   └── twilio.js          # Twilio SMS API configuration
├── data/
│   └── questions.js       # DSA quiz questions database
├── routes/
│   └── webhook.js         # Webhook endpoints for SMS
├── services/
│   ├── messageHandler.js  # SMS message processing
│   └── quizManager.js     # Quiz session management
├── test/
│   └── testBot.js         # Test suite
├── .env.example           # Environment variables template
├── .gitignore
├── index.js               # Main application entry point
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Twilio account with SMS API credentials
- A Twilio phone number

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd dsa-quiz-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file with your Twilio credentials:**
   ```env
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   PORT=3000
   ```

### Running the Application

**Development mode:**
```bash
npm start
```

**With nodemon (auto-restart on changes):**
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Setting Up Webhooks

For production deployment, you need to expose your webhook endpoint to the internet:

1. **Using ngrok (for local testing):**
   ```bash
   ngrok http 3000
   ```

2. **Configure Twilio webhook:**
   - Go to [Twilio Console](https://console.twilio.com/)
   - Navigate to Phone Numbers → Manage → Active Numbers
   - Click on your phone number
   - Under "Messaging", set the webhook URL to: `https://your-domain.com/webhook/sms`
   - Set the HTTP method to `POST`

3. **For production:**
   - Deploy to a cloud platform (Vercel, Heroku, AWS, Google Cloud, etc.)
   - Use your production URL for the webhook

### Deploying to Vercel

This project includes Vercel support using [`vercel.json`](vercel.json) and the serverless entrypoint [`api/index.js`](api/index.js).

1. **Push the project to GitHub**
   - Commit your changes and push the repository to GitHub.

2. **Import the repository into Vercel**
   - Go to [Vercel](https://vercel.com/)
   - Click **Add New → Project**
   - Import your GitHub repository
   - Keep the default Node.js project settings

3. **Configure environment variables in Vercel**
   Add these environment variables in the Vercel dashboard:
   ```env
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   NODE_ENV=production
   ```
   Do not set `PORT` on Vercel.

4. **Deploy**
   - Trigger deployment from the Vercel dashboard or by pushing to your connected branch.

5. **Configure the Twilio webhook**
   Set your Twilio incoming message webhook to:
   ```text
   https://your-vercel-project.vercel.app/webhook/sms
   ```

6. **Verify the deployment**
   Health check:
   ```text
   https://your-vercel-project.vercel.app/webhook/health
   ```

#### Important Production Note

User quiz sessions are currently stored in memory in [`services/quizManager.js`](services/quizManager.js). On Vercel, serverless instances are ephemeral, so active quiz sessions may be lost between invocations. For reliable production usage, replace the in-memory session store with a persistent datastore such as Redis, Upstash Redis, or a database.

## 📱 How to Use

### Available Commands

Send these commands via SMS to interact with the bot:

| Command | Description |
|---------|-------------|
| `START` | Begin a new quiz session |
| `A/B/C/D` | Answer the current question |
| `NEXT` | Get the next question |
| `STATUS` | Check your current score and progress |
| `HELP` | Display available commands |
| `QUIT` | End the current quiz session |

### Example Interaction

```
User: START
Bot: 📝 Question 1/10
     [EASY] arrays
     
     What is the time complexity of accessing an element in an array by index?
     
     A) O(1)
     B) O(n)
     C) O(log n)
     D) O(n²)
     
     Reply with A, B, C, or D

User: A
Bot: ✅ Correct!
     
     💡 Array access by index is O(1) because arrays store elements in contiguous memory locations.
     
     Score: 1/1
     
     Reply NEXT for the next question.

User: NEXT
Bot: 📝 Question 2/10
     [MEDIUM] arrays
     ...
```

## 🧪 Testing

Run the test suite to simulate SMS interactions:

```bash
node test/testBot.js
```

This will run through various scenarios including:
- Starting a quiz
- Answering questions (correct and incorrect)
- Checking status
- Completing a quiz
- Error handling

## 📊 Quiz Features

### Question Database

- **20 carefully curated questions** covering major DSA topics
- **Difficulty levels:** Easy, Medium, Hard
- **Topics covered:**
  - Arrays
  - Linked Lists
  - Stacks & Queues
  - Trees
  - Graphs
  - Sorting Algorithms
  - Searching Algorithms
  - Hashing
  - Dynamic Programming

### Scoring System

- Each quiz consists of **10 random questions**
- **1 point** per correct answer
- **Instant feedback** with explanations
- **Performance ratings:**
  - 90%+ : Excellent! 🌟
  - 70-89%: Great job! 👏
  - 50-69%: Good work! 👍
  - <50%: Keep practicing! 💪

## 🔧 API Endpoints

### Webhook Endpoints

**POST `/webhook/sms`**
- Receives incoming SMS messages from Twilio
- Processes user commands and questions
- Sends appropriate responses

**POST `/webhook/status`**
- Receives status callbacks for sent messages
- Logs message delivery status

**GET `/webhook/health`**
- Health check endpoint
- Returns service status

### Root Endpoint

**GET `/`**
- Returns API information and available endpoints

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `TWILIO_ACCOUNT_SID` | Your Twilio Account SID | Yes |
| `TWILIO_AUTH_TOKEN` | Your Twilio Auth Token | Yes |
| `TWILIO_PHONE_NUMBER` | Your Twilio phone number | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | No |

## 📦 Dependencies

- **express** - Web framework
- **twilio** - Twilio SMS API SDK
- **dotenv** - Environment variable management
- **body-parser** - Request body parsing

## 🚀 Deployment

### Heroku

1. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Set environment variables:
   ```bash
   heroku config:set TWILIO_ACCOUNT_SID=your_sid
   heroku config:set TWILIO_AUTH_TOKEN=your_token
   heroku config:set TWILIO_PHONE_NUMBER=your_number
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

4. Update Twilio webhook URL to your Heroku app URL

### AWS/Google Cloud/Azure

Follow similar steps:
1. Deploy the application
2. Set environment variables
3. Configure Twilio webhook with your public URL

## 🛠️ Development

### Adding New Questions

Edit `data/questions.js` and add new question objects:

```javascript
{
  id: 21,
  question: "Your question here?",
  options: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
  correctAnswer: "A",
  explanation: "Explanation of the correct answer",
  difficulty: "medium",
  topic: "your-topic"
}
```

### Customizing Quiz Length

Edit `services/quizManager.js` and modify the question limit:

```javascript
// Change from 10 to your desired number
if (session.askedQuestions.length >= 10) {
  return this.endQuiz(phoneNumber);
}
```

## 🐛 Troubleshooting

### SMS Not Sending

1. Verify Twilio credentials in `.env`
2. Check Twilio account balance
3. Ensure phone number is in E.164 format (+1234567890)
4. Check server logs for errors

### Webhook Not Receiving Messages

1. Verify webhook URL is publicly accessible
2. Check Twilio console webhook configuration
3. Ensure webhook URL uses HTTPS in production
4. Test with ngrok for local development

### Server Errors

1. Check all environment variables are set
2. Verify Node.js version (v14+)
3. Check server logs: `npm start`
4. Ensure port 3000 is not in use

## 📝 License

ISC

## 👨‍💻 Author

Built with ❤️ using Node.js and Twilio SMS API

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review Twilio SMS API documentation
- Open an issue on the repository

## 🎯 Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and profiles
- [ ] Leaderboard system
- [ ] Multiple quiz categories
- [ ] Timed challenges
- [ ] Difficulty selection
- [ ] Question hints
- [ ] Multi-language support
- [ ] Web dashboard for analytics
- [ ] WhatsApp integration

---

**Happy Learning! 🚀📚**