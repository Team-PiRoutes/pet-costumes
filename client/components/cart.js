import React from 'react'
import { connect } from 'react-redux'
import CartItem from './cart-item'
import { fetchCart } from '../store/cart'
import Loading from 'react-loading-animation'
/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasLoaded: false
    }
    this.totalCart = this.totalCart.bind(this)
  }

  totalCart() {
    let total = this.props.cart.reduce((total, item) => {
      console.log(item)
      total += item.priceInCents * item.quantity
      return total
    }, 0)
    return total
  }

  componentDidMount() {

    this.setState({ hasLoaded: true })
  }


  render() {

    console.log(this)
    const { cart } = this.props || []
    let total = this.totalCart()

    return (
      !this.state.hasLoaded ? <Loading /> : (
        <div className="container">
          <h3 className=""> Your Cart </h3>
          {
            <ul>
              {
                this.state.hasLoaded && cart.length === 0 ? <h4 /> :
                  cart.map(product => (

                    <li id={`cart-item-${product.id}`} key={product.id}>
                      <CartItem product={product} />
                    </li>

                  ))
              }
            </ul>
          }
          <h5>
            {
              this.state.hasLoaded && this.props.cart.length > 0 ? `Total : ${total}` :
                <i className="material-icons large">shopping_cart</i>
            }
          </h5>

        </div>
      ))
  }
}


/**
 * CONTAINER
 */


const mapStateToProps = function (state) {
  return {
    cart: state.cart
  }
}
const mapDispatch = (dispatch) => {
  return { fetchCart: dispatch(fetchCart()) }
}


export default connect(mapStateToProps, mapDispatch)(Cart)

        /**
        * PROP TYPES
        */
