
const router = require('express').Router()
const { Order } = require('../db/models')


router.get('/admin/list-orders', (req, res, next) => {
  console.log('hitting route !#$@#$@')
  Order.findAll({
    attributes: ['id', 'email', 'city', 'state']
  })
    .then((orders) => res.json(orders))
    .catch(next)
})

module.exports = router

