const express = require('express');
const { getGuests } = require('../controllers/guests');

const router = express.Router()

router.route('/').get(getGuests)

module.exports = router;