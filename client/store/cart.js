import axios from 'axios'
/**
 * ACTION TYPES
 */

const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const GOT_PREVIOUS_CART = 'GOT_PREVIOUS_CART'
const GOT_USER_CART = 'GOT_USER_CART'
const EMPTY_CART = 'EMPTY_CART'
const DELETE_ITEM_FROM_CART = 'DELETE_ITEM_FROM_CART'

/**
 * INITIAL STATE
 */

const defaultCart = []

/**
 * ACTION CREATORS
 */
const updateItem = (cartItem) => ({ type: UPDATE_CART_ITEM, cartItem })

const gotCart = cart => ({ type: GOT_PREVIOUS_CART, cart })

const emptyCart = () => ({ type: EMPTY_CART })
const deleteItem = (cartItem) => ({ type: DELETE_ITEM_FROM_CART, cartItem })
/**
 * THUNK CREATORS
 */


//UPDATE QUANTITY
export const updateCartItem = (itemForCart) => dispatch => {

  axios.put('/api/cart', { itemForCart })
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

    let cartInfo = getCartLocals()
    const res = await axios.post('/api/cart/addToCart', { itemForCart, cartInfo })
    const cartUpdate = res.data

    localStorage.setItem('cartId', '' + cartUpdate.cartId)
    localStorage.setItem('cartToken', '' + cartUpdate.cartToken)
    const updatedItem = cartUpdate.cartItem


    dispatch(updateItem(updatedItem))
  } catch (err) {
    console.error(err)
  }

}
export const deleteItemFromCart = (itemId) => async dispatch => {
  try {
    dispatch(deleteItem(itemId))
    const res = await axios.delete(`/api/cart/${itemId}`)

  } catch (err) {
    console.error(err)
  }

}

export function fetchCart() {

  return async dispatch => {
    try {


      const browserCartInfo = getCartLocals()
      if (browserCartInfo.cartId !== null && browserCartInfo.cartToken !== null) {
        let resOldCart = await axios
          .get(`/api/cart/${browserCartInfo.cartId}/${browserCartInfo.cartToken}`,
            browserCartInfo)

        if (resOldCart.status === 200) {

          const cart = resOldCart.data
          dispatch(gotCart(cart.cartItems))
          setCartLocals(cart.cartId, cart.cartToken)
        }
        else if (resOldCart.status === 204) {
          setCartLocals(null, null)
        }

      }
    } catch (err) {
      console.error(err)
    }

  }
}

export function fetchUserCartOnLogin(user) {
  return async dispatch => {
    try {
      console.log('user recieved by thunk', user)
      //  sending user object OR we can send the id and the cart
      // token from the user modell (not yet implemented)
      let cartInfo = getCartLocals()
      let userCart = await axios.put('/api/cart/userCart', { cartInfo, user })
        .then(res => res.data)
        .catch(console.error)

      setCartLocals(userCart.cartId, userCart.cartToken)
      dispatch(gotCart(userCart.cartItems))
    } catch (err) { console.error(err) }
  }
}


export function logOutOfCart() {
  return dispatch => {
    setCartLocals(null, null)
    dispatch(emptyCart())
  }
}

/**
 * REDUCER
 */
export default function (state = defaultCart, action) {


  switch (action.type) {

    case UPDATE_CART_ITEM: {

      let indexInCart = state.findIndex(item => {
        return item.productId === action.productId
      })

      if (indexInCart < 0) return [...state, action.cartItem]

      let updatedProduct = Object.assign(
        {},
        state[indexInCart],
        { quantity: action.cartItem.quantity }
      ) //end object.assign

      let newState = [...state]
      newState[indexInCart] = updatedProduct
      return newState
    }
    case GOT_PREVIOUS_CART:
      return [...action.cart]

    case GOT_USER_CART:
      return [...state, ...action.cart]
    case EMPTY_CART:
      return []
    case DELETE_ITEM_FROM_CART: {
      let indexInCart = state.findIndex(item => {
        return item.productId === action.productId
      })

      if (indexInCart < 0) return [...state]

      let newState = [...state.slice(0, indexInCart),
      ...state.slice(indexInCart + 1)]

      return newState
    }
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

export function setCartLocals(cartId, cartToken) {
  if (!cartId || !cartToken) {
    localStorage.removeItem('cartId')
    localStorage.removeItem('cartToken')
  } else {
    localStorage.setItem('cartId', cartId)
    localStorage.setItem('cartToken', cartToken)
  }
}
