import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchOrdersByCustomerId } from '../store'
// import Product from './product'

/**
 * COMPONENT
 */
class Orders extends Component {
  componentDidMount() {
    this.props.loadInitialData(this.props.userid)
  }

  render () {
    const { orders } = this.props
    // console.log('orders: ', orders)

    return (
      <div className="container">
        <h3>My orders</h3>
        {orders && orders.map(order => {
          return <div key={order.id}>{order.email}</div>
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
