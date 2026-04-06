# 🚀 DSA Quiz Bot - Complete Setup Guide (Twilio)

This guide will walk you through setting up the DSA Quiz Bot from scratch, including Twilio account setup and deployment.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Twilio Account Setup](#twilio-account-setup)
3. [Local Development Setup](#local-development-setup)
4. [Testing Locally](#testing-locally)
5. [Production Deployment](#production-deployment)
6. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)
- A **mobile phone** for testing SMS
- A **credit card** for Twilio account (free trial available with $15 credit)

## Twilio Account Setup

### Step 1: Create a Twilio Account

1. Go to [Twilio Sign Up](https://www.twilio.com/try-twilio)
2. Sign up for a free account
3. Verify your email address and phone number
4. Complete the registration process
5. You'll receive **$15 in free trial credit**

### Step 2: Get Your API Credentials

1. Log in to [Twilio Console](https://console.twilio.com/)
2. On the dashboard, you'll see:
   - **Account SID** (starts with AC...)
   - **Auth Token** (click to reveal)
3. Copy both credentials and save them securely

### Step 3: Get a Phone Number

1. In the Twilio Console, go to **Phone Numbers** → **Manage** → **Buy a number**
2. Select your country
3. Check **SMS** capability
4. Search for available numbers
5. Purchase a number (uses trial credit)
6. Note down your Twilio phone number (format: +1234567890)

### Step 4: Configure SMS Settings

1. Go to **Phone Numbers** → **Manage** → **Active Numbers**
2. Click on your purchased number
3. Scroll to **Messaging Configuration**
4. You'll configure the webhook URL later after deployment

## Local Development Setup

### Step 1: Install the Application

```bash
# Navigate to the project directory
cd dsa-quiz-bot

# Install dependencies
npm install
```

### Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file with your credentials:
   ```env
   # Twilio API Credentials
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token_here
   TWILIO_PHONE_NUMBER=+1234567890

   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

3. Replace the placeholder values with your actual Twilio credentials

### Step 3: Start the Server

```bash
# Start the server
npm start
```

You should see:
```
==================================================
🤖 DSA Quiz Bot Server Started
==================================================
📡 Server running on port 3000
🌐 Local URL: http://localhost:3000
📥 Webhook URL: http://localhost:3000/webhook/sms
💚 Health check: http://localhost:3000/webhook/health
==================================================
```

### Step 4: Expose Your Local Server (for SMS testing)

Since Twilio needs to send webhooks to your server, you need to expose your local server to the internet.

**Option A: Using ngrok (Recommended for testing)**

1. Download and install [ngrok](https://ngrok.com/download)

2. Start ngrok:
   ```bash
   ngrok http 3000
   ```

3. Copy the HTTPS forwarding URL (e.g., `https://abc123.ngrok-free.app`)

**Option B: Using localtunnel**

```bash
# Install localtunnel globally
npm install -g localtunnel

# Start tunnel
lt --port 3000
```

### Step 5: Configure Twilio Webhook

1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to **Phone Numbers** → **Manage** → **Active Numbers**
3. Click on your phone number
4. Scroll to **Messaging Configuration**
5. Under **A MESSAGE COMES IN**:
   - Set webhook URL to: `https://your-ngrok-url.ngrok-free.app/webhook/sms`
   - Set HTTP method to: `POST`
6. Click **Save**

## Testing Locally

### Method 1: Using the Test Script

Run the automated test suite:

```bash
node test/testBot.js
```

This will simulate various SMS interactions and show you the responses.

### Method 2: Testing with Real SMS

1. Ensure your server is running (`npm start`)
2. Ensure ngrok is running and webhook is configured
3. Send an SMS to your Twilio phone number with the text: `START`
4. You should receive a response with the first quiz question
5. Reply with `A`, `B`, `C`, or `D` to answer
6. Continue the quiz by replying `NEXT`

### Method 3: Testing with cURL

Test the webhook endpoint directly:

```bash
curl -X POST http://localhost:3000/webhook/sms \
  -d "From=%2B1234567890" \
  -d "To=%2B0987654321" \
  -d "Body=START" \
  -d "MessageSid=test123"
```

## Production Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI**:
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**:
   ```bash
   heroku login
   ```

3. **Create a new Heroku app**:
   ```bash
   heroku create dsa-quiz-bot-yourname
   ```

4. **Set environment variables**:
   ```bash
   heroku config:set TWILIO_ACCOUNT_SID=your_account_sid
   heroku config:set TWILIO_AUTH_TOKEN=your_auth_token
   heroku config:set TWILIO_PHONE_NUMBER=your_phone_number
   heroku config:set NODE_ENV=production
   ```

5. **Deploy the application**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

6. **Update Twilio webhook**:
   - Go to Twilio Console
   - Update webhook URL to: `https://your-app-name.herokuapp.com/webhook/sms`

7. **Test the deployment**:
   ```bash
   heroku logs --tail
   ```

### Option 2: Deploy to AWS EC2

1. **Launch an EC2 instance** (Ubuntu recommended)

2. **SSH into your instance**:
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

3. **Install Node.js**:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Clone and setup the application**:
   ```bash
   git clone your-repo-url
   cd dsa-quiz-bot
   npm install
   ```

5. **Create .env file** with your credentials

6. **Install PM2** (process manager):
   ```bash
   sudo npm install -g pm2
   pm2 start index.js --name dsa-quiz-bot
   pm2 startup
   pm2 save
   ```

7. **Setup Nginx** (reverse proxy):
   ```bash
   sudo apt-get install nginx
   # Configure nginx to proxy to port 3000
   ```

8. **Setup SSL** with Let's Encrypt:
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

9. **Update Twilio webhook** to your domain

### Option 3: Deploy to Google Cloud Run

1. **Install Google Cloud SDK**

2. **Build and deploy**:
   ```bash
   gcloud run deploy dsa-quiz-bot \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

3. **Set environment variables** in Cloud Run console

4. **Update Twilio webhook** to Cloud Run URL

## Troubleshooting

### Issue: SMS Not Sending

**Symptoms**: Server receives webhook but SMS doesn't send

**Solutions**:
1. Check Twilio account balance/trial credit
2. Verify API credentials in `.env`
3. Check server logs for errors
4. Ensure phone number is in E.164 format (+1234567890)
5. For trial accounts, verify recipient phone numbers in Twilio Console

### Issue: Webhook Not Receiving Messages

**Symptoms**: Send SMS but server doesn't receive webhook

**Solutions**:
1. Verify webhook URL is publicly accessible
2. Check ngrok is running (for local testing)
3. Verify webhook URL in Twilio Console
4. Check webhook URL uses HTTPS (required by Twilio)
5. Test webhook with cURL
6. Check Twilio debugger in Console for webhook errors

### Issue: Server Crashes

**Symptoms**: Server stops responding

**Solutions**:
1. Check all environment variables are set
2. Verify Node.js version: `node --version`
3. Check port 3000 is not in use: `lsof -i :3000`
4. Review server logs for errors
5. Restart the server

### Issue: Invalid API Credentials

**Symptoms**: Error: "Authentication failed"

**Solutions**:
1. Verify Account SID and Auth Token in Twilio Console
2. Check for extra spaces in `.env` file
3. Ensure credentials are not expired
4. Try regenerating Auth Token

### Issue: Trial Account Limitations

**Symptoms**: Can't send to certain numbers

**Solutions**:
1. Verify recipient numbers in Twilio Console
2. Upgrade to paid account for unrestricted access
3. Check trial credit balance

## Testing Checklist

Before going live, test these scenarios:

- [ ] Send `START` command
- [ ] Answer questions with A, B, C, D
- [ ] Send `NEXT` command
- [ ] Send `STATUS` command
- [ ] Send `HELP` command
- [ ] Send `QUIT` command
- [ ] Send invalid commands
- [ ] Complete full quiz (10 questions)
- [ ] Start new quiz after completion
- [ ] Test with multiple users simultaneously

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Use environment variables** for all sensitive data
3. **Enable HTTPS** in production (required by Twilio)
4. **Implement webhook signature validation** (already included)
5. **Validate all user input**
6. **Keep dependencies updated**: `npm audit fix`
7. **Rotate Auth Token** regularly
8. **Use strong passwords** for deployment platforms

## Performance Optimization

1. **Use Redis** for session storage in production
2. **Implement caching** for frequently accessed data
3. **Add database** for persistent storage
4. **Monitor server metrics** with tools like New Relic
5. **Set up logging** with Winston or similar
6. **Implement queue system** for high-volume SMS

## Cost Management

### Twilio Pricing (as of 2024)

- **SMS (US)**: $0.0079 per message sent
- **SMS (International)**: Varies by country
- **Phone Number**: ~$1.15/month

### Tips to Reduce Costs

1. Use trial credit for testing
2. Monitor usage in Twilio Console
3. Set up billing alerts
4. Optimize message length (SMS is charged per segment)
5. Consider message batching for multiple users

## Next Steps

After successful setup:

1. **Monitor usage** in Twilio Console
2. **Track costs** and set up billing alerts
3. **Collect user feedback**
4. **Add more questions** to the database
5. **Implement analytics** to track quiz performance
6. **Consider adding features** from the roadmap

## Support Resources

- [Twilio SMS API Documentation](https://www.twilio.com/docs/sms)
- [Twilio Console](https://console.twilio.com/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [ngrok Documentation](https://ngrok.com/docs)

## Getting Help

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review server logs: `npm start` or `heroku logs --tail`
3. Test with the test script: `node test/testBot.js`
4. Check Twilio Console → Monitor → Logs → Errors
5. Review webhook delivery logs in Twilio Console
6. Use Twilio Debugger for webhook issues

## Twilio Trial Account Notes

- **$15 free credit** upon signup
- Can only send to **verified phone numbers**
- Messages include trial account notice
- Upgrade to remove restrictions

To verify a phone number:
1. Go to Twilio Console
2. Navigate to Phone Numbers → Manage → Verified Caller IDs
3. Add and verify phone numbers

---

**Congratulations! Your DSA Quiz Bot is now ready to use! 🎉**

Send `START` to your Twilio number to begin your first quiz!