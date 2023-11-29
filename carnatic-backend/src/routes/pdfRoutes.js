const express = require('express')
const { sendMail } = require('../controllers/sendMail');
const { createPdf, fetchPdf } = require('../controllers/createPdf');

const router = express.Router()


router.route('/create').post(createPdf)
router.route('/get').post(fetchPdf)


module.exports = router;