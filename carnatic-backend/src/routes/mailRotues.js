const express = require('express')
const { sendMail } = require('../controllers/sendMail');

const router = express.Router()


router.route('/').post(sendMail)


module.exports = router;