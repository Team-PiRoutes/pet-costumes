import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProducts = []

/**
 * ACTION CREATORS
 */
const getProducts = products => ({ type: GOT_PRODUCTS, products })
const addProduct = product => ({ type: ADD_PRODUCT, product })

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

export const postProduct = (product) =>
  dispatch =>
    axios.post('/api/products/admin/new', product)
      .then(res => res.data)
      .then(newProduct => {
        dispatch(addProduct(newProduct))
      })
      .catch(err => console.error('posting new product went wrong', err))


/**
 * REDUCER
 */
export default function (state = defaultProducts, action) {
  switch (action.type) {
    case GOT_PRODUCTS: return action.products
    case ADD_PRODUCT: return [... state, action.product]
    default: return state
  }
}
