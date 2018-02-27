import db from '../'
const Order = db.model('order')
import { expect } from 'chai'

describe('Order model', () => {
  describe('properties', () => {
    it('should have a userId', () => {
      expect(Order.attributes.userId).to.be.an('object')
    })
    it('should have an email', () => {
      expect(Order.attributes.email).to.be.an('object')
      expect(Order.attributes.email.allowNull).to.equal(false)
    })
  })
})
