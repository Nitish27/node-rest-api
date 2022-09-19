const express = require('express')
const router = express.Router()

const { getAllPosts, fakePost } = require('../controllers/posts')

router.route('/').get(getAllPosts)

router.route('/fake').get(fakePost)

module.exports = router