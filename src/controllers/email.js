const Router = require("express");
const nodemailer = require("nodemailer")

const sendEmail = async (req, res) => {
  const {customerEmail, items, totalCost } = req.body

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure:false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }, 
    tls: {
      rejectUnauthorized: false
    }
});

  const mailOptions = {
    from:process.env.EMAIL_USER,
    to: customerEmail, 
    subject: "Purchase Receipt", 
    html: `<h1>Thank you for your purchase!</h1>
    <h2>Here is a summary of your order:</h2>
    <ul>
    ${items
      .map(
        (item) =>
          `<li>${item.name} - ${item.quantity} x $${item.price}</li>`
      )
      .join("")}
    </ul>
    <h3>Total cost: $${totalCost}</h3>`
  }

  transporter.sendMail(mailOptions, (error, info)=> {
    if(error){return res.status(400).send('No se pudo enviar el correo')}
    else {
      console.log('Email enviado') 
      return res.status(200).send(req.body)}
  })


};
  

module.exports = {
  sendEmail,
};
