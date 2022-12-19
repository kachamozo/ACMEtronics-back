const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = process.env;
require("dotenv").config();
const stripe = new Stripe(STRIPE_SECRET_KEY);
const { Router } = require("express");

const checkout = async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: "product",
      payment_method: id,
      confirm: true,
    });
    return res.json({
      message: "The payment was Successful",
      receipt_url: payment.charges.data[0].receipt_url,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
};

module.exports = {
  checkout,
};
