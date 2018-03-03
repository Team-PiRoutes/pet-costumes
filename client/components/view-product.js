import React, { Component } from 'react'
import axios from 'axios'
import Reviews from './reviews'
import { connect } from 'react-redux'
import { updateCartItem } from '../store/cart'

class ViewProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasLoaded: false,
      product: {},
      stockMessage: '',
      addDiabled: false
    }
    this.addToCart = this.addToCart.bind(this)
    this.enoughStock = this.enoughStock.bind(this)
  }
  componentDidMount() {

    const productId = this.props.match.params.productId

    axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => {
        this.setState({ product })
      })
      .then(() => {
        this.setState({
          hasLoaded: true
        })
      })
      .then(() => {
        this.enoughStock()
        /*below is jquery that allows the materialbox
        class to function when navigated to. Without it
        it the image will not expand if navigated to from
        the products list*/
        $('.materialboxed').materialbox()
      })
      .catch(err => console.error(err))
  }
  enoughStock() {
    let qtyInStock = this.state.product.quantity
    let qtySelected = document.getElementById('qty').value
    if (qtyInStock <= 0) {

      this.setState({
        stockMessage: 'Out of Stock!',
        qtySelected,
        addDiabled: true
      })
    }
    else if (qtySelected > qtyInStock) {
      document.getElementById('addItem').diabled = true
      this.setState({
        stockMessage: 'Supply is too low to guarantee this order.',
        qtySelected,
        addDiabled: true
      })
    }
    else {
      document.getElementById('addItem').diabled = false
      this.setState({
        stockMessage: 'Currently in stock!',
        qtySelected,
        addDiabled: false
      })
    }
  }
  addToCart() {
    let qty = document.getElementById('qty').value
    const { priceInCents, id } = this.state.product
    const itemToSend = {
      priceInCents,
      quantity: +qty,
      productId: id
    }
    this.props.updateCartItem(itemToSend)
  }

  render() {

    const { product } = this.state
    const reviews = product.reviews
    let stock = product.quantity

    return (
      <div className="container">
        <div className="container">

          <h3 className="head center-align">{product.title}</h3>
          <img className="materialboxed align-center" src={product.photoUrl} />

          <p className="center-align">{product.description}</p>
          <div className="container">
            <p className="inline">Price: {product.priceInCents}</p>

            <div className="col s4">
              {
                this.state.hasLoaded && this.state.qtySelected > stock ?
                  <p className="badge deep-orange-text text-darken-4 inline" > {this.state.stockMessage}</p> :
                  <p className="badge teal-text inline" > {this.state.stockMessage}</p>
              }
            </div>
            <div className="inline" >
              <p>Quantity: </p>
              <input id="qty" type="number" defaultValue="1" name="quantity" min="1" max={stock} onChange={() => this.enoughStock()} />

              <button disabled={this.state.addDiabled} id="addItem" className="btn waves-effect waves-light" type="button" onClick={() => this.addToCart()} >
                Add To Cart<i className="material-icons right">add_shopping_cart</i>
              </button>
            </div>
            <p>Size: {product.size}</p>
          </div>
        </div>
        <Reviews reviews={reviews} />
      </div>

    )
  }
}


const mapStateToProps = null

const mapDispatchToProps = (dispatch) => ({
  updateCartItem: (item) => dispatch(updateCartItem(item))
})
export default connect(mapStateToProps, mapDispatchToProps)(ViewProduct)
