import { expect } from 'chai'
const db = require('../db')
const Category = db.model('category')
const app = require('../index')
const request = require('supertest')

describe('Category routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/categories/', () => {
    const categories = [
      { label: 'superhero' },
      { label: 'dog' }
    ]

    beforeEach(() => {
      return Category.bulkCreate(categories)
    })

    it('GET /api/categories', () => {
      return request(app)
        .get('/api/categories')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].label).to.be.equal('superhero')
          expect(res.body[1].label).to.be.equal('dog')
          expect(res.body[2]).to.be.equal(undefined)
        })
    })
  })
})
