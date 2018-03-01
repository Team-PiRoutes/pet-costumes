// import { expect } from 'chai'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import { updateCartItem } from './cart'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = { cart: [] }

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('STORE cart', () => {
//     it('eventually dispatches the UPDATE_CART_ITEM action', () => {
//       const fakeProduct = [{ id: 3, title: 'pirate', description: 'cutest pirate ever', priceInCents: 1599, quantity: 7 }]
//       const fakeCart = [ //priceInCents, quantity, productId
//         {
//           id: 99,
//           priceInCents: 1599,
//           quantity: 2
//         }]
//       mockAxios.onGet('/api/cart/:id').replyOnce(200, fakeCart)
//       return store.dispatch(updateCartItem(fakeProduct))
//         .then(() => {
//           const actions = store.getActions()
//           expect(actions[0].type).to.be.equal('UPDATE_CART_ITEM')
//           expect(actions[0].products).to.be.deep.equal(fakeCart)
//         })
//     })
//   })
// })
