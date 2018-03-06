import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AdminOrder from './admin-order'
import { fetchOrders } from '../../store/index'

class AdminOrders extends Component {

  // componentDidMount() {
  //   axios.get('/api/orders')
  //     .then(res => res.data)
  //     .then(orders => this.setState({ orders }))
  //     .then(() => {
  //       $(document).ready(function() {
  //         $('select').material_select()
  //       })
  //     })
  //     .catch(err => console.error(err))
  // }

  componentDidMount() {
    this.props.loadInitialData(this.props.orders)
    $(document).ready(function() {
      $('select').material_select()
    })
  }

  render() {

    const { orders } = this.props

    return (
      <div>
        <h2>Order List:</h2>
        <table>
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
                    <div className="input-field">
                      <select value={order.orderStatus}>
                        <option value="created">Created</option>
                        <option value="processing">Processing</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
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
    orders: state.orders
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchOrders())
    }
  }
}
export default connect(mapStateToProps, mapDispatch)(AdminOrders)
