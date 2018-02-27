import db from '../'
const Review = db.model('review')
import { expect } from 'chai'

describe('Review model', () => {
  describe('properties', () => {
    it('should have a rating', () => {
      expect(Review.attributes.rating).to.be.an('object')
      expect(Review.attributes.rating.allowNull).to.equal(false)
    })
    it('should have an message', () => {
      expect(Review.attributes.message).to.be.an('object')
      expect(Review.attributes.message.allowNull).to.equal(true)
    })
  })
})
