import db from '../'
const OrderItem = db.model('orderItem')
import { expect } from 'chai'

describe('OrderItem model', () => {
  describe('properties', () => {
    it('should have a priceInCents', () => {
      expect(OrderItem.attributes.priceInCents).to.be.an('object')
      expect(OrderItem.attributes.priceInCents.allowNull).to.equal(false)
    })
    it('should have a quantity', () => {
      expect(OrderItem.attributes.quantity).to.be.an('object')
      expect(OrderItem.attributes.quantity.allowNull).to.equal(false)
    })
  })
})
