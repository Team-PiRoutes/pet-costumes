import React, { Component } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import AdminOrder from './admin-order'

class AdminOrders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => this.setState({ orders }))
      .then(() => {
        $(document).ready(function() {
          $('select').material_select()
        })
      })
      .catch(err => console.error(err))
  }

  render() {

    const { orders } = this.state

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

export default AdminOrders
