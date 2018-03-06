import React from 'react'
import { connect } from 'react-redux'
import Product from './product'
import Sidebar from './sidebar'
import { sizes } from '../../sizes'
import Search from './search'
import { addItemToCart } from '../store/cart'
import { filterByCategories, filterByName, filterBySizes } from '../utils/product-filters'

/**
 * COMPONENT
 */
export const Products = (props) => {

  const { products, categories, activeCategories, activeSizes, searchTerm } = props

  let filteredProducts = filterByName(filterByCategories(filterBySizes(products, activeSizes), activeCategories), searchTerm)

  return (
    <div className="main">
      <Sidebar categories={categories} sizes={sizes} />
      <div className="content">
        <div className="products-list-title">
          <span>Our Products</span>
          <span><Search /></span>
        </div>
        <div className="products-list">
          {
            filteredProducts.map(product => (
              <div id={`product-${product.id}`} key={product.id} className="product-item z-depth-3" >
                <Product product={product} addItemToCart={props.addItemToCart} />
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
    activeSizes: state.activeSizes,
    searchTerm: state.searchTerm,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: (item) => dispatch(addItemToCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
