const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  lastAccessed: {
    type: Sequelize.DATE,
  }

})

module.exports = Cart
