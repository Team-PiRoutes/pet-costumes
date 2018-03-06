import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

/**
 * THUNK CREATORS
 */
export const fetchOrders = () =>
  dispatch =>
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        dispatch(gotOrders(orders))
      })
      .catch(err => console.error('fetching orders went wrong', err))

export const fetchOrdersByCustomerId = (customerid) =>
  dispatch =>
    axios.get(`/api/orders/?customerid=${customerid}`)
      .then(res => res.data)
      .then(orders => {
        dispatch(gotOrders(orders))
      })
      .catch(err => console.error('fetching orders went wrong', err))

/**
 * REDUCER
 */
export default function (state = defaultOrders, action){
  switch (action.type) {
    case GOT_ORDERS:
      return action.orders
    default: return state
  }
}
