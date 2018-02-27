import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'

/**
 * INITIAL STATE
 */


/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GOT_PRODUCTS, products })

/**
 * THUNK CREATORS
 */
export const products = () =>
  dispatch =>
    axios.get('/products')
      .then(res => res.data)
      .then(allProducts => {
        dispatch(getProducts(allProducts))
      })

/**
 * REDUCER
 */
export default function (state = [], action){
  switch (action.type) {
    case GOT_PRODUCTS: return action.products
    default: return state
  }
}
