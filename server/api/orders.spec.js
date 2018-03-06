/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')

describe('Order routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('/api/orders', () => {
    const codyOrder = {
      email: 'cody@puppybook.com',
      addressLine1: '123 Puppy Rd',
      city: 'Dogville',
      state: 'IL',
      zip: '12345'
    }

    beforeEach(() => {
      return Order.create({
        email: 'cody@puppybook.com',
        addressLine1: '123 Puppy Rd',
        city: 'Dogville',
        state: 'IL',
        zip: '12345'
      })
    })

    it(`Get /api/orders
    return 'id', 'email', 'city', 'state' `, () => {
        return request(app)
          .get('/api/orders')
          .expect(200)
          .then(res => {
            let orders = res.body
            expect(orders).to.be.an('array')
            expect(orders[0].email).to.be.equal(codyOrder.email)
            expect(orders[0].city).to.be.equal(codyOrder.city)
            expect(orders[0].state).to.be.equal(codyOrder.state)

          })
      }) //end it(Get /admin/list-orders',)
  }) // end describe('/api/admin/listOrders')
}) // end describe('Order routes')
