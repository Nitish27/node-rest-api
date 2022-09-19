const express = require('express')
const router = express.Router()

const { register } = require('../controllers/auth')

router.route('/register').post(register)

// router.route('/login').post(fakePost)

module.exports = router
