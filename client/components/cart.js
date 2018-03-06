import React from 'react'
import { connect } from 'react-redux'
// import { fetchCart } from '../store/cart'
import SubmitOrderForm from './submit-order-form'

const priceInDollars = (price) => {
  if (!price) return 'free'
  else return `$${(price / 100).toFixed(2)}`
}

const getProductTitle = (products, id) => {
  const product = products.find(prod => prod.id === id)
  const productTitle = product ? product.title : 'Costume'
  return productTitle
}

/**
 * COMPONENT
 */
const Cart = (props) => {

  const { cart, products } = props
  let total = cart.reduce((tot, item) => {
    return tot + item.priceInCents
  }, 0)
  console.log('cart: ', cart)

  return (cart.length === 0) ? (
    <div className="container">
      <h1>Your cart is empty.</h1>
    </div>
  ) : (
    <div className="container">
      <h3 className=""> Your Cart </h3>
      {
        <ul>
          {cart.map(item => {
            return (
              <li key={item.id}>
                {item.quantity} {getProductTitle(products, item.productId)} for {priceInDollars(item.priceInCents)} totaling {priceInDollars(item.priceInCents * item.quantity)}
              </li>
            )
          })
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
          `Total: ${priceInDollars(total)}`
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
    products: state.products,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Cart)

        /**
        * PROP TYPES
        */
