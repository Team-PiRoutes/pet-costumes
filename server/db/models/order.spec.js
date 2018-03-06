import db from '../'
const Order = db.model('order')
import { expect } from 'chai'

describe('Order model', () => {
  describe('properties', () => {
    it('should have a customerId', () => {
      expect(Order.attributes.customerId).to.be.an('object')
    })
    it('should have an email', () => {
      expect(Order.attributes.email).to.be.an('object')
    })
  })
})
