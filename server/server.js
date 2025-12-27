import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174'],
    credentials: true
}))
app.use(express.json())

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' })
})

// Get Razorpay Key ID (for frontend)
app.get('/api/razorpay/key', (req, res) => {
    res.json({ key_id: process.env.RAZORPAY_KEY_ID })
})

// Create Order
app.post('/api/razorpay/create-order', async (req, res) => {
    try {
        const { amount, currency = 'INR', receipt, notes } = req.body

        if (!amount) {
            return res.status(400).json({ error: 'Amount is required' })
        }

        const options = {
            amount: Math.round(amount * 100), // Convert to paise
            currency,
            receipt: receipt || `order_${Date.now()}`,
            notes: notes || {}
        }

        const order = await razorpay.orders.create(options)

        res.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt
        })
    } catch (error) {
        console.error('Error creating order:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to create order',
            details: error.message
        })
    }
})

// Verify Payment
app.post('/api/razorpay/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                error: 'Missing payment verification parameters'
            })
        }

        // Create the signature verification string
        const body = razorpay_order_id + '|' + razorpay_payment_id

        // Generate expected signature
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex')

        // Verify signature
        const isAuthentic = expectedSignature === razorpay_signature

        if (isAuthentic) {
            // Payment is verified
            // Here you can save the order details to your database
            res.json({
                success: true,
                message: 'Payment verified successfully',
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id
            })
        } else {
            res.status(400).json({
                success: false,
                error: 'Payment verification failed - Invalid signature'
            })
        }
    } catch (error) {
        console.error('Error verifying payment:', error)
        res.status(500).json({
            success: false,
            error: 'Payment verification failed',
            details: error.message
        })
    }
})

// Get Payment Details
app.get('/api/razorpay/payment/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params
        const payment = await razorpay.payments.fetch(paymentId)
        res.json({ success: true, payment })
    } catch (error) {
        console.error('Error fetching payment:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch payment details',
            details: error.message
        })
    }
})

// Refund Payment
app.post('/api/razorpay/refund', async (req, res) => {
    try {
        const { payment_id, amount } = req.body

        if (!payment_id) {
            return res.status(400).json({ error: 'Payment ID is required' })
        }

        const refundOptions = {
            speed: 'normal'
        }

        if (amount) {
            refundOptions.amount = Math.round(amount * 100)
        }

        const refund = await razorpay.payments.refund(payment_id, refundOptions)
        res.json({ success: true, refund })
    } catch (error) {
        console.error('Error processing refund:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to process refund',
            details: error.message
        })
    }
})

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
    console.log(`📦 Razorpay integration ready`)
})
