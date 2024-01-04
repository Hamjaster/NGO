const nodemailer = require('nodemailer');


const sendCheckedMail = async (req, res) => {
    const mailOptions = {
        from: 'noreply@gmail.com',
        to: "trustee@carnaticfoundation.in",
        subject: 'Carnatic Foundation - Donor update',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Donor info</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
        
            table {
              width: 50%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
        
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
        
            th {
              background-color: #f2f2f2;
            }
        
            td:nth-child(even) {
              background-color: #f9f9f9;
            }
        
            strong {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <table>
            <tbody>
            <tr>
              <td><strong>Name</strong></td>
              <td>${req.body.name}</td>
            </tr>
             
              <tr>
                <td><strong>Phone</strong></td>
                <td>${req.body.phone}</td>
              </tr>
              <tr>
                <td><strong>PAN</strong></td>
                <td>${req.body.PAN}</td>
              </tr>
              <tr>
                <td><strong>Email</strong></td>
                <td>${req.body.email}</td>
              </tr>
              <tr>
                <td><strong>Address</strong></td>
                <td>${req.body.address}</td>
              </tr>
              <tr>
                <td><strong>Amount</strong></td>
                <td>${req.body.amount}</td>
              </tr>
              <tr>
              <td><strong>Project</strong></td>
              <td>${req.body.project}</td>
            </tr>
            </tbody>
          </table>

        </body>
        </html>
        


        ` ,

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
module.exports = { sendCheckedMail }

