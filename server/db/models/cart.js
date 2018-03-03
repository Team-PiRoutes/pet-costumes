const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

const Cart = db.define('cart', {
  cartToken: {
    type: Sequelize.STRING,
  },
  lastAccessed: {
    type: Sequelize.DATE,
  },

})

Cart.beforeCreate((cart) => {
  //32 character random string to be used as token
  cart.cartToken = crypto.randomBytes(32).toString('base64')
})


module.exports = Cart
