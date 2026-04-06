# How to Test Your Bot for FREE (No ISD Charges!)

## Problem
Your Twilio number is international, and sending SMS to it will cost you ISD charges. Here are FREE alternatives to test your bot!

---

## Method 1: Use Twilio Console Test Tool (100% FREE) ⭐ RECOMMENDED

Twilio provides a FREE testing tool in their console:

### Steps:

1. **Go to Twilio Console**: https://console.twilio.com/

2. **Navigate to**: **Develop** → **Phone Numbers** → **Manage** → **Active Numbers**

3. **Click on your Twilio phone number**

4. **Scroll down to "Messaging Configuration"**

5. **Look for "Test Credentials" or "Try it out" section**

6. **Or use Twilio's API Explorer**:
   - Go to: https://www.twilio.com/console/sms/logs
   - You can send test messages from here

### Alternative: Use Twilio's Programmable SMS API Explorer (Tried this one)

1. Go to: https://www.twilio.com/console/sms/dashboard
2. Click on **"Send a test SMS"**
3. This lets you simulate incoming messages to your webhook

---

## Method 2: Test Using curl (Completely FREE) ⭐ BEST FOR DEVELOPMENT

You can test your Vercel webhook directly without sending any SMS:

### Test the webhook endpoint:

```bash
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "From=%2B919876543210&Body=start&To=%2B1234567890"
```

**Replace `+919876543210` with any test number (doesn't need to be real)**

### Test different commands:

**Start quiz:**
```bash
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -d "From=+919876543210&Body=start"
```

**Answer a question:**
```bash
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -d "From=+919876543210&Body=A"
```

**Check score:**
```bash
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -d "From=+919876543210&Body=score"
```

**Get help:**
```bash
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -d "From=+919876543210&Body=help"
```

### Expected Response Format:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Welcome to DSA Quiz Bot! 🎯
  
Question 1/10:
What is the time complexity of binary search?

A) O(n)
B) O(log n)
C) O(n²)
D) O(1)

Reply with A, B, C, or D</Message>
</Response>
```

---

## Method 3: Use Postman or Insomnia (FREE GUI Tool)

If you prefer a graphical interface:

### Using Postman:

1. **Download Postman**: https://www.postman.com/downloads/ (FREE)

2. **Create a new POST request**:
   - URL: `https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook`
   - Method: **POST**
   - Body type: **x-www-form-urlencoded**

3. **Add parameters**:
   - Key: `From`, Value: `+919876543210`
   - Key: `Body`, Value: `start`
   - Key: `To`, Value: `+1234567890`

4. **Click Send**

5. **View Response** in the response panel

---

## Method 4: Get a FREE Indian Twilio Number

If you want to test with actual SMS without ISD charges:

### Option A: Twilio Trial with Indian Number

1. **Check if Twilio offers Indian numbers**: https://www.twilio.com/console/phone-numbers/search

2. **Search for Indian numbers** (+91)

3. **Purchase/Get trial number** (Twilio trial gives you free credits)

4. **Update your `.env` file** with the new Indian number

5. **Redeploy to Vercel** with new number

### Option B: Use Alternative SMS Service

Consider these alternatives with Indian numbers:
- **MSG91** (Indian service, cheaper for Indian numbers)
- **Gupshup** (Indian service)
- **Kaleyra** (Indian service)

---

## Method 5: Test Locally First (100% FREE)

Test everything locally before deploying:

### Steps:

1. **Run locally**:
```bash
npm start
```

2. **Use ngrok to expose local server** (FREE):
```bash
# Install ngrok
npm install -g ngrok

# Expose your local server
ngrok http 3000
```

3. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)

4. **Update Twilio webhook** to: `https://abc123.ngrok.io/webhook`

5. **Now test with curl** (no charges):
```bash
curl -X POST http://localhost:3000/webhook \
  -d "From=+919876543210&Body=start"
```

---

## Recommended FREE Testing Workflow

### Step 1: Test with curl (No cost)
```bash
# Test start command
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -d "From=+919876543210&Body=start"

# Test answer
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -d "From=+919876543210&Body=B"

# Test score
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook \
  -d "From=+919876543210&Body=score"
```

### Step 2: Check Vercel Logs
```bash
vercel logs --follow
```

### Step 3: Verify in Twilio Console
- Go to: https://console.twilio.com/monitor/logs/debugger
- Check if webhook requests are coming through

---

## Complete Test Script (Copy & Paste)

Save this as `test-bot.sh` and run it:

```bash
#!/bin/bash

BASE_URL="https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook"
PHONE="+919876543210"

echo "Testing DSA Quiz Bot..."
echo ""

echo "1. Testing START command..."
curl -X POST $BASE_URL -d "From=$PHONE&Body=start"
echo -e "\n\n"

sleep 2

echo "2. Testing answer B..."
curl -X POST $BASE_URL -d "From=$PHONE&Body=B"
echo -e "\n\n"

sleep 2

echo "3. Testing SCORE command..."
curl -X POST $BASE_URL -d "From=$PHONE&Body=score"
echo -e "\n\n"

sleep 2

echo "4. Testing HELP command..."
curl -X POST $BASE_URL -d "From=$PHONE&Body=help"
echo -e "\n\n"

echo "Testing complete!"
```

**Run it:**
```bash
chmod +x test-bot.sh
./test-bot.sh
```

---

## What Each Method Costs

| Method | Cost | Best For |
|--------|------|----------|
| curl commands | ₹0 (FREE) | Development & Testing |
| Postman/Insomnia | ₹0 (FREE) | GUI testing |
| Twilio Console | ₹0 (FREE) | Quick tests |
| Local + ngrok | ₹0 (FREE) | Development |
| SMS to international number | ₹₹₹ (ISD charges) | Production only |
| Indian Twilio number | ₹ (Twilio charges) | Production |

---

## Summary

✅ **FREE Testing Options:**
1. Use `curl` commands (RECOMMENDED)
2. Use Postman/Insomnia
3. Test locally with ngrok
4. Use Twilio Console tools

❌ **Avoid:**
- Sending SMS to international numbers during testing
- Using real SMS for development

🎯 **Best Practice:**
- Test with curl during development
- Use Twilio Console for verification
- Only use real SMS for final production testing

---

## Quick Start (Copy These Commands)

```bash
# Test start
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook -d "From=+919876543210&Body=start"

# Test answer
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook -d "From=+919876543210&Body=A"

# Test score
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook -d "From=+919876543210&Body=score"

# Test help
curl -X POST https://dsa-quiz-1qavh5dvc-komal7209s-projects.vercel.app/webhook -d "From=+919876543210&Body=help"

# View logs
vercel logs --follow
```

**No ISD charges, completely FREE! 🎉**