import React from 'react'
import { connect } from 'react-redux'
// import CartItem from './cart-item'
// import { fetchCart } from '../store/cart'
import SubmitOrderForm from './submit-order-form'
/**
 * COMPONENT
 */
const Cart = (props) => {

  const { cart } = props
  let total = cart.reduce((tot, item) => {
    return tot + item.priceInCents
  }, 0)
  console.log('total: ', total)

  return (
    <div className="container">
      <h3 className=""> Your Cart </h3>
      {
        <ul>
          {
          // cart.length === 0 ? <h4> Your cart is empty! Your pet needs a πRoute outfit. </h4> :
          //   cart.map(product => (

          //     <li id={`cart-item-${product.id}`} key={product.id}>
          //       <CartItem product={product} />
          //     </li>

          // ))
          }
        </ul>
      }
      <h5>
        {
          `Total : ${total}`
        }
      </h5>
      <SubmitOrderForm cart={cart} />
    </div>
  )
}


  /**
   * CONTAINER
   */


  const mapStateToProps = function (state) {
    return {
      cart: state.cart
    }
  }
  // const mapDispatch = (dispatch) => {
  //   return { fetchCart: dispatch(fetchCart()) }
  // }


  export default connect(mapStateToProps)(Cart)

        /**
        * PROP TYPES
        */
