import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS'
const CONFIRM_ORDER_SHIPPED = 'CONFIRM_ORDER_SHIPPED'
const CONFIRM_ORDER_DELIVERED = 'CONFIRM_ORDER_DELIVERED'

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

const confirmOrderShipped = order => ({
  type: CONFIRM_ORDER_SHIPPED,
  order
})

const confirmOrderDelivered = order => ({
  type: CONFIRM_ORDER_DELIVERED,
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

export const shipOrder = (id, shipDate) =>
  dispatch => {
    return axios.put(`/api/orders/${id}/`, { shipDate: shipDate })
      .then(res => res.data)
      .then(order => {
        dispatch(confirmOrderShipped(order))
        history.push('/admin/orders/')
      })
      .catch(err => console.error('updating order ship date went wrong', err))
  }

  export const deliverOrder = (id, deliveryDate) =>
  dispatch => {
    return axios.put(`/api/orders/${id}/`, { deliveryDate: deliveryDate })
      .then(res => res.data)
      .then(order => {
        dispatch(confirmOrderDelivered(order))
        history.push('/admin/orders/')
      })
      .catch(err => console.error('updating order ship date went wrong', err))
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
    case CONFIRM_ORDER_SHIPPED: {
      return state.map(order => (
        action.order.id === order.id ? action.order : order))
    }
    case CONFIRM_ORDER_DELIVERED: {
      return state.map(order => (
        action.order.id === order.id ? action.order : order))
    }
    default: return state
  }
}
