const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { createUser } = require('../db')

router.post('/register', async (req, res, next) => {
  debugger
  try {
    const user = await createUser(req.body)
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1W' })
    res.send(token)
  } catch (error) {
    next(error)
  }
})

module.exports = router