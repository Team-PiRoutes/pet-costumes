import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import { fetchProducts } from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('products', () => {
    it('eventually dispatches the GOT PRODUCTS action', () => {
      const fakeProduct = [{ title: 'pirate', description: 'cutest pirate ever', priceInCents: 1599, quantity: 7 }]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct)
      return store.dispatch(fetchProducts())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GOT_PRODUCTS')
          expect(actions[0].products).to.be.deep.equal(fakeProduct)
        })
    })
  })
})
