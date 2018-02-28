const Sequelize = require('sequelize')
const db = require('../db')

const LineItem = db.define('lineItem', {

  priceInCents: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

module.exports = LineItem
