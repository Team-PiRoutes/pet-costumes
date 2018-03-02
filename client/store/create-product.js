/**
 * ACTION TYPES
 */
const CREATE_PRODUCT = 'CREATE_PRODUCT'

/**
 * INITIAL STATE
 */
const defaultProduct = ''

/**
 * ACTION CREATORS
 */
export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  }
}

/**
 * REDUCER
 */
export default function (state = defaultProduct, action) {
  switch (action.type) {
    case CREATE_PRODUCT: return action.product
    default: return state
  }
}
