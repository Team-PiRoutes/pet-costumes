import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchOrders, updateOrderStatus, shipOrder, deliverOrder } from '../../store/index'

class AdminOrders extends Component {

  componentDidMount() {
    this.props.loadInitialData(this.props.orders)
    $(document).ready(function () {
      $('select').material_select()
    })
  }

  render() {

    const { orders, handleChange, handleShip, handleDeliver } = this.props

    return (
      <div>
        <h2>Order List:</h2>
        <table className="highlight">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Status</th>
              <th>Shipped</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders && orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>
                    <NavLink to={`/admin/orders/${order.id}`}>
                      {order.id}
                    </NavLink>
                  </td>
                  <td>
                    <div>
                      <select
                        className="browser-default"
                        value={order.orderStatus}
                        onChange={(event) => handleChange(event, order.id)}>
                        <option value="created">Created</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </td>
                  <td>
                    <form action="ship" onChange={(event) => handleShip(event, order.id)}>
                      <p>
                        <input type="checkbox" className="filled-in" id={`${order.id}A`} />
                        <label htmlFor={`${order.id}A`} />
                      </p>
                    </form>
                  </td>
                  <td>
                    <form action="deliver" onChange={(event) => handleDeliver(event, order.id)}>
                      <p>
                        <input type="checkbox" className="filled-in" id={`${order.id}B`} />
                        <label htmlFor={`${order.id}B`} />
                      </p>
                    </form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    orderId: state.orders.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchOrders())
    },
    handleChange(event, orderId) {
      dispatch(updateOrderStatus(orderId, event.target.value))
    },
    handleShip(event, orderId) {
      const today = new Date()
      dispatch(shipOrder(orderId, today))
    },
    handleDeliver(event, orderId) {
      const today = new Date()
      dispatch(deliverOrder(orderId, today))
    }
  }
}
export default connect(mapStateToProps, mapDispatch)(AdminOrders)
