const Client = require('../models/Client')
const asyncWrapper = require('../middleware/async')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = asyncWrapper(async(req, res) => {
  //Get User input
  const { first_name, last_name, email, password } = req.body

  // Validate user input
  if(!(email && password && first_name && last_name)) {
    res.status(400).send('All input is required')
  }

  //check is user already exists
  const oldClient = await Client.findOne({ email })

  if(oldClient) {
    return res.status(409).send('User already exists. Plz Login')
  }

  //Encrypt User Password
  encryptedPassword = await bcrypt.hash(password, 10)

  // Create user in our database
  const client = await Client.create({
    first_name,
    last_name,
    email: email.toLowerCase(),
    password: encryptedPassword
  })

  // Create token
  const token = jwt.sign(
    { user_id: client._id, email },
    "my-token-secret",
    {
      expiresIn: '2h'
    }
  )

  client.token = token

  res.status(200).json({ client })
})


const login = asyncWrapper(async(req, res) => {
  try {
    console.log(req.body)
    const {email, password} = req.body

    if(!(email && password)) {
      res.status(400).send('All input is required')
    } 

    const client = await Client.findOne({ email });

    if(client && (await bcrypt.compare(password, client.password))) {
      const token = jwt.sign(
        { client_id: client._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h'
        }
      )

      //save user token
      // client.token = token;

      // user
      res.status(200).json({ token })
    }

    res.status(400).send("Invalid credentials");
  } catch (err) {
    console.log(err);
  }
})

module.exports = {
  register,
  login
}