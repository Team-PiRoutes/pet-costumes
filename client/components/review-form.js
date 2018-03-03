import React from 'react'

function ReviewForm() {

  return (
    <div className="container">
      <div className="row">
        <form className="col s12" id="reviewForm">
          <h3>Review</h3>
          <div className="input-field col s12" >
            <div />
            <input name="rating" id="rating" type="text" />
            <label htmlFor="rating">Rating</label>
            <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
          </div>
          <div className="input-field col s12" >
            <div className="row" />
            <input name="reviewText" id="reviewText" type="text" />
            <label htmlFor="reviewText">Review text</label>
          </div>
        </form>
      </div>
    </div>
  )
}


export default ReviewForm
