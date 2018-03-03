import React from 'react'
import { connect } from 'react-redux'
import CartItem from './cart-item'

/**
 * COMPONENT
 */
const Cart = (props) => {

  const { cart } = props

  return (
    <div>
      <h3> Your Cart </h3>

      {
        <ul>
          {
            cart.length === 0 ? <h4> Your cart is empty! Your pet needs a πRoute outfit. </h4> :
              cart.map(product => (

                <li id={`cart-item-${product.id}`} key={product.id}>
                  <CartItem product={product} />
                </li>

              ))
          }
        </ul>
      }
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

export default connect(mapStateToProps)(Cart)

      /**
      * PROP TYPES
      */
