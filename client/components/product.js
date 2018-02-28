import React from 'react'
import { NavLink } from 'react-router-dom'

const Product = (props) => {

  const { product } = props

  return (
    <NavLink to={`/products/${product.id}`}>
      <h4>
        <span>{product.title}</span>
        <span>{product.photoURl}</span>
      </h4>
    </NavLink>
  )
}

export default Product
