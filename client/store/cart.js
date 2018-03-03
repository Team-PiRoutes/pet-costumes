import axios from 'axios'
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
  // const { priceInCents, quantity, productId } = itemForCart
  // const cartItem = { priceInCents, quantity, productId }
  let route = (!!document.cookie && document.cookie.cartId && document.cookie.cartToken) ?
    '/api/cart/update' : '/api/cart/newCart'
  axios.put(route, { itemForCart, cookie: document.cookie })
    .then(res => res.data)
    .then(updatedItem => {
      console.log('updated item from database', updatedItem)
      return dispatch =>
        dispatch(updateItem(updatedItem))
    })
    .catch(err => console.error(err))
}
//else update


/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  console.log('Reducer received action', action)

  switch (action.type) {

    case UPDATE_CART_ITEM: {
      let indexInCart = state.findIndex(item => item.id === action.productId)
      if (indexInCart < 0) return [...state, action.cartItem]
      let updatedProduct = Object.assign(
        {},
        state[indexInCart],
        { quantity: action.cartItem.quantity }

      ) //end object.assign


      return [...state.slice(0, indexInCart),
        updatedProduct,
      ...state.slice(indexInCart + 1)]
    }
    default:
      return state
  }
}
