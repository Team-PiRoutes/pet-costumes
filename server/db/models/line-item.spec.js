import db from '../'
const LineItem = db.model('lineItem')
import { expect } from 'chai'

describe('LineItem model', () => {
  describe('properties', () => {
    it('should have a productId', () => {
      expect(LineItem.attributes.productId).to.be.an('object')
      expect(LineItem.attributes.productId.allowNull).to.equal(false)
    })
    it('should have an orderId', () => {
      expect(LineItem.attributes.orderId).to.be.an('object')
      expect(LineItem.attributes.orderId.allowNull).to.equal(false)
    })
    it('should have a priceInCents', () => {
      expect(LineItem.attributes.priceInCents).to.be.an('object')
      expect(LineItem.attributes.priceInCents.allowNull).to.equal(false)
    })
    it('should have a quantity', () => {
      expect(LineItem.attributes.quantity).to.be.an('object')
      expect(LineItem.attributes.quantity.allowNull).to.equal(false)
    })
  })
})
