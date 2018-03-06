import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS'

/**
 * INITIAL STATE
 */
const defaultOrders = []

/**
 * ACTION CREATORS
 */
const changeOrderStatus = order => ({ type: CHANGE_ORDER_STATUS, order })

/**
 * THUNK CREATORS
 */
export const updateOrderStatuss = (id, status) =>
  dispatch =>
    axios.put(`/api/orders/${id}/`, {status: status})
      .then(res => res.data)
      .then(order => {
        dispatch(changeOrderStatus(order))
        history.push('/orders/')
      })
      .catch(err => console.error('updating order status went wrong', err))


/**
 * REDUCER
 */
export default function (state = defaultOrders, action) {
  switch (action.type) {
    case CHANGE_ORDER_STATUS:{
      return state.map(order => (
        action.order.id === order.id ? action.order : order))
    }
    default: return state
  }
}
