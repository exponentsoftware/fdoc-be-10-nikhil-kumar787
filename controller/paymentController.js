import Razorpay from "razorpay";
import Vonage from "@vonage/server-sdk";
import env from "dotenv";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import User from "../model/userModel";
import Payment from "../model/paymentModel";
env.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.key_id,

  key_secret: process.env.key_secret,
});

/// for sms
const vonage = new Vonage({
  apiKey: process.env.apiKey,
  apiSecret: process.env.apiSecret,
});

const createOrder = asyncHandler(async (req, res) => {
  const { amount, currency, receipt, notes } = req.body;

  razorpayInstance.orders.create(
    { amount, currency, receipt, notes },
    (err, order) => {
      //STEP 3 & 4:
      if (!err) res.json(order);
      else res.send(err);
    }
  );
});

const verifyOrder = asyncHandler(async (req, res) => {
  let verifyMsg =
    "This message is to confirm that Your Orderd successfully placed";
  const { order_id, payment_id, amount, userId, phone } = req.body;
  const razorpay_signature = req.headers["x-razorpay-signature"];

  const key_secret = process.env.key_secret;

  // Creating hmac object
  let hmac = crypto.createHmac("sha256", key_secret);

  // Passing the data to be hashed
  hmac.update(order_id + "|" + payment_id);

  // Creating the hmac in the required format
  const generated_signature = hmac.digest("hex");

  if (razorpay_signature === generated_signature) {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { amount: amount, subscription: new Date() } },
      { new: true, upsert: true, useFindAndModify: false }
    );

    const payment = new Payment({ order_id, payment_id, amount, userId });

    const createdPayment = await payment.save();

    const from = "VIRTUAL_NUMBER";
    const to = phone;
    vonage.message.sendSms(from, to, verifyMsg, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    });

    res.json({ success: true, message: "Payment has been verified" });
  } else res.json({ success: false, message: "Payment verification failed" });
});

export { createOrder, verifyOrder };
