import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_ITEM = 'ADD_ITEM'
const CHANGE_QTY = 'CHANGE_QTY'

/**
 * INITIAL STATE
 */

const defaultCart = []

/**
 * ACTION CREATORS
 */
const addToCart = (product, quantity) =>
  ({ type: ADD_ITEM, product, quantity })

const updateCartQuantity = (productID, quantity) =>
  ({ type: CHANGE_QTY, productID, quantity })

/**
 * THUNK CREATORS
 */
export const addProductToCart = (product, quantity) => {
  //for ASYNC behavior when we persist.
  return dispatch =>
    dispatch(addToCart(product, quantity))
}

export const updateCurrentQuanity = (product, quantity) => {
  //for ASYNC behavior when we persist.
  return dispatch =>
    dispatch(updateCartQuantity(product, quantity))

}

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {

  switch (action.type) {
    case ADD_ITEM: {
      let newProduct = action.product
      newProduct.quantity = action.quantity //changes quantity in stock to amount in cart

      return [...state, newProduct]
    }
    case CHANGE_QTY: {
      let indexInCart = state.findIndex(product => product.id === action.productID)
      let updatedProduct = Object.assign(
        {},
        state[indexInCart],
        { quantity: action.quantity }
      ) //end object.assign


      return [...state.slice(0, indexInCart),
        updatedProduct,
      ...state.slice(indexInCart + 1)]
    }
    default:
      return state
  }
}
