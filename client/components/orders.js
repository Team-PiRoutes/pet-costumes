import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchOrdersByCustomerId } from '../store'
// import Product from './product'

/**
 * COMPONENT
 */
class Orders extends Component {
  componentDidMount() {
    this.props.loadInitialData(this.props.userid)
  }

  render() {
    const { orders } = this.props
    // console.log('orders: ', orders)

    return (
      <div className="container">
        <h3>My orders</h3>
        {orders && orders.map(order => {
          return (
            <NavLink key={order.id} to={`/me/orders/${order.id}`}>
              <div className="z-depth-3 order-item">
                <div className="chip">Order Id: {order.id}</div>
                <div>Order submitted on: {Date(order.createdAt)}</div>
                <div>Confirmation email sent to: {order.email}</div>
                <div>Order status: {order.orderStatus}</div>
                <div>Order shipped: {order.shipDate}</div>
                <div>Order delivered: {order.deliveryDate}</div>
              </div>
            </NavLink>
          )
        })}
      </div>
    )
  }

}

// /**
//  * CONTAINER
//  */


const mapStateToProps = function (state) {
  return {
    orders: state.orders,
    userid: state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(userid) {
      dispatch(fetchOrdersByCustomerId(userid))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(Orders)
