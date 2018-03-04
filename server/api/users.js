const router = require('express').Router()
const { User } = require('../db/models')
const { adminOnly } = require('./authorization')

module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'isAdmin', 'shouldResetPassword', 'deletedAt']
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id, { attributes: ['id', 'email', 'isAdmin', 'shouldResetPassword', 'deletedAt']})
    .then(user => res.json(user))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(next)
})

router.delete('/:id', adminOnly, (req, res, next) => {
  User.findById(req.params.id)
    .then(user => user.destroy())
    .then(updatedUser => res.status(200).json(updatedUser))
    .catch(next)
})
