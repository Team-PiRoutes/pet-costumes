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
const cartInfo = {
  cartId: localStorage.getItem('cartId'),
  tokenId: localStorage.getItem('tokenId')
}
export const updateCartItem = (itemForCart) => {
  console.log('thunked about it')
  //expects object passed in to have at least the  below keys
  // const { priceInCents, quantity, productId } = itemForCart
  // const cartItem = { priceInCents, quantity, productId }
  let route = (cartInfo.cartId !== null &&
    cartInfo.tokenId !== null ?
    '/api/cart/update' : '/api/cart/newCart')

  axios.put(route, { itemForCart, cartInfo })
    .then(res => res.data)
    .then(cartUpdate => {
      console.log('thunked about it and the server has thunked about', cartUpdate)
      localStorage.setItem('cartId', '' + cartUpdate.cartId)
      localStorage.setItem('tokenId', '' + cartUpdate.tokenId)


      const updatedItem = cartUpdate.cartItem

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
