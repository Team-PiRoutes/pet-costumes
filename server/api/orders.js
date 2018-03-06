
const router = require('express').Router()
const { Order } = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  Order.findAll()
    .then((orders) => res.json(orders))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => res.status(200).json(updatedOrder))
    .catch(next)
})
