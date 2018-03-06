const router = require('express').Router()

const { Cart, CartItem, Product, User } = require('../db/models')
module.exports = router
const cartItemAttributes = ['id', 'quantity', 'priceInCents', 'productId']

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
    // console.log(cartToken)
    // console.log(cart.cartToken)
    // console.log(' checking token match :', cartToken === cart.cartToken)
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

    let itemId
    if (cartItemsIndex >= 0) {
      itemId = cart.cartItems[cartItemsIndex].id
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
    let cartId = +req.params.cartId
    let cartToken = req.params.cartToken
    let cart = await Cart.findById(cartId, {
      include: {
        model: CartItem,
        where: { ordered: false, expired: false },
        as: 'cartItems',
        attributes: cartItemAttributes
      }
    })

    if (!!cartToken && cart && cartToken === cart.cartToken) {
      res.json(cart)

    } else {
      const clearBadCart = {
        cartToken: null,
        cartId: null,
        cartItems: []
      }
      res.status(404).json(clearBadCart)

    }
  } catch (err) {
    next(err)
  }
  // } catch (err) { next(err) }

})
router.put('/userCart', async (req, res, next) => {
  try {
    console.log('made it to the route')
    let visitorCartId = req.body.cartInfo.cartId
    let visitorCartToken = req.body.cartInfo.cartToken
    const user = req.body.user
    let userCart, visitorCart, resultCart
    let userInstance = User.findById(user.id) //awaited much later

    userCart = Cart.findById(user.cartId, {
      include: {
        model: CartItem,
        where: { ordered: false, expired: false },
        as: 'cartItems',
        attributes: cartItemAttributes
      }
    })
    if (visitorCartId && visitorCartToken) {

      visitorCart = Cart.findById(visitorCartId, {
        include: {
          model: CartItem,
          where: { ordered: false, expired: false },
          as: 'cartItems',
          attributes: cartItemAttributes
        }
      })
      //authenticate cart
    }
    userCart = await userCart
    visitorCart = await visitorCart


    //are both carts there and the same cart?
    if (userCart && visitorCart && user.cartId === visitorCart.id) {
      res.json(
        createRetrieveCartResponseObject(userCart.cartItems, userCart)
      )
    } else if (userCart && visitorCart) {
      //both carts are here, but not the same cart
      const activeItems = await userCart.takeCartItems(visitorCart)
      console.log(activeItems)
      resultCart = createRetrieveCartResponseObject(activeItems, userCart)
      console.log(resultCart)
      res.json(resultCart)
    } else if (userCart) {

      res.json(
        createRetrieveCartResponseObject(userCart.cartItems, userCart)
      )
    } else if (visitorCart) {
      userInstance = await userInstance
      userInstance.update({ cartId: visitorCart.id })
      res.json(
        createRetrieveCartResponseObject(visitorCart.cartItems, visitorCart)
      )
    } else {
      userInstance = await userInstance
      const firstCart = await Cart.create()
      userInstance.update({ cartId: firstCart.id })
      res.json(createRetrieveCartResponseObject([], firstCart))
    }

  }
  catch (err) {
    next(err)
  }
})


/*----Callback function----*/
async function addNewCart(req, res, next) {

  try {

    let [cart, cartItem] = await Promise.all(
      [Cart.create(),
      CartItem.create(req.body.itemForCart)])
    cart.addCartItem(cartItem)

    let responseObj = createCartItemResponseObject(cartItem, cart)
    res.status(200).json(responseObj)
  }
  catch (err) {
    next(err)
  }
}

function createCartItemResponseObject(cartItems, cart) {
  return {
    cartId: cart.id,
    cartToken: cart.cartToken,
    cartItem: {
      id: cartItems.id,
      quantity: cartItems.quantity,
      productId: cartItems.productId,
      priceInCents: cartItems.priceInCents,

    }
  }
}

function createRetrieveCartResponseObject(cartItems, cart) {
  console.log('##### where I want to be ######')

  console.log('cartItems', cartItems)
  console.log('cart   ', cart)
  return {
    cartId: cart.id,
    cartToken: cart.cartToken,
    cartItems: [...cartItems]
  }
}
