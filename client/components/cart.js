import React from 'react'
import { connect } from 'react-redux'
import Product from './product'

/**
 * COMPONENT
 */
const Cart = (props) => {

  const { cart } = props

  return (
    <div>
      <h3> Your Cart </h3>

      {
        cart.length === 0 ? <h4> Empty Cart</h4> :
          <ul>
            {
              cart.map(product => (
                <div id={`product-${product.id}`} key={product.id}>
                  <Product product={product} />
                </div>
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
