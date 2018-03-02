import reducer, { gotCategories, fetchCategories } from './categories'
import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Categories Store', () => {
  describe('action creators', () => {
    describe('gotCategories', () => {
      let categories = []

      beforeEach(() => {
        categories = [{ id: 1, name: 'pirate costume' }]
      })

      it('should create an action with correct id', () => {
        const action = gotCategories(categories)
        expect(action.type).to.be.equal('GOT_CATEGORIES')
        expect(action.categories).to.be.deep.equal([{ id: 1, name: 'pirate costume' }])
      })
    })
  })

  describe('reducer', () => {
    let state = []
    let categories = []

    beforeEach(() => {
      state = [{ id: 2, name: 'pirates' }]
      categories = [{ id: 1, name: 'superheros' }]
    })

    it('should get replace the state with new array of categories ', () => {
      const newState = reducer(state, {
        type: 'GOT_CATEGORIES',
        categories
      })
      expect(newState).to.be.deep.equal([{ id: 1, name: 'superheros' }])
    })
  })

  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = { categories: [] }

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('fetchCategories', () => {
      it('fetches categories from the db', () => {
        const fakeCategories = [{ name: 'pirate', id: 2 }]
        mockAxios.onGet('/api/categories').replyOnce(200, fakeCategories)
        return store.dispatch(fetchCategories())
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GOT_CATEGORIES')
            expect(actions[0].categories).to.be.deep.equal(fakeCategories)
          })
      })
    })
  })
})
