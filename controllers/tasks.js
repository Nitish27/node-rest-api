const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')


const getAllTasks = asyncWrapper(async(req, res) => {
  const tasks = await Task.find({})

  res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async(req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})

module.exports = {
  getAllTasks,
  createTask
}