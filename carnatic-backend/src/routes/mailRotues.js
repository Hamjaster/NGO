const express = require('express')
const { sendMail } = require('../controllers/sendMail');
const { sendCheckedMail } = require('../controllers/sendCheckedMail');

const router = express.Router()


router.route('/').post(sendMail)
router.route('/checkedMail').post(sendCheckedMail)


module.exports = router;