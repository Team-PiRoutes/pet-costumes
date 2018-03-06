const Sequelize = require('sequelize')
const db = require('../db')
// const crypto = require('crypto')
const randToken = require('rand-token')
const CartItem = require('./cart-item')

const Cart = db.define('cart', {
  cartToken: {
    type: Sequelize.STRING,
  },
  lastAccessed: {
    type: Sequelize.DATE,
  },
  merged: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})

Cart.getCartItems = function () {
  return CartItem.findAll({ where: { cartId: this.id, expired: false } })
}

Cart.prototype.markCurrentItemsExpired = function () {
  return CartItem.findAll({ where: { cartId: this.id, expired: false } })
    .then(items => {
      return Promise.all(items.map(item => {
        return item.update({ expired: true })
      }))
    })
    .catch(err => console.error(err))

}
Cart.prototype.takeCartItems = async function (victimCart) {
  await this.markCurrentItemsExpired()
  return CartItem.findAll({ where: { cartId: victimCart.id } })
    .then(victimCartItems => {

      return Promise.all(victimCartItems.map(item => {
        return item.update({ cartId: this.id })
          .then(updated => {
            let { id, priceInCents, quantity, productId } = updated
            return { id, priceInCents, quantity, productId }
          })
      }))


    }).then(cartItems => {
      victimCart.markMerged()
      return cartItems
    })
    .catch(err => console.error(err))
}
Cart.prototype.markMerged = function () {
  this.update({ merged: true })
}

Cart.beforeCreate((cart) => {
  //32 character random string to be used as token
  cart.cartToken = randToken.generate(64)
})


module.exports = Cart
