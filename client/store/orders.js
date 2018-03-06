import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'
const ADD_ORDER = 'ADD_ORDER'

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

export const addOrder = order => ({
  type: ADD_ORDER,
  order
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

export const postOrder = (order) =>
  dispatch =>
    axios.post('/api/orders', order)
      .then(res => res.data)
      .then(newOrder => {
        dispatch(addOrder(newOrder))
      })
      .catch(err => console.error('posting new order', err))

/**
 * REDUCER
 */
export default function (state = defaultOrders, action){
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order]
    case GOT_ORDERS:
      return action.orders
    default: return state
  }
}
