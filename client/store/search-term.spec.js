import reducer, { changeSearchTerm } from './search-term'
import { expect } from 'chai'

describe('SearchTerm Store', () => {
  describe('action creators', () => {
    describe('changeSearchTerm', () => {
      it('should create an action creator of the correct type', () => {
        const action = changeSearchTerm('pirate')
        expect(action.type).to.be.equal('CHANGE_SEARCH_TERM')
        expect(action.term).to.be.equal('pirate')
      })
    })
  })

  describe('reducer', () => {
    it('should change the term to the new term', () => {
      const newState = reducer('', {
        type: 'CHANGE_SEARCH_TERM',
        term: 'hotdog'
      })
      expect(newState).to.be.equal('hotdog')
    })
  })
})
