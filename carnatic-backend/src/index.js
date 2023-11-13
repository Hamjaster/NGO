const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const bodyParser = require('body-parser');
const port = 5000;
const app = express();
const memberRoutes = require('../src/routes/memberRoutes');
const mailRoutes = require('../src/routes/mailRotues')
const { sendMail } = require('./controllers/sendMail');

app.use(cors());
connectDB()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// All the routes
app.use('/member', memberRoutes)
app.use('/mail', mailRoutes)


// Mail route

app.listen(port)
