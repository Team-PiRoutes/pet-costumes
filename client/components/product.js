import React from 'react'
import { NavLink } from 'react-router-dom'

const Product = (props) => {

  const { product } = props

  return (
    <NavLink to={`/products/${product.id}`}>
      <img src={product.photoUrl} className="product-img" />
      <div className="product-title">{product.title}</div>
      <div className="product-price">{product.priceInDollars}</div>
      <button><i className="material-icons right">add_shopping_cart</i></button>
    </NavLink>
  )
}

export default Product
