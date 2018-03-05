
const router = require('express').Router()
const { Order } = require('../db/models')


router.get('/', (req, res, next) => {
  const userQuery = req.query.userid ? { userId: req.query.userid } : {}

  Order.findAll({
    where: userQuery,
    attributes: ['id', 'email', 'orderStatus', 'city', 'state']
  })
    .then((orders) => res.json(orders))
    .catch(next)
})

module.exports = router

