const router = require('express').Router()
const { Product, Review, Category, ProductCategory } = require('../db/models')
module.exports = router

//get all products
router.get('/', (req, res, next) => {
  Product.findAll({
    include: [
      { model: Review },
      { model: Category, through: ProductCategory}
    ]
  })
    .then(products => res.json(products))
    .catch(next)
})

//get product by id
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, {
      include: [
        { model: Review },
        { model: Category, through: ProductCategory}
      ]
    })
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

