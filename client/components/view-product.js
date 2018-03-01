import React, { Component } from 'react'
import axios from 'axios'
import Reviews from './reviews'

class ViewProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      product: {}
    }
  }

  componentDidMount() {

    const productId = this.props.match.params.productId

    axios.get(`/api/products/${productId}`)
      .then(res => res.data)
      .then(product => {
        this.setState({ product })
      })
      .catch(err => console.error(err))
  }

  render() {

    const { product } = this.state
    const reviews = product.reviews

    return (
      <div>
        <h3>{product.title}</h3>
        <p>Description: {product.description}</p>
        <p>Price: {product.priceInCents}</p>
        <p>Quantity: {product.quantity}</p>
        <p>Size: {product.size}</p>
        <Reviews reviews={reviews} />
        <img src={product.photoUrl} />
      </div>
    )
  }
}

export default ViewProduct
