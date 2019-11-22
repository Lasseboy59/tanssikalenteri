const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('ballrooms', { title: 1, author: 1, url: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (!body.password || body.password.length < 3) {
    response.status(400).send({ error: 'password should be at least 8 chars' })
  } else {
    try {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

      const savedUser = await user.save()
      response.json(savedUser)
    } catch (error) {
      response.status(400).send({ error: error.message })
      next.error
    }
  }
})

module.exports = usersRouter