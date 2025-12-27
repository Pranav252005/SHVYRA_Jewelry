# Razorpay Payment Integration Setup Guide

This guide will help you set up the Razorpay payment integration for Shvyra Jewelry Store.

## Prerequisites

1. A Razorpay account (Sign up at https://razorpay.com)
2. Node.js v18+ installed
3. npm or yarn package manager

## Step 1: Get Your Razorpay API Keys

1. Log in to your Razorpay Dashboard: https://dashboard.razorpay.com
2. Navigate to **Settings** → **API Keys**
3. Click **Generate Key** to create a new key pair
4. Copy both:
   - **Key ID** (starts with `rzp_live_` or `rzp_test_`)
   - **Key Secret** (shown only once, save it securely!)

> **Important**: For testing, use Test Mode keys (`rzp_test_`). For production, use Live Mode keys (`rzp_live_`).

## Step 2: Configure Environment Variables

1. Navigate to the `server` folder:
   ```bash
   cd server
   ```

2. Create a `.env` file (copy from example):
   ```bash
   cp ../.env.example .env
   ```

3. Edit `.env` and add your Razorpay keys:
   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
   RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
   PORT=5000
   ```

## Step 3: Install Dependencies

### Frontend Dependencies
```bash
# In the root jewelry-store folder
npm install
```

### Backend Dependencies
```bash
# In the server folder
cd server
npm install
```

## Step 4: Start the Application

### Terminal 1 - Start the Backend Server
```bash
cd server
npm run dev
```
The server will start at http://localhost:5000

### Terminal 2 - Start the Frontend
```bash
# In the root folder
npm run dev
```
The frontend will start at http://localhost:5173

## Testing the Integration

### Test Mode
When using test keys (`rzp_test_`), you can use these test credentials:

**Test UPI ID**: `success@razorpay`
**Test Card**:
- Card Number: `4111 1111 1111 1111`
- Expiry: Any future date
- CVV: Any 3 digits
- OTP: `1234`

### Test Flow
1. Add items to cart
2. Go to Checkout
3. Fill in delivery details
4. Click "Pay ₹XXX"
5. Complete payment in Razorpay popup
6. View order success page

## Payment Methods Supported

The integration supports all Razorpay payment methods:

- **UPI**: GPay, PhonePe, Paytm, BHIM UPI, etc.
- **Cards**: Visa, Mastercard, RuPay, American Express
- **Netbanking**: All major Indian banks
- **Wallets**: Paytm, PhonePe, Amazon Pay, etc.
- **EMI**: Card EMI, Bajaj Finserv, etc.
- **Pay Later**: Simpl, LazyPay, etc.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Server health check |
| `/api/razorpay/key` | GET | Get Razorpay Key ID for frontend |
| `/api/razorpay/create-order` | POST | Create a new order |
| `/api/razorpay/verify-payment` | POST | Verify payment signature |
| `/api/razorpay/payment/:id` | GET | Get payment details |
| `/api/razorpay/refund` | POST | Process refund |

## Troubleshooting

### "Failed to fetch Razorpay key"
- Ensure the backend server is running on port 5000
- Check that CORS is properly configured

### "Payment verification failed"
- Verify your Key Secret is correct in `.env`
- Ensure the signature verification is using the correct order_id

### "Order creation failed"
- Check your Razorpay API keys are valid
- Ensure amount is greater than 0

## Security Best Practices

1. **Never expose Key Secret** in frontend code
2. **Always verify payments** on the server before confirming orders
3. **Use HTTPS** in production
4. **Store keys in environment variables**, not in code
5. **Implement webhook handlers** for reliable payment status updates

## Webhook Setup (Recommended for Production)

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/razorpay/webhook`
3. Select events: `payment.captured`, `payment.failed`, `refund.created`
4. Copy the Webhook Secret and add to `.env`:
   ```env
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret
   ```

## Production Deployment

1. Switch to Live Mode keys in Razorpay Dashboard
2. Update `.env` with live keys
3. Configure proper CORS origins
4. Set up HTTPS
5. Configure webhook for reliable order updates

## Support

- Razorpay Documentation: https://razorpay.com/docs/
- Razorpay Support: https://razorpay.com/support/
