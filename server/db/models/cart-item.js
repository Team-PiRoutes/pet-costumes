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
}
  , {
    /* this causes a soft delete when we .destroy
    the 'deleteAt' collumn will get a date and time of deletion
    to really destroy the record user.destroy({force:true}) */
    paranoid: true
  })

module.exports = CartItem
