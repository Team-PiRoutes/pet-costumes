const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {

  priceInCents: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  ordered: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  expired: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = CartItem
