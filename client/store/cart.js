
/**
 * ACTION TYPES
 */
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'

/**
 * INITIAL STATE
 */

const defaultCart = []

/**
 * ACTION CREATORS
 */


const updateItem = (cartItem) => ({ type: UPDATE_CART_ITEM, cartItem })

/**
 * THUNK CREATORS
 */
export const updateCartItem = (itemForCart) => {
  //expects object passed in to have at least the  below keys
  const { priceInCents, quantity, productId, photoUrl
  } = itemForCart
  const cartItem = {
    priceInCents, quantity, productId, photoUrl
  }
  return dispatch =>
    dispatch(updateItem(cartItem))
}


/**
 * REDUCER
 */
export default function (state = defaultCart, action) {

  switch (action.type) {
    case UPDATE_CART_ITEM: {
      let indexInCart = state.findIndex(item => item.id === action.productId)
      if (indexInCart < 0) return [...state, action.update]
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
