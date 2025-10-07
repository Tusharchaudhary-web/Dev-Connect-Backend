const express = require('express');
const { userAuth } = require("../middlewares/userAuth");

const paymentRouter = express.Router();
const razorpayInstance = require('../utils/razorpay');
const Payment = require('../models/payment');
const membershipAmount = require('../utils/constants');
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const { User } = require("../models/user");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {

  try {
    const { membershipType } = req.body;
    const { fullName, Email } = req.user;

    const order = await razorpayInstance.orders.create({
      "amount": membershipAmount[membershipType] * 100,
      "currency": "INR",
      "receipt": "receipt#1",
      "notes": {
        fullName, Email, membershipType
      }
    })

    // save order in my database

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,

    })

    const savedPayment = await payment.save();

    // return back orderid to frontend
    res.json({ ...savedPayment.toJSON(), keyId: process.env.RAZORPAY_KEY_ID });
  }
  catch (err) {
    return res.status(500).json({ message: err.message });
  }

})

// this is the API that razorpay will call

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {

    console.log("Webhook Called");

    const webhookSignature = req.get("X-Razorpay-Signature");
     console.log("Webhook Signature", webhookSignature);

    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: "Webhook signature is invalid" });
    }
        console.log("Valid Webhook Signature");

    // Extract payment details from webhook
    const paymentDetails = req.body.payload.payment.entity;

    // Find payment record in DB
    const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

    // Update payment status
    payment.status = paymentDetails.status;
    await payment.save();
  console.log("Payment saved");

    // Update user to premium
    const user = await User.findOne({_id:payment.userId});
    
      user.isPremium = true;
      user.membershipType = payment.notes.membershipType;
          console.log("User saved");
      await user.save();
    

    // Must return success to Razorpay
    return res.status(200).json({ msg: "Webhook received successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

paymentRouter.get("/premium/verify", userAuth, async (req, res) => {
  const user = req.user.toJSON();
  console.log(user);
  if (user.isPremium) {
    return res.json({ ...user });
  }
  return res.json({ ...user });
});

module.exports = paymentRouter;

