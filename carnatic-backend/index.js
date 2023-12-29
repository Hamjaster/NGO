const express = require('express');
const cors = require('cors');
const connectDB = require('./src/utils/db');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const memberRoutes = require('./src/routes/memberRoutes');
const mailRoutes = require('./src/routes/mailRotues')
const pdfRoutes = require('./src/routes/pdfRoutes')
const { sendMail } = require('./src/controllers/sendMail');


app.use(cors({
    origin: '*'
}));
connectDB()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// All the routes
app.use('/member', memberRoutes)
app.use('/mail', mailRoutes)
app.use('/pdf', pdfRoutes)

app.get('/', (req, res) => {
    res.send("APi is running successfully")
})

app.get('/test', function (req, res) {
    res.send('API is testing successfuly')
})

//initiate_payment API
app.post('/pay', function (req, res) {
    data = req.body;
    let config = {
        key: "fdsdf",
        salt: 'flkdsjf',
        env: 'test',
        enable_iframe: '1'
    }
    var initiate_payment = require('./Easebuzz/initiate_payment.js');
    initiate_payment.initiate_payment(data, config, res);
});


app.listen(port, () => {
    console.log(`'Server listening at ${port}`)
})
