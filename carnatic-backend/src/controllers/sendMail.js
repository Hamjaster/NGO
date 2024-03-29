const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const giveHTML = require('../documents/document')
const path = require('path')
const fs = require('fs');
const pdf = require('html-pdf');
const { Counter } = require('../models/DonationSchema');



const sendMail = async (req, res) => {
  const count = await Counter.findOne({ id: "autoval" })
  console.log(count);
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
    from: 'noreply@gmail.com',
    to: email,
    subject: 'Carnatic Foundation - Thanks & Donation Receipt',
    html: giveHTML(req.body, count.sequence),
    text: `
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

