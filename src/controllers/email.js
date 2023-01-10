const Router = require("express");

const sendEmail = async (req, res) => {
  const { items, totalCost, customerEmail } = req.body;

  try {
    const mailgunUrl =
      "https://api.mailgun.net/v3/sandbox9a9769bf793f4b3a8f5566a8ad2acb4f.mailgun.org";
    const response = await axios.post(
      `${mailgunUrl}/messages`,
      {
        from: "erikajpinedab@gmail.com",
        to: customerEmail,
        subject: "Purchase Receipt",
        html: `
        <p>Thank you for your purchase!</p>
        <p>Here is a summary of your order:</p>
        <ul>
        ${items
          .map(
            (item) =>
              `<li>${item.name} - ${item.quantity} x $${item.price}</li>`
          )
          .join("")}
        </ul>
        <p>Total cost: $${totalCost}</p>
      `,
      },
      {
        auth: {
          username: "api",
          password: "3bb60f00a3df7540c41cfd60aeeae696-4c2b2223-f4622c94",
        },
      }
    );
    console.log(response.data);
    res.send("Email was sent successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
};

module.exports = {
  sendEmail,
};
