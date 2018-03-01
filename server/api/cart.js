const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router


//get cart by id
router.get('/:id', (req, res, next) => {
  Cart.findById(req.params.id, { include: 'cartItems' })
    .then(cart => res.json(cart))
    .catch(next)
})
