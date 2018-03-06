import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import products from './products'
import cart from './cart'
import activeCategories from './active-categories'
import categories from './categories'
import activeSizes from './active-sizes'
import reviews from './reviews'
import searchTerm from './search-term'
import orderStatus from './order-status'
import orders from './orders'

const reducer = combineReducers({
  user,
  products,
  cart,
  activeCategories,
  categories,
  activeSizes,
  searchTerm,
  reviews,
  orderStatus,
  orders
})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({ collapsed: true })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './cart'
export * from './active-categories'
export * from './categories'
export * from './active-sizes'
export * from './reviews'
export * from './search-term'
export * from './order-status'
export * from './orders'
