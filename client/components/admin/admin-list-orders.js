import React from 'react'
import axios from 'axios'
/**
 * COMPONENT
 */
export default class AdminListOrders extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      orders: []
    }
  }
  componentDidMount() {
    axios.get('/api/orders/admin/list-orders')
      .then((res) => {
        const orders = res.data
        this.setState({ orders })
      })
  }

  render() {

    const orders = this.state.orders
    return (
      <div className={'order-list'} >
        <h2>Order List</h2>
        {
          orders.map(order =>
            (
              <div className="order-list-item" id={order.id} key={order.id}>
                <a className="order-number" href="#">{`Order Number: ${order.id}`}</a>
                <p className="status">{order.orderStatus}</p>
                <p className="city-state">{`${order.city}, ${order.state}`}</p>
                <button />
              </div>
            )
          )
        }
      </div>
    )
  }
}
