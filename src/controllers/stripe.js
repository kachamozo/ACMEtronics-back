const Stripe = require("stripe");
const { STRIPE_SECRET_KEY } = process.env;
require("dotenv").config();
const stripe = new Stripe(STRIPE_SECRET_KEY);

const checkout = async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "USD",
      description: "product",
      payment_method: id,
      confirm: true,
    });

    if (payment.status === "succeeded") {
      res.json({
        message: "The payment was Successful",
        receipt_url: payment.charges.data[0].receipt_url,
      });
    } else {
      res.json({ message: "The payment was not successful" });
    }
  } catch (error) {
    console.log(error)
    return res.json({ message: error.message });
  }
};

module.exports = {
  checkout,
};
