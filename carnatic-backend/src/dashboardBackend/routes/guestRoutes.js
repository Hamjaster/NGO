const express = require('express');
const { getGuests, deleteGuests } = require('../controllers/guests');

const router = express.Router()

router.route('/').get(getGuests)
router.route('/').delete(deleteGuests)

module.exports = router;