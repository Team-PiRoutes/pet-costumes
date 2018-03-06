/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Order = db.model('order')
const User = db.model('user')

describe('Order routes', () => {
  let userid

  beforeEach(() => {
    return db.sync({ force: true })
      .then(() => {
        return User.create({
          email: 'cody@puppybook.com',
          password: '123'
        })
        .then(user => {
          userid = user.id
        })
      })
      .then(() => {
        return Order.create({
          customerId: userid,
          email: 'cody@puppybook.com',
          addressLine1: 'my street',
          addressLine2: '',
          city: 'my city',
          state: 'NY',
          zip: '11111',
          orderStatus: 'created'
        })
      })
  })

  describe('/api/orders', () => {

    it('Get /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          let orders = res.body
          expect(orders).to.be.an('array')
          expect(orders[0].email).to.be.equal('cody@puppybook.com')
          expect(orders[0].city).to.be.equal('my city')
          expect(orders[0].state).to.be.equal('NY')

        })
      }) //end it(Get /admin/list-orders',)
  }) // end describe('/api/admin/listOrders')
}) // end describe('Order routes')
