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
app.get('/checkedMail', function (req, res) {
    res.send('API is fucking')
})

//initiate_payment API
app.post('/pay', function (req, res) {
    let data = req.body;
    var config = {
        key: "8O8HMOWD9Y",
        salt: "LH06DRZKC8",
        env: "prod",
        enable_iframe: 1,
    };
    console.log(config, 'thats config')
    var initiate_payment = require('./Easebuzz/initiate_payment.js');
    initiate_payment.initiate_payment(data, config, res);
});


app.listen(port, () => {
    console.log(`'Server listening at ${port}`)
})
