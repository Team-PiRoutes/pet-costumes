import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

/**
 * COMPONENT
 */
export const Products = (props) => {
  const { products } = props

  return (
    <div>
      <h3> Our Products </h3>
      <div>
        {
          products.map(product => (
            <div id={`product-${product.id}`} key={product.id}>
              <h3>
                <span>{product.title}</span>
                <span>{product.photoURl}</span>
              </h3>
            </div>
          ))
        }
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = (state) => ({ produts: state.products })

export default connect(mapState)(Products)

/**
 * PROP TYPES
 */
