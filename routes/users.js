const express = require('express')
const router = express.Router()

const { getAllUsers, createUser, fakeUser } = require('../controllers/users')

router.route('/').get(getAllUsers).post(createUser)

router.route('/fake').get(fakeUser)

module.exports = router