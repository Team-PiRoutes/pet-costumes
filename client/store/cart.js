import axios from 'axios'
/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const GOT_PREVIOUS_CART = 'GOT_PREVIOUS_CART'
const GOT_USER_CART = 'GOT_USER_CART'


/**
 * INITIAL STATE
 */

const defaultCart = []

/**
 * ACTION CREATORS
 */
const updateItem = (cartItem) => ({ type: UPDATE_CART_ITEM, cartItem })
const addItem = (cartItem) => ({ type: UPDATE_CART_ITEM, cartItem })

const gotCart = cart => ({ type: GOT_PREVIOUS_CART, cart })

const gotUserCart = cart => ({ type: GOT_USER_CART, cart })

/**
 * THUNK CREATORS
 */


//UPDATE QUANTITY
export const updateCartItem = (itemForCart) => dispatch => {

  let cartInfo = getCartLocals()

  axios.put('/api/cart/update', { itemForCart, cartInfo })
    .then(res => res.data)
    .then(cartUpdate => {

      localStorage.setItem('cartId', '' + cartUpdate.cartId)
      localStorage.setItem('cartToken', '' + cartUpdate.cartToken)


      const updatedItem = cartUpdate.cartItem
      dispatch(updateItem(updatedItem))
    })
    .catch(err => console.error(err))
}

//ADD TO CART/CREATE CART
export const addItemToCart = (itemForCart) => async dispatch => {
  try {
    console.log('thunking it over')
    let cartInfo = getCartLocals()
    const res = await axios.post('/api/cart/addToCart', { itemForCart, cartInfo })
    const cartUpdate = res.data
    console.log('thunk it over and this is what I got', cartUpdate.cartItem)
    console.log('cart Id we thunked about', cartUpdate.cartId)
    localStorage.setItem('cartId', '' + cartUpdate.cartId)
    localStorage.setItem('cartToken', '' + cartUpdate.cartToken)
    const updatedItem = cartUpdate.cartItem


    dispatch(updateItem(updatedItem))
  } catch (err) {
    console.error(err)
  }

}

export function fetchCart() {

  return async dispatch => {
    try {
      const browserCartInfo = getCartLocals()
      if (browserCartInfo.cartId !== null && browserCartInfo.cartToken !== null) {
        let resOldCart = await axios.get(`/api/cart/${browserCartInfo.cartId}/${browserCartInfo.cartToken}`, browserCartInfo)
        console.log('fetched cart from server', resOldCart.data)
        dispatch(gotCart(resOldCart.data))
      }
    } catch (err) {
      console.error(err)
    }

  }
}

export async function fetchUserCart(user) {
  //  sending user object OR we can send the id and the cart
  // token from the user modell (not yet implemented)
  let cartInfo = getCartLocals()
  let userCart = await axios.put('/cart/userCart', { cartInfo, user })
  // console.log(userCart.data)
}
/**
 * REDUCER
 */
export default function (state = defaultCart, action) {
  console.log('Reducer received action', action)

  switch (action.type) {

    case UPDATE_CART_ITEM: {

      let indexInCart = state.findIndex(item => item.id === action.productId)

      if (indexInCart < 0) return [...state, action.cartItem]
      console.log(action.cartItem)
      let updatedProduct = Object.assign(
        {},
        state[indexInCart],
        { quantity: action.cartItem.quantity }
      ) //end object.assign


      return [...state.slice(0, indexInCart),
        updatedProduct,
      ...state.slice(indexInCart + 1)]
    }
    case GOT_PREVIOUS_CART:
      return action.cart

    case GOT_USER_CART:
      return [...state, ...action.cart]

    default:
      return state
  }
}

function getCartLocals() {
  return {
    cartId: localStorage.getItem('cartId'),
    cartToken: localStorage.getItem('cartToken')
  }
}
