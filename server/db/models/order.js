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
    type: Sequelize.STRING
  },
  addressLine1: {
    type: Sequelize.STRING
  },
  addressLine2: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING(2) // eslint-disable-line
  },
  zip: {
    type: Sequelize.STRING
  }
}, {
  defaultScope: {
    order: Sequelize.literal('"createdAt" DESC')
  }
})

module.exports = Order
