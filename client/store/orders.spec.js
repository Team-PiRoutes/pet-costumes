import reducer, { gotOrders, fetchOrders, fetchOrdersByCustomerId, postOrder } from './orders'
import { expect } from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

const fakeOrders = [
  {
    userId: 1,
    email: 'billy-loves-dogs@puppybook.com',
    orderStatus: 'created',
    addressLine1: '123 Puppy Rd',
    city: 'Dogville',
    state: 'IL',
    zip: '12345'
  },
  {
    userId: 2,
    email: 'kathy-loves-cats@puppybook.com',
    orderStatus: 'created',
    addressLine1: '123 Kitty Rd',
    city: 'Meowville',
    state: 'IL',
    zip: '54321'
  },
  { email: 'kathy-loves-cats@puppybook.com',
    addressLine1: 'my address',
    addressLine2: '',
    city: 'Chicago',
    state: 'IL',
    zip: '60626',
    cart: [{
      id: 4,
      quantity: 1,
      priceInCents: 1999,
      productId: 3
    },
    {
      id: 5,
      quantity: 1,
      priceInCents: 1999,
      productId: 2
    },
    {
      id: 6,
      quantity: 1,
      priceInCents: 1399,
      productId: 4
    }]
  }
]

describe('Orders Store', () => {
  describe('action creators', () => {
    describe('gotOrders', () => {
      let orders = []

      beforeEach(() => {
        orders = fakeOrders
      })

      it('should create an action with correct id', () => {
        const action = gotOrders(orders)
        expect(action.type).to.be.equal('GOT_ORDERS')
        expect(action.orders[0].zip).to.be.equal('12345')
      })
    })
  })

  describe('reducer', () => {
    let state = []

    beforeEach(() => {
      state = []
    })

    it('should replace the state with new array of orders ', () => {
      const newState = reducer(state, {
        type: 'GOT_ORDERS',
        orders: fakeOrders
      })
      expect(newState).to.be.deep.equal(fakeOrders)
    })
  })

  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = fakeOrders

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('fetchOrders', () => {
      it('fetches orders from the db', () => {
        mockAxios.onGet('/api/orders').replyOnce(200, fakeOrders)
        return store.dispatch(fetchOrders())
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GOT_ORDERS')
            expect(actions[0].orders).to.be.deep.equal(fakeOrders)
          })
      })
    })

    describe('fetchOrdersByCustomerId', () => {
      it('fetches orders from the db matching a user id', () => {
        mockAxios.onGet('/api/orders/?customerid=1').replyOnce(200, fakeOrders.slice(0, 1))
        return store.dispatch(fetchOrdersByCustomerId(1))
          .then(() => {
            const actions = store.getActions()
            expect(actions[0].type).to.be.equal('GOT_ORDERS')
            expect(actions[0].orders).to.be.deep.equal(fakeOrders.slice(0, 1))
          })
      })
    })

    describe('postOrder', () => {
      it('posts a new order to the database', () => {
        mockAxios.onPost('/api/orders/').replyOnce(200, fakeOrders[2])
        return store.dispatch(postOrder(fakeOrders[2]))
          .then(() => {
            const actions = store.getActions()
            console.log('ACTIONS: ', actions)
            expect(actions[0].type).to.be.equal('ADD_ORDER')
            expect(actions[0].orders).to.be.deep.equal(fakeOrders[2])
          })
      })
    })
  })
})
