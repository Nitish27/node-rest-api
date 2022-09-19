const Post = require('../models/Post')
const asyncWrapper = require('../middleware/async')
const faker = require('faker')
const User = require('../models/User')

const getAllPosts = asyncWrapper(async(req, res) => {
    const posts = await Post.find()

    res.status(200).json({ posts })
})

const fakePost = async(req, res) => {
  
  for(let i = 0; i < 20; i++) {
    let user = await User.findOne({ country: faker.address.country() }).exec();

    if(user) {
      let post = {
        userId: user.id,
        title: faker.lorem.words(),
        body: faker.lorem.paragraphs(),
      }
     
      await Post.create(post)
    }

  }

  res.status(201).json({ success: true })
}

module.exports = {
  getAllPosts,
  fakePost
}