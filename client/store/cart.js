import axios from 'axios'

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
const addToCart = (item) => ({ type: ADD_ITEM, item })

const updateCartQuantity = (update) => ({ type: CHANGE_QTY, update })

/**
 * THUNK CREATORS
 */
export const addProductToCart = (itemForCart) => {
  //Cart persisting in these brackets here most likely
  const { priceInCents, quantity, productId } = itemForCart
  const cartItem = { priceInCents, quantity, productId }
  return dispatch =>
    dispatch(addToCart(cartItem))
}

export const updateCurrentQuanity = (update) => {
  //Cart persisting in these brackets here most likely

  return dispatch =>
    dispatch(updateCartQuantity(update))

}

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {

  switch (action.type) {
    case ADD_ITEM: {

      return [...state, action.item]
    }
    case CHANGE_QTY: {
      let indexInCart = state.findIndex(item => item.id === action.productID)
      let updatedProduct = Object.assign(
        {},
        state[indexInCart],
        { quantity: action.update.quantity }
      ) //end object.assign


      return [...state.slice(0, indexInCart),
        updatedProduct,
      ...state.slice(indexInCart + 1)]
    }
    default:
      return state
  }
}
