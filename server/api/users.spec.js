/* global describe beforeEach it */

const { expect } = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true })
      .then(fin => fin)
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      }).then(user => user)
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/users')

  describe('/api/users/:id', () => {
    let user = {}

    beforeEach('create some users', (done) => {
      Promise.all([
        User.create({ email: 'cody@email.com', password: '123', isAdmin: true }),
        User.create({ email: 'murphy@email.com', password: '123' }),
      ])
        .then(users => {
          user = users[0]
          done()
        })
    })

    it('GET /api/users/:id', () => {
      return request(app)
        .get(`/api/users/${user.id}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.email).to.be.equal('cody@email.com')
        })
    })

    describe('can set boolean to encourage user to reset password', () => {
      it('PUT /api/users/:id/', () => {
        return request(app)
          .put(`/api/users/${user.id}/`)
          .send({ shouldResetPassword: true })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.shouldResetPassword).to.be.equal(true)
          })
      })
    })

    describe('can promote a user to an admin', () => {
      it('PUT /api/users/:id/', () => {
        return request(app)
          .put(`/api/users/${user.id}/`)
          .send({ isAdmin: true })
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object')
            expect(res.body.isAdmin).to.be.equal(true)
          })
      })
    })
  })

}) // end describe('User routes')
