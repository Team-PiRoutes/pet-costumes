import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * COMPONENT
 */
const CartItem = (props) => {
  const product = props.product

  return (
    <NavLink to={`/products/${product.id}`}>
      {
        // <img src={product.photoURl} alt={`Image of ${product.title}`} height="20" width="20" />
      }
      <h4 className={'cart-item-title'}>{product.title}</h4>
      <p className="item-qty">{product.quantiy} In Cart</p>
    </NavLink>
  )
}

export default CartItem
