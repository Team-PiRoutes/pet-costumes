import React from 'react'
import { connect } from 'react-redux'
import Product from './product'
import Sidebar from './sidebar'

/**
 * COMPONENT
 */
const Products = (props) => {

  const { products } = props

  return (
    <div className="main">
      <Sidebar />
      <div className="content">
        <h3>Our Products</h3>
        <div className="products-list">
          {
            products.map(product => (
              <div id={`product-${product.id}`} key={product.id} className="product-item z-depth-3" >
                <Product product={product} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */


const mapStateToProps = function (state) {
  return {
    products: state.products,
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Products)
