import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'
<<<<<<< HEAD
const ADD_ORDER = 'ADD_ORDER'
=======
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS'
const ORDER_SHIPPED = 'ORDER_SHIPPED'
>>>>>>> master

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

<<<<<<< HEAD
export const addOrder = order => ({
  type: ADD_ORDER,
=======
const changeOrderStatus = order => ({
  type: CHANGE_ORDER_STATUS,
>>>>>>> master
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

export const updateOrderStatus = (id, newStatus) =>
  dispatch => {
    return axios.put(`/api/orders/${id}/`, { orderStatus: newStatus })
      .then(res => res.data)
      .then(order => {
        dispatch(changeOrderStatus(order))
        history.push('/admin/orders/')
      })
      .catch(err => console.error('updating order status went wrong', err))

  }

/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case ADD_ORDER:
      return [...state, action.order]
    case GOT_ORDERS:
      return action.orders
    case CHANGE_ORDER_STATUS: {
      return state.map(order => (
        action.order.id === order.id ? action.order : order))
    }
    default: return state
  }
}
