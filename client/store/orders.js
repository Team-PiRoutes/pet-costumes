import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS'

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

const changeOrderStatus = order => ({
  type: CHANGE_ORDER_STATUS,
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
    case GOT_ORDERS:
      return action.orders
    case CHANGE_ORDER_STATUS: {
      return state.map(order => (
        action.order.id === order.id ? action.order : order))
    }
    default: return state
  }
}
