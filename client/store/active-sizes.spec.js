import reducer, {
  addActiveSize,
  removeActiveSize,
  clearActiveSizes
} from './active-sizes'
import { expect } from 'chai'

describe('ActiveSizes Store', () => {
  describe('action creators', () => {
    describe('addActiveSize', () => {
      it('should create an action with correct type and size', () => {
        const action = addActiveSize('M')
        expect(action.type).to.be.equal('ADD_ACTIVE_SIZE')
        expect(action.size).to.be.equal('M')
      })
    })

    describe('removeActiveSize', () => {
      it('should create an action with correct type and size', () => {
        const action = removeActiveSize('L')
        expect(action.type).to.be.equal('REMOVE_ACTIVE_SIZE')
        expect(action.size).to.be.equal('L')
      })
    })

    describe('clearActiveSizes', () => {
      it('should create an action of correct type', () => {
        const action = clearActiveSizes()
        expect(action.type).to.be.equal('CLEAR_ACTIVE_SIZES')
      })
    })
  })

  describe('reducer', () => {
    let state = []

    beforeEach(() => {
      state = ['L', 'XL'].sort()
    })

    it('should add a size to the list of sizes', () => {
      const newState = reducer(state, {
        type: 'ADD_ACTIVE_SIZE',
        size: 'M'
      })
      expect(newState).to.be.deep.equal(['L', 'M', 'XL'])
    })
    it('should not add a size that is already on the list', () => {
      const newState = reducer(state, {
        type: 'ADD_ACTIVE_SIZE',
        size: 'L'
      })
      expect(newState).to.be.deep.equal(['L', 'XL'])
    })
    it('should remove a size that is already on the list', () => {
      const newState = reducer(state, {
        type: 'REMOVE_ACTIVE_SIZE',
        size: 'L'
      })
      expect(newState).to.be.deep.equal(['XL'])
    })
    it('should not change a list when size is not there to remove', () => {
      const newState = reducer(state, {
        type: 'REMOVE_ACTIVE_SIZE',
        size: 'M'
      })
      expect(newState).to.be.deep.equal(['L', 'XL'])
    })

    it('should clear the list of sizes', () => {
      const newState = reducer(state, {
        type: 'CLEAR_ACTIVE_SIZES'
      })
      expect(newState).to.be.deep.equal([])
    })
  })
})
