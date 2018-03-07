
const router = require('express').Router()
const { Order, OrderItem, CartItem } = require('../db/models')


router.get('/', (req, res, next) => {
  const userQuery = req.query.customerid ? { customerId: req.query.customerid } : {}

  Order.findAll({
    where: userQuery,
    include: [
      { model: OrderItem }
    ]
  })
    .then((orders) => res.json(orders))
    .catch(next)
})

router.post('/', async (req, res, next) => {
  let order = {
    customerId: req.body.customerId,
    email: req.body.email,
    addressLine1: req.body.addressLine1,
    addressLine2: req.body.addressLine2,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zip,
    oderStatus: 'created'
  }

  let newOrder = await Order.create(order)
  const cartItems = await CartItem.findAll({
    where: {
      cartId: req.body.cartId,
      ordered: false,
      expired: false
    }
  })

  const orderItems = cartItems.map(cartItem => {
    return {
      orderId: newOrder.id,
      priceInCents: cartItem.priceInCents,
      quantity: cartItem.quantity,
      productId: cartItem.productId
    }
  })

  await OrderItem.bulkCreate(orderItems)
  newOrder = await Order.findById(newOrder.id, {
    include: [
      { model: OrderItem }
    ]
  })

  await CartItem.update(
    { ordered: true },
    { where: { cartId: req.body.cartId } }
  )

  res.status(201).json(newOrder)
})

module.exports = router
