const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderStatus: {
    type: Sequelize.ENUM,
    values: ['created', 'processing', 'cancelled', 'completed']
  },
  shipDate: {
    type: Sequelize.DATE
  },
  deliveryDate: {
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
    type: Sequelize.STRING(2), // eslint-disable-line
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  defaultScope: {
    order: Sequelize.literal('"createdAt" DESC')
  }
})

module.exports = Order
