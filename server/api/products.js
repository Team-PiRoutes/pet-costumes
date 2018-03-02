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

//add product (admin)
router.post('/admin/new', (req, res, next) => {
  Product.create(req.body)
  .then((newProduct) => res.json(newProduct))
  .catch(next)
})

