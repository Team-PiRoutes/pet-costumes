import React from 'react'
import { NavLink } from 'react-router-dom'

const Product = (props) => {

  const { product } = props

  return (
    <li>
    <NavLink to={`/products/${product.id}`}>
        <span>{product.title}</span>
        <span>{product.photoURl}</span>
    </NavLink>
    </li>
  )
}

export default Product
