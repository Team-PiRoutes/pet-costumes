/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const Cart = db.model('cart')
const CartItem = db.model('cartItem')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Retrieve Cart /api/orders/cart/:cartId/:cartToken ', () => {
    let testCart,
      testItem,
      product,
      route,
      correctCartInfo


    beforeEach(async () => {
      product = Product.create(
        {
          title: 'Dog pirate suit',
          description: 'Turn your pup into an adorable pirate!',
          priceInCents: 1999,
          quantity: 10,
          size: 'S'
        })
      testCart = Cart.create({})
      product = await product
      testItem = await CartItem.create({
        cartId: testCart.cartId,
        priceInCents: 123,
        quantity: 2,
        productId: product.id
      })
      testCart = await testCart
      await testCart.addCartItem(testItem)

      correctCartInfo = {
        cartId: '' + testCart.id,
        cartToken: testCart.cartToken
      }

      route = `/api/cart/${correctCartInfo.id}/${correctCartInfo.cartToken}`


    })

    it(`Get /:cartId/:cartToken gets cart if token and id match`, () => {
      route = `/api/cart/${testCart.id}/${testCart.cartToken}`
      return request(app)
        .get(route)
        .expect(200)
        .then(res => {

          let cart = res.body

          expect(cart.cartItems).to.be.an('array')
          expect(cart.cartItems[0].productId).to.be.equal(testItem.productId)
          expect(cart.cartItems[0].quantity).to.be.equal(testItem.quantity)

        })
    }) //end it(Get /:cartId/:cartToken' for correct tokens,)

    it(`Get /:cartId/:cartToken gets cart if cartId does not`, () => {
      route = `/api/cart/100000/${testCart.cartToken}`


      return request(app)
        .get(route)
        .expect(404)
        .then(res => {

          let cart = res.body
          expect(cart.cartItems).to.be.an('array')
          expect(cart.cartItems.length).to.be.equal(0)
          expect(cart.cartId).to.be.equal(null)
          expect(cart.cartToken).to.be.equal(null)
        }) //end it(Get /:cartId/:cartToken gets cart if cartId does not)
    }) // end describe('Get /:cartId/:cartToken' if token does not match)
    // describe('Helper functions', () => {
    //   const cartItems = [{
    //     productId: 1,
    //     priceInCents: 4550,
    //     quantity: 5,
    //     cartId: 1
    //   }]
    //   const cart = {
    //     cartId: 1,
    //     token: 'token string'
    //   }
    //   // const result = createRetrieveCartResponseObject(cartItems, cart)
    //   it('returns an object', () => {
    //     expect(result).to.be.an('objectç')
    //   })
  })
}) // end describe('Order routes')
