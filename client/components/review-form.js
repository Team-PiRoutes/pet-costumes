import React from 'react'
import { connect } from 'react-redux'
import { postReview } from '../store'
import {displayStarRating, starRatingButtons } from '../../server/utils/starRating'


function ReviewForm(props) {

  const { handleSubmit } = props

  return (
    <div id="review-form" className="container">
      <div className="row">
        <form onSubmit={handleSubmit} className="col s12" id="reviewForm">
          <h3>Review</h3>
          <div className="input-field col s5" >
            <div />
            <input id="rating" name="rating" type="number" min="0" max="5" placeholder="choose between 0-5" />
            <label htmlFor="rating">Rating</label>
          </div>
          <div className="input-field col s12" >
            <div className="row" />
            <input id="message" name="message" type="text" placeholder="write your review here" />
            <label htmlFor="message">Review text</label>
          </div>
          <div>
            <button className="waves-effect waves-light btn" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit: function (event) {
      event.preventDefault()
      let review = {
        rating: event.target.rating.value,
        message: event.target.message.value,
        productId: ownProps.match.params.productId
      }
      dispatch(postReview(review))
      document.getElementById('reviewForm').reset()
    }
  }
}
export default connect(null, mapDispatchToProps)(ReviewForm)
