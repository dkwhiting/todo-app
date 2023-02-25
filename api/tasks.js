const router = require('express').Router()
const {
  getTasksByUserId
} = require('../db')

router.get('/:userId', async (req, res, next) => {
  debugger
  try {
    const tasks = await getTasksByUserId(req.params.userId)
    res.send(tasks)
  } catch (error) {

  }
})

module.exports = router