const Sequelize = require('sequelize')
const db = require('../db')
// const crypto = require('crypto')
const randToken = require('rand-token')

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
  cart.cartToken = randToken.generate(64)
})


module.exports = Cart
