import reducer, { addActiveCategory, removeActiveCategory, clearActiveCategories } from './active-categories'
import { expect } from 'chai'

describe('ActiveCategories Store', () => {
  describe('action creators', () => {
    describe('addActiveCategory', () => {
      let category = {}

      beforeEach(() => {
        category = { id: 99 }
      })

      it('should create an action with correct id', () => {
        const action = addActiveCategory(category)
        expect(action.type).to.be.equal('ADD_ACTIVE_CATEGORY')
        expect(action.categoryId).to.be.equal(99)
      })
    })

    describe('removeActiveCategory', () => {
      let category = {}

      beforeEach(() => {
        category = { id: 99 }
      })

      it('should create an action with correct id', () => {
        const action = removeActiveCategory(category)
        expect(action.type).to.be.equal('REMOVE_ACTIVE_CATEGORY')
        expect(action.categoryId).to.be.equal(99)
      })
    })

    describe('clearActiveCategories', () => {
      it('should create an action of correct type', () => {
        const action = clearActiveCategories()
        expect(action.type).to.be.equal('CLEAR_ACTIVE_CATEGORIES')
      })
    })
  })

  describe('reducer', () => {
    let state = []

    beforeEach(() => {
      state = [99]
    })

    it('should add an id to the list of categories', () => {
      const newState = reducer(state, {
        type: 'ADD_ACTIVE_CATEGORY',
        categoryId: 1
      })
      expect(newState).to.be.deep.equal([99, 1])
    })
    it('should remove an id from the list of categories', () => {
      const newState = reducer(state, {
        type: 'REMOVE_ACTIVE_CATEGORY',
        categoryId: 99
      })
      expect(newState).to.be.deep.equal([])
    })

    it('should clear the list of categories', () => {
      const newState = reducer(state, {
        type: 'CLEAR_ACTIVE_CATEGORIES'
      })
      expect(newState).to.be.deep.equal([])
    })
  })
})
