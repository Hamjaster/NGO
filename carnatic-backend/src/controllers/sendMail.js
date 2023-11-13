const nodemailer = require('nodemailer');


const sendMail = async (req, res) => {
  const { name, email, PAN, phone, amount, project } = req.body;

  const mailOptions = {
    from: 'user@example.com',
    to: email,
    subject: 'Your Donation receipt',
    html: `
      
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Donation Receipt</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">

  <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">

    <h2 style="text-align: center; color: #333;">Donation Receipt</h2>

    <div style="margin-top: 20px; font-size : 18px">
      <p><strong>User Name:</strong> ${name}</p>
      <p><strong>PAN Card No.:</strong> ${PAN}</p>
      <p><strong>Phone Number:</strong> +91 ${phone}</p>
      <p><strong>Amount Donated:</strong> ${amount} INR</p>
      <p><strong>Project Name:</strong> ${project}</p>
    </div>

    <div style="margin-top: 30px; text-align: center;">
      <p style="color: #777; font-size: 14px;">Thank you for your generous donation!</p>
    </div>

    <div style="margin-top: 30px; text-align: center;">
      <p style="color: #777; font-size: 12px;">This is an automated email. Please do not reply.</p>
    </div>

  </div>

</body>
</html>

              `
  };

  const transporter = await nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'destinee.rolfson@ethereal.email',
      pass: 'dPhf3qZyMC8cNKPuvE'
    },

    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    },

  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error)
    } else {
      return res.status(200).send({ msg: 'Email sent successfully!', data: info })
    }
  });
}
module.exports = { sendMail }

