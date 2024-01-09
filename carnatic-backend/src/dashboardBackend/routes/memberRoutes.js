const express = require('express');
const { getMembers, deleteMember, addMember, getTransactions } = require('../controllers/members');

const router = express.Router()

router.route('/').get(getMembers)
router.route('/').post(addMember)
router.route('/').delete(deleteMember)
router.route('/transactions/:id').get(getTransactions)

module.exports = router;