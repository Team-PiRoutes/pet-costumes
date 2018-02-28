import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GOT_PRODUCTS, products })

/**
 * THUNK CREATORS
 */
export const fetchProducts = () =>
  dispatch =>
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        dispatch(getProducts(products))
      })
      .catch(err => console.error('fetching products went wrong', err))

/**
 * REDUCER
 */
export default function (state = defaultProducts, action){
  switch (action.type) {
    case GOT_PRODUCTS: return action.products
    default: return state
  }
}
