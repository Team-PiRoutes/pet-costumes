const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

//get all categories
router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})
