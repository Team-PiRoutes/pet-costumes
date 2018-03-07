
import React from 'react'
import { deleteItemFromCart } from '../../store/cart'
import { connect } from 'react-redux'
/**
 * COMPONENT
 */
const DeleteCartItem = (props) => {

  return (

    <button onClick={() => props.deleteItemFromCart(props.itemId)} className="small" >
      <i className="material-icons">delete_forever</i>
    </button>
  )
}
const mapStateToProps = function (state, props) {
  return {
    itemId: props.itemId
  }
}
const mapDispatch = dispatch => {
  return {
    deleteItemFromCart: (cartId) => {
      dispatch(deleteItemFromCart(cartId))
    }
  }
}

export default connect(mapStateToProps, mapDispatch)(DeleteCartItem)

