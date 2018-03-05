const router = require('express').Router()

const { Cart, CartItem, Product } = require('../db/models')
module.exports = router


router.put('/update', async function (req, res, next) {
  try {
    let cartId = +req.body.cartInfo.cartId
    let cartToken = req.body.cartToken
    let itemForCart = req.body.itemForCart

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
        return cartItem.productId === itemForCart.productId
      })

      if (cartItemsIndex >= 0) {

        const itemId = cart.cartItems[cartItemsIndex].id

        let oldCartItem = await CartItem.findById(itemId)
        let updatedCartItem = await oldCartItem.update(req.body.itemForCart)

        res.status(200).json({
          updatedCartItem,
          cartId: cart.id,
          cartToken: cart.cartToken
        })
      }
      // else { //maybe not needed. leaving until determined
      //   let createdCartItem = await CartItem.create(req.body.itemForCart)
      //   cart.addCartItem(createdCartItem)
      //   res.status(200).json({
      //     updatedCartItem: createdCartItem,
      //     cartId: cart.id,
      //     cartToken: cart.cartToken
      //   })
      // }
    }
  }
  catch (error) {
    next(error)
  }


})

router.post('/addToCart', async function (req, res, next) {
  try {

    let cartId = +req.body.cartInfo.cartId,
      cartToken = req.body.cartInfo.cartToken,
      itemForCart = req.body.itemForCart,
      productInfo = Product.findById(+itemForCart.productId),
      updateObject = {}, //to feed into .update()
      cartItemToUpdate,
      updatedCartItem


    let cart
    if (cartId) {
      cart = await Cart.findById(cartId, {
        include: {
          model: CartItem,
          where: { ordered: false },
          as: 'cartItems'
        }
      })
    }

    // if cart is falsy/not there or if cart id and token to not match
    //create new cart
    console.log(cartToken)
    console.log(cart.cartToken)
    console.log(' checking token match :', cartToken === cart.cartToken)
    if (!cart || (cart && (cartToken !== cart.cartToken))) {
      cart = await Cart.create()
      cartId = cart.id
      cartToken = cart.cartToken
      cart.cartItems = []
    }
    //check if item is in cart
    const cartItemsIndex = cart.cartItems.findIndex(cartItem => {
      return (
        cartItem.productId === itemForCart.productId &&
        cartItem.ordered === false)
    })


    if (cartItemsIndex >= 0) {
      const itemId = cart.cartItems[cartItemsIndex].id
      let oldCartItem = await CartItem.findById(itemId)
      updateObject.quantity = oldCartItem.quantity + itemForCart.quantity
      cartItemToUpdate = oldCartItem
    } else { //item is not in cart
      updateObject.quantity = itemForCart.quantity
    }
    //current price
    productInfo = await productInfo
    updateObject.priceInCents = productInfo.priceInCents
    updateObject.productId = productInfo.id

    if (cartItemToUpdate) {
      updatedCartItem = await cartItemToUpdate.update(updateObject)
    } else { // not enough in stock set to current in stock
      updatedCartItem = await CartItem.create(updateObject)
      cart.addCartItem(updatedCartItem)

    }
    const respostObj = createCartItemResponseObject(updatedCartItem, cart)
    // console.log('updated cart item', updatedCartItem)
    res.status(200).json(respostObj)
  }
  catch (err) {
    next(err)
  }
})

//get cart upon arrival
router.get('/:cartId/:cartToken', async (req, res, next) => {
  try {

    console.log('myCart Route has been hit..########', +req.params.cartId, req.params.cartToken)
    let cartId = +req.params.cartId
    let cartToken = req.params.cartToken
    let cart = await Cart.findById(cartId, {
      include: {
        model: CartItem,
        where: { ordered: false },
        as: 'cartItems',
        attributes: ['cartId', 'quantity', 'priceInCents', 'productId']
      }
    })
    if (!!cartToken && cartToken === cart.cartToken) {
      res.json(cart)

    } else {
      const clearBadCart = {
        cartToken: null,
        cartId: null,
        cartItems: {}
      }
      res.status(404).json({ clearBadCart })
    }
  } catch (err) { next(err) }

})
router.put('/userCart', async (req, res, next) => {
  try {
    let visitorCartId = +req.body.cartInfo.cartId
    let visitorCartToken = req.body.cartInfo.cartToken
    const user = req.body.user
    let userCart, visitorCart, resultCart


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
      // res.json({
      //   cart: userCart.cartItems,
      //   cartId: userCart.id,
      //   cartToken: userCart.cartToken
      // })
    } else if (visitorCart) {
      // res.json({
      //   cart: visitorCart.cartItems,
      //   cartId: visitorCart.id,
      //   cartToken: visitorCart.cartToken
      // })
    }
  }


  catch (err) {
    next(err)
  }
})


/*----Callback function----*/
async function addNewCart(req, res, next) {
  console.log('in newCart fun fun function', req.body.itemForCart)
  try {

    let [cart, cartItem] = await Promise.all(
      [Cart.create(),
      CartItem.create(req.body.itemForCart)])
    console.log('cartItem product id', cartItem.productId)
    cart.addCartItem(cartItem)

    let responseObj = createCartItemResponseObject(cartItem, cart)


    console.log('new cart response object', responseObj)
    res.status(200).json(responseObj)
  }
  catch (err) {
    next(err)
  }
}

function createCartItemResponseObject(modelObject, cart) {
  return {
    cartId: cart.id,
    cartToken: cart.cartToken,
    cartItem: {
      productId: modelObject.productId,
      quantity: modelObject.quantity,
      priceInCents: modelObject.priceInCents
    }
  }
}
