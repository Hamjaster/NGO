const express = require('express')
const { findMember, createMember } = require('../controllers/memberController')

const router = express.Router()

router.route('/find/:phone').get(findMember)
router.route('/new').post(createMember)

module.exports = router;