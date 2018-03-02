import reducer, { addCategory, removeCategory, clearCategories } from './categories'
import { expect } from 'chai'

describe('Categories Store', () => {
  describe('action creators', () => {
    describe('addCategory', () => {
      let category = {}

      beforeEach(() => {
        category = { id: 99 }
      })

      it('should create an action with correct id', () => {
        const action = addCategory(category)
        expect(action.type).to.be.equal('ADD_CATEGORY')
        expect(action.categoryId).to.be.equal(99)
      })
    })

    describe('removeCategory', () => {
      let category = {}

      beforeEach(() => {
        category = { id: 99 }
      })

      it('should create an action with correct id', () => {
        const action = removeCategory(category)
        expect(action.type).to.be.equal('REMOVE_CATEGORY')
        expect(action.categoryId).to.be.equal(99)
      })
    })

    describe('clearCategories', () => {
      it('should create an action of correct type', () => {
        const action = clearCategories()
        expect(action.type).to.be.equal('CLEAR_CATEGORIES')
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
        type: 'ADD_CATEGORY',
        categoryId: 1
      })
      expect(newState).to.be.deep.equal([99, 1])
    })
    it('should remove an id from the list of categories', () => {
      const newState = reducer(state, {
        type: 'REMOVE_CATEGORY',
        categoryId: 99
      })
      expect(newState).to.be.deep.equal([])
    })

    it('should clear the list of categories', () => {
      const newState = reducer(state, {
        type: 'CLEAR_CATEGORIES'
      })
      expect(newState).to.be.deep.equal([])
    })
  })
})
