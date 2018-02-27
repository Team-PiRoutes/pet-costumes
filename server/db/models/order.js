const Sequelize = require('sequelize')
const db = require('../db')

//should we add order status?

//should address be a separate module?
//addressLine1
//addressLine2
//city
//state
//zipcode

const Order = db.define('order', {
  userId: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Order
