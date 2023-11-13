const express = require('express')
const { findMember, createMember, getAllMembers } = require('../controllers/memberController')

const router = express.Router()

router.route('/all').get(getAllMembers)
router.route('/find/:phone').get(findMember)
router.route('/new').post(createMember)

module.exports = router;