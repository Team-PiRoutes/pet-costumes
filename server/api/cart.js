const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router


//get cart by id
router.get('/:id', (req, res, next) => {
  Cart.findById(req.params.id,
    //  { include: 'cartItem' }
  )
    .then(cart => res.json(cart))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  Cart.findOrCreate(req.params.id,
    { include: 'cartItem' })
    .then(cart => {
      cart.dir(cart)
    })

})
