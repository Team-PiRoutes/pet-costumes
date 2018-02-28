const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cartItem', {


  lastAccessed: {
    type: Sequelize.DATE,
  }

})

module.exports = Cart
