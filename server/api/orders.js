
const router = require('express').Router()
const { Order, OrderItem } = require('../db/models')


router.get('/', (req, res, next) => {
  const userQuery = req.query.customerid ? { customerId: req.query.customerid } : {}

  Order.findAll({
    where: userQuery,
    include: [
      { model: OrderItem }
    ]
  })
    .then((orders) => res.json(orders))
    .catch(next)
})

router.post('/', (req, res, next) => {
  let order = {
    customerId: req.body.customerId,
    email: req.body.email,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    oderStatus: 'created'
  }
  Order.create(order)
    .then(newOrder => res.status(201).json(newOrder))
    .catch(next)
})

module.exports = router

 module.exports = router
