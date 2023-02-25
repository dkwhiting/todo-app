const router = require('express').Router()
const { client } = require('../db')

// MIDDLEWARE GOES HERE


//ROUTES
router.use('/users', require('./users'));
router.use('/tasks', require('./tasks'));

//ERROR HANDLER
router.use('/*', (error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
    error: error.error
  })
})

module.exports = router