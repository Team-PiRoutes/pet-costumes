

const User = require('./user')
const Order = require('./order')
const Product = require('./product')
const LineItem = require('./line-item')
const Category = require('./category')
const Review = require('./review')
const Cart = require('./cart')
const CartItem = require('./cart-item')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/*
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// Cart.belongsToMany(Product, { through: CartItem })
// Product.belongsToMany(Cart, { through: CartItem })
Cart.hasMany(CartItem)
Product.hasMany(CartItem)
User.belongsTo(Cart)

Category.belongsToMany(Product, { through: 'ProductCategory' })
Product.belongsToMany(Category, { through: 'ProductCategory' })

Product.belongsToMany(Order, { through: 'LineItem' })
Order.belongsToMany(Product, { through: 'LineItem' })
Review.belongsTo(User, { as: 'customer' })
Product.hasMany(Review)


module.exports = {
  User,
  Order,
  Product,
  LineItem,
  Review,
  Category,
  Cart,
  CartItem
}

