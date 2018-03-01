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
