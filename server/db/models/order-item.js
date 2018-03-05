const Sequelize = require('sequelize')
const db = require('../db')

const OrderItem = db.define('orderItem', {
  priceInCents: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = OrderItem
