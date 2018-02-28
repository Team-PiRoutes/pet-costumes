import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

/**
 * COMPONENT
 */
export const Products = (props) => {

  const { products } = props
  console.log('products >>>>', products)

  if (!products) return null
  return (
    <div>
      <h3> Our Products </h3>
      <ul>
        {
          //products &&
          products.map(product => (
            <div id={`product-${product.id}`} key={product.id}>
            <NavLink to={`/products/${product.id}`}>
              <h3>
                <span>{product.title}</span>
                <span>{product.photoURl}</span>
              </h3>
              </NavLink>
            </div>
          ))
        }
      </ul>
    </div>
  )
}

/**
 * CONTAINER
 */


const mapStateToProps = function (state) {
console.log('state >>>>>', state)
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products)

/**
 * PROP TYPES
 */
