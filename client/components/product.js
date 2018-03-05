import React from 'react'
import { NavLink } from 'react-router-dom'

const Product = (props) => {

  const { product, addItemToCart } = props
  function onClick(event) {
    event.preventDefault()
    event.stopPropagation()
    const { priceInCents, id } = product
    const itemToSend = {
      priceInCents,
      quantity: 1,
      productId: id
    }
    addItemToCart(itemToSend)
  }
  return (
    <NavLink to={`/products/${product.id}`}>
      <img src={product.photoUrl} className="product-img" />
      <div className="product-title">{`${product.title} Size:${product.size}`}</div>
      <div className="product-price">{product.priceInDollars}</div>
      <button onClick={onClick}><i className="material-icons right">add_shopping_cart</i></button>
    </NavLink>
  )
}

export default Product
