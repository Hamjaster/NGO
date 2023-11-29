const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const giveHTML = require('../documents/document')
const path = require('path')
const fs = require('fs');
const pdf = require('html-pdf')



const sendMail = async (req, res) => {
  // const outputDir = path.join(__dirname, '..', 'invoices'); // Directory for storing generated PDFs
  // const pdfPath = path.join(outputDir, `invoice_${uuidv4()}.pdf`); // Path to save the PDF

  // First we'l generate PDF
  // pdf.create(giveHTML(req.body), {}).toFile(pdfPath, (err) => {
  // if (err) {
  // Error on pdf gen
  // res.send("Error while generating PDF")
  // } else {
  // Success on pdf gen
  const { email } = req.body;
  // const pathToAttachment = path.join(path.dirname(__dirname), 'invoice.pdf')
  // const attachment = fs.readFileSync(pdfPath).toString('base64')

  const mailOptions = {
    from: 'carnaticfoundation@gmail.com',
    to: email,
    subject: 'Carnatic Foundation - Thanks & Donation Receipt',
    html: giveHTML(req.body),
    text: `Dear ${req.body.name},
    We want to sincerely thank you for your generous donation of INR ${req.body.amount} in support of ${req.body.project}. It is through the incredible support of donors like you that we are able to continue providing crucial projects. 
    We truly appreciate you making the choice not only to contribute to Carnatic Foundation today but also to stand with us as a supporter in the future.
    Please find the attached receipt for your donation. 
    Thank you once again for your tremendous generosity. We are so grateful for your support.
    Carnatic Foundation
    P.s : Tax Exemption certificate will be sent to you shortly.
    `
    // attachments: [{
    //   content: attachment,
    //   filename: 'invoice.pdf',
    //   contentType: 'application/pdf',
    //   path: pdfPath,
    //   disposition: 'attachment'
    // }]
  };

  const transporter = nodemailer.createTransport({

    // For production
    host: "smtp.gmail.email",
    service: 'gmail',
    auth: {
      user: 'carnaticfoundation@gmail.com',
      pass: "xlvj bshe ucmr jnzk"
    },
    secure: false,
    tls: { rejectUnauthorized: false }

    // For testing

    // host: 'smtp.ethereal.email',
    // port: 587,
    // secure: false,
    // auth: {
    //   user: 'hilma.dibbert@ethereal.email',
    //   pass: 'r28qfQNYWuDNc43grz'
    // },
    // tls: {
    //   // do not fail on invalid certs
    //   rejectUnauthorized: false
    // },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send({ success: false, data: error })
      console.log(error)
    } else {
      res.status(200).send({ success: true, data: info })
      console.log('done')
    }
  });

  // }
}
// )

// }
module.exports = { sendMail }

