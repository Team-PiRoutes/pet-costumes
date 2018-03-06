
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

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.status(200).json(updatedOrder))
    .catch(next)
})

 module.exports = router
