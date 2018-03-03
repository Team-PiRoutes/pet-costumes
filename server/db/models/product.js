const Sequelize = require('sequelize')
const db = require('../db')
const { sizes } = require('../../../sizes')

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true
  },
  priceInCents: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  photoUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: '/img/defaultDogCostume.jpg'
  },
  size: {
    type: Sequelize.ENUM(sizes), // eslint-disable-line
    allowNull: true
  }
}, {
  defaultScope: {
    order: Sequelize.literal('id ASC')
  },
  getterMethods: {
    priceInDollars() {
      if (!this.priceInCents) return 'free'
      else return `$${(this.priceInCents / 100)}`
    }
  }
})


module.exports = Product
