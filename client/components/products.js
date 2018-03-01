import React from 'react'
import { connect } from 'react-redux'
import Product from './product'

/**
 * COMPONENT
 */
const Products = (props) => {

  const { products } = props

  return (
    <div>
      <h3> Our Products </h3>
      <ul>
        {
          products.map(product => (
            <div id={`product-${product.id}`} key={product.id}>
              <Product product={product} />
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
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products)
