const router = require('express').Router()
const { Product } = require('../db/models')
const { Review } = require('../db/models')
module.exports = router

//get all products
router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => res.json(products))
    .catch(next)
})

//get product by id
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, { include: [ Review ] })
    .then(product => res.json(product))
    .catch(next)
})

//add product (by admin)
router.post('/admin/new', (req, res, next) => {
  Product.create(req.body)
  .then((newProduct) => res.json(newProduct))
  .catch(next)
})

//add product review (by user)
router.post('/:id/reviews', (req, res, next) => {
  Review.create(req.body)
  .then((newReview) => res.json(newReview))
  .catch(next)
})

