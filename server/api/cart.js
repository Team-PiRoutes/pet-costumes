const router = require('express').Router()

const { Cart, CartItem } = require('../db/models')
module.exports = router


router.put('/update', async function (req, res, next) {
  try {
    let cartId = +req.body.cartInfo.cartId
    let cartToken = req.body.cartToken

    console.log('/update route req.body', req.body)
    let cart = await Cart.findById(cartId, {
      include: {
        model: CartItem,
        where: { ordered: false },
        as: 'cartItems'
      }
    })
    if (!!cartToken && cartToken === cart.cartToken) {

      const cartItemsIndex = cart.cartItems.findIndex(cartItem => {
        return cartItem.id === cartId
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


router.get('/:cartId/:cartToken', async (req, res, next) => {

  try {

    console.log('myCart Route has been hit..########', +req.params.cartId)
    let cartId = +req.params.cartId
    let cartToken = req.params.cartToken
    let cart = await Cart.findById(cartId, {
      include: {
        model: CartItem,
        where: { ordered: false },
        as: 'cartItems',
        attributes: ['id', 'quantity', 'priceInCents']
      }
    })
    console.log('cartToken', cartToken, 'cart.token', cart.cartToken)
    if (!!cartToken && cartToken === cart.cartToken) {
      res.json(cart.cartItems)

    } else {
      res.sendStatus(404)
    }
  } catch (err) { next(err) }

})

router.put('/userCart', async (req, res, next) => {
  try {
    let visitorCartId = req.body.cartInfo.cartId
    let visitorCartToken = req.body.cartInfo.cartToken
    const user = req.body.user
    let userCart
    let visitorCart

    if (user.cartId) {
      userCart = await Cart.findById(user.cartId)
      console.log(userCart)
    }

    if (!visitorCartId && !visitorCartToken) {

      // get the cart form cart table
      visitorCart = await Cart.findById(user.cartId)
      console.log(visitorCart)
      //authenticate cart
    }

    if (userCart && visitorCart) {
      // stuff
    } else if (userCart) {
      // stuff
    } else if (visitorCart) {
      // stuff
    }

  }
  catch (err) {
    next(err)
  }
})


/*----Callback function----*/
async function addNewCart(req, res, next) {
  console.log('in newCart fun fun function')
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

// router.get('/:id', (req, res, next) => {
//   //need to alter to get current price
//   Cart.findById(req.params.id, {
//     include: {
//       model: CartItem,
//       where: { ordered: false },
//       as: 'cartItems',
//       attributes: ['id', 'quantity', 'priceInCents']
//     }
//   })
//     .then(cart => res.json(cart))
//     .catch(next)
// })
