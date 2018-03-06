import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrdersByCustomerId } from '../store'

const priceInDollars = (price) => {
  if (!price) return 'free'
  else return `$${(price / 100).toFixed(2)}`
}

const getProductTitle = (products, id) => {
  const product = products.find(product => product.id = id)
  const productTitle = product.title || 'Costume'
  return productTitle
}

/**
 * COMPONENT
 */
class ViewOrder extends Component {

  componentDidMount() {

    const orderId = +this.props.match.params.orderId
    const orders = this.props.orders
    const filteredOrder = orders.find(order => {
      return orderId === order.id
    })
    if (!filteredOrder) {
      this.props.loadInitialData(this.props.userid)
    }
  }

  render() {
    const { orders, products } = this.props
    console.log('orders >>> ', orders)
    const order = orders.find(ord => ord.id === +this.props.match.params.orderId) || {}


    return (
      <div className="container">
        <h1>Order Id: {order.id}</h1>
        <div className="z-depth-3 order-item">
          <div>Order submitted on: {Date(order.createdAt)}</div>
          <div>Confirmation email sent to: {order.email}</div>
          <div>Order status: {order.orderStatus}</div>
          <div>Order shipped: {order.shipDate}</div>
          <div>Order delivered: {order.deliveryDate}</div>
          <h5>Items ordered:</h5>
          <ul>
            {order.orderItems && order.orderItems.map(item => {
              return (
                <li key={item.id}>
                  {item.quantity} {getProductTitle(products, item.productId)} for {priceInDollars(item.priceInCents)} totaling {priceInDollars(item.priceInCents * item.quantity)}
                </li>
              )
            })}
          </ul>
        </div>
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
    userid: state.user.id,
    products: state.products
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData(userid) {
      dispatch(fetchOrdersByCustomerId(userid))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(ViewOrder)

