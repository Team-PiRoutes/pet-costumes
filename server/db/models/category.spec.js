import db from '../'
const Category = db.model('category')
import { expect } from 'chai'


describe('Category model', () => {
  describe('properties', () => {
    it('should have a label', () => {
      expect(Category.attributes.label).to.be.an('object')
      expect(Category.attributes.label.allowNull).to.equal(false)
      expect(Category.attributes.label.unique).to.equal(true)
    })
  })
})
