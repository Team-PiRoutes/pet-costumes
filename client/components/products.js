import React from 'react'
import { connect } from 'react-redux'
import Product from './product'
import Sidebar from './sidebar'
import { sizes } from '../../sizes'

export const filterByCategories = (products, activeCategories) => {
  if (activeCategories.length === 0) return products

  return products.filter(product => {
    const productCatIds = product.categories.map(cat => cat.id)
    for (let i = 0; i < activeCategories.length; i++) {
      if (productCatIds.indexOf(activeCategories[i]) === -1) return false
    }
    return true
  })
}

export const filterBySizes = (products, activeSizes) => {
  if (activeSizes.length === 0) return products
  return products.filter(product => activeSizes.indexOf(product.size) !== -1)
}


/**
 * COMPONENT
 */
export const Products = (props) => {

  const { products, categories, activeCategories, activeSizes } = props

  let filteredProducts = filterByCategories(filterBySizes(products, activeSizes), activeCategories)

  return (
    <div className="main">
      <Sidebar categories={categories} sizes={sizes} />
      <div className="content">
        <h3>Our Products</h3>
        <div className="products-list">
          {
            filteredProducts.map(product => (
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
    categories: state.categories,
    activeCategories: state.activeCategories,
    activeSizes: state.activeSizes
  }
}

export default connect(mapStateToProps)(Products)
