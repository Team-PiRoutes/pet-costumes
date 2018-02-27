import db from '../'
const Product = db.model('product')
import { expect } from 'chai'

describe('Product model', () => {
  describe('properties', () => {
    it('should have a title', () => {
      expect(Product.attributes.title).to.be.an('object')
      expect(Product.attributes.title.allowNull).to.equal(false)
      expect(Product.attributes.title.notEmpty).to.equal(true)
    })
    it('should have a description', () => {
      expect(Product.attributes.description).to.be.an('object')
      expect(Product.attributes.description.allowNull).to.equal(false)
      expect(Product.attributes.description.notEmpty).to.equal(true)
    })
    it('should have a priceInCents', () => {
      expect(Product.attributes.priceInCents).to.be.an('object')
      expect(Product.attributes.priceInCents.allowNull).to.equal(false)
    })
    it('should have a quantity', () => {
      expect(Product.attributes.quantity).to.be.an('object')
      expect(Product.attributes.quantity.allowNull).to.equal(false)
    })
    it('should have a photoUrl', () => {
      expect(Product.attributes.photoUrl).to.be.an('object')
      expect(Product.attributes.photoUrl.allowNull).to.equal(true)
    })
    it('should have a size', () => {
      expect(Product.attributes.size).to.be.an('object')
      expect(Product.attributes.size.allowNull).to.equal(true)
    })
  })
})
