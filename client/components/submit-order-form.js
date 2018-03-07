import React from 'react'
import { connect } from 'react-redux'
import { postOrder } from '../store'

const SubmitOrderForm = (props) => {
  const { handleSubmit, userId } = props
  console.log('userId: ', userId)

  return (
    <div className="submit-order-form z-depth-4">
      <p>Please enter your details to submit your order:</p>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={userId} id="userId" />
        <div className="input-field block">
          <input id="email" type="email" className="validate" />
          <label htmlFor="email" data-error="Please supply a valid email">email</label>
        </div>
        <div className="input-field block">
          <input id="addressLine1" type="text" className="validate" />
          <label htmlFor="addressLine1" data-error="You must include an address">address line 1</label>
        </div>
        <div className="input-field block">
          <input id="addressLine2" type="text" />
          <label htmlFor="addressLine2">address line 2</label>
        </div>
        <div className="input-field">
          <input id="city" type="text" />
          <label htmlFor="city">city</label>
        </div>
        <div className="input-field">
          <input id="state" type="text" />
          <label htmlFor="state">state</label>
        </div>
        <div className="input-field">
          <input id="zip" type="text" />
          <label htmlFor="zip">zip</label>
        </div>
        <button className="waves-effect waves-light btn">submit order</button>
      </form>
    </div>
  )
}

const mapStateToProps = function (state) {
  return {
    userId: state.user.id
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSubmit: function (event) {
      event.preventDefault()
      let order = {
        customerId: event.target.userId.value,
        email: event.target.email.value,
        addressLine1: event.target.addressLine1.value,
        addressLine2: event.target.addressLine2.value,
        city: event.target.city.value,
        state: event.target.state.value,
        zip: event.target.zip.value,
        cartId: localStorage.getItem('cartId')
      }
      console.log('customerId: ', order.customerId)
      dispatch(postOrder(order))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrderForm)
