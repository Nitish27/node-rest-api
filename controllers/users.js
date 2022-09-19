const User = require('../models/User')
const asyncWrapper = require('../middleware/async')
const faker = require('faker')

const getAllUsers = asyncWrapper(async(req, res) => {
  const { page = 1, limit = 10 } = req.query
  
  const users = await User.find()
                        .limit()
                        .skip((page - 1) * limit)
                        .exec()

  const count = await User.countDocuments()
                        
  res.status(200).json({ 
    users,
    totalPages: Math.ceil(count / limit),
    currentPage: page 
  })
})

const createUser = asyncWrapper(async(req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({ user })
})

const fakeUser = async(req, res) => {
  for(let i = 0; i < 20; i++) {
    let user = {
      name: faker.name.firstName() +' '+ faker.name.lastName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      country: faker.address.country(),
      state: faker.address.state(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
      phone: faker.phone.phoneNumber(),
      website: faker.internet.url() 
    }
   
    await User.create(user)
  }

  res.status(201).json({ success: true })
}

module.exports = {
  getAllUsers,
  createUser,
  fakeUser
}