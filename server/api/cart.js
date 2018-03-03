require('babel-polyfill')
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

router.put('/update', async function (req, res, next) {
  try {
    console.log('/update route req.body', req.body)
    let cart = await Cart.findById(req.body.cartId, {
      include: {
        model: CartItem,
        where: { ordered: false },
        as: 'cartItems'
      }
    })
    if (!!req.body.cartToken && req.body.cartToken === cart.cartToken) {

      const cartItemsIndex = cart.cartItems.findIndex(cartItem => {
        return cartItem.id === req.body.cartId
      })

      if (cartItemsIndex >= 0) {

        const itemId = cart.cartItems[cartItemsIndex].id

        let oldCartItem = await CartItem.findById(itemId)
        let updatedCartItem = await oldCartItem.update(req.body.itemForCart)

        res.status(200).json({ updatedCartItem, cartId: cart.id, cartToken: cart.cartToken })
      } else {
        let createdCartItem = await CartItem.create(req.body.itemForCart)
        cart.addCartItem(createdCartItem)
        res.status(200).json({
          updatedCartItem: createdCartItem,
          cartId: cart.id,
          cartToken: cart.cartToken
        })
      }
    }
    else {
      addNewCart(req, res, next)
    }
  }
  catch (error) {
    next(error)
  }


})

router.put('/newCart', addNewCart)


async function addNewCart(req, res, next) {

  try {
    let [cart, cartItem] = await Promise.all(
      [Cart.create(),
      CartItem.create(req.body.itemForCart)])
    // let cart = await Cart.create()
    // let cartItem = await CartItem.create(req.body.itemForCart)
    await cart.addCartItem(cartItem)

    let responseObj = { cartId: cart.id, cartToken: cart.cartToken, cartItem }
    res.status(200).json(responseObj)
  }
  catch (err) {
    next(err)
  }
}
