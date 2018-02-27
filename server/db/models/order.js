const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.STRING
  },
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'cancelled', 'completed']
  },
  isShipped: {
    type: Sequelize.DATE
  },
  isDelivered: {
    type: Sequelize.DATE
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  addressLine1: {
    type: Sequelize.STRING,
    allowNull: false
  },
  addressLine2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING(2),
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
