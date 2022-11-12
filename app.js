require("dotenv").config();
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const auth = require('./routes/auth')
const tasks = require('./routes/tasks')
const users = require('./routes/users')
const posts = require('./routes/posts')
const notFound = require('./middleware/not-found')

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/tasks', tasks);
app.use('/api/v1/posts', posts);

app.use(notFound)

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB('mongodb://localhost:27017/nodeexpress')
    app.listen(port, () =>  console.log(`Listening on Port ${port} ....`))
  } catch (error) {
    console.log(error)
  }
}

start()