const express = require('express');
const { donate } = require('../controllers/donate');


const router = express.Router()

router.route('/').post(donate)

module.exports = router;