import React from 'react'
import { connect } from 'react-redux'
import { createProduct, postProduct } from '../store'

function NewProductForm(props) {

  const { handleChange, handleSubmit } = props

  return (

      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit} className="col s12" id="productForm">
            <h3>New Product</h3>
            <div className="input-field col s12" >
              <div className="row" />
              <input onChange={handleChange} name="title" id="title" type="text" />
              <label htmlFor="title">Title</label>
            </div>
            <div className="input-field col s12" >
              <div className="row" />
              <textarea onChange={handleChange} name="description" id="textarea1" className="materialize-textarea" />
              <label htmlFor="description">Description</label>
            </div>
            <div className="input-field col s3" >
              <div className="row" />
              <input onChange={handleChange} name="price" id="price" type="number" />
              <label htmlFor="price">Price</label>
            </div>
            <div className="input-field col s3" >
              <div className="row" />
              <input onChange={handleChange} name="quantity" id="quantity" type="number" />
              <label htmlFor="quantity">Quantity</label>
            </div>
            <div className="input-field col s3" >
              <div className="row" />
              <input onChange={handleChange} name="size" id="size" type="text" />
              <label htmlFor="size">Size</label>
            </div>
            <div className="file-field input-field">
              <div className="btn" />
              <span>UPLOAD</span>
              <input onChange={handleChange} type="file" multiple />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload one or more photos" />
            </div>
            <div>
              <button className="waves-effect waves-light btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
  )
}


// const mapStateToProps = state => {
//   return {}
// }

const mapDispatchToProps = dispatch => {
  return {
    handleChange: function (event) {
      dispatch(createProduct(event.target.value))
    },
    handleSubmit: function (event) {
      console.log('handling submit')
      event.preventDefault()
      let product = {
        title: event.target.title.value,
        description: event.target.description.value,
        priceInCents: +event.target.price.value,
        quantity: +event.target.quantity.value,
        size: event.target.size.value,
      }
      dispatch(postProduct(product))
      document.getElementById('productForm').reset()
    }
  }
}
export default connect(null, mapDispatchToProps)(NewProductForm)
