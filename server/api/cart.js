const router = require('express').Router()
const { Cart, CartItem } = require('../db/models')
module.exports = router


//get cart by id
router.get('/:id', (req, res, next) => {
  //need to alter to get current price
  Cart.findById(req.params.id, {
    include: {
      model: CartItem,
      where: { ordered: false },
      as: 'cartItems',
      attributes: ['id', 'quantity', 'priceInCents']
    }
  })
    .then(cart => res.json(cart))
    .catch(next)
})

router.put('/update', (req, res, next) => {
  let cookie = req.body.cookie
  console.log('/add cookie', cookie)
  Cart.findById(cookie.cartId, {
    include: {
      model: CartItem,
      where: { ordered: false },
      as: 'cartItems'
    }
  })
    .then(cart => {

      if (!!cookie.cartToken && cookie.cartToken === cart.cartToken) {
        console.log('Cart created, added, updated by database', cart.cartItems[0])

        const cartItemsIndex = cart.cartItems.findIndex(cartItem => {
          return cartItem.id === cookie.cartId
        })
        console.log(cart.cartItems[cartItemsIndex])
        return cart.cartItems[cartItemsIndex].id
      } else {
        res.sendStatus(411)
      }

    })
    .then(itemId => CartItem.findById(itemId))
    .then(item => item.update(req.body.itemForCart))
    .then(item => res.status(200).json(item))
    .catch(next)

})

router.put('/newCart', (req, res, next) => {
  Cart.create()
    .then(cart => {
      const cartItem = CartItem.create(req.body.itemForCart)

      console.log(cartItem)
      // return { cartId: cart.id, cart: cart.token, cartItem }
      Promise.all([cart, cartItem])
    })
    .then(([cart, cartItem]) => {
      cart.addCartItem(cartItem)
      return Promise.all([cart, cartItem])
    })
    .then(([cart, cartItem]) => {
      let responseObj = { cartId: cart.id, cart: cart.token, cartItem }
      res.status(200).json(responseObj)
    })
    .catch(next)

})
