import { expect } from 'chai'
const db = require('../db')
const Product = db.model('product')
const app = require('../index')
const request = require('supertest')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/products/', () => {
    const products = [
      { title: 'pirate', description: 'cutest pirate ever', priceInCents: 1599, quantity: 7 },
      { title: 'hotDog', description: 'yummy dog', priceInCents: 1299, quantity: 5 }
    ]

    beforeEach(() => {
      return Product.bulkCreate(products)
    })

    it('GET /api/products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].title).to.be.equal('pirate')
          expect(res.body[1].quantity).to.be.equal(5)
          expect(res.body[2]).to.be.equal(undefined)
        })
    })
  })
})
