import React from 'react'

const Reviews = (props) => {

  const { reviews } = props

  return (
    <div>
      <p>Reviews:</p>
      {
        reviews && reviews.map(review => (
          <div key={review.id}>
            <div>{review.rating} </div>
            <p>{review.message} </p>
          </div>
        ))
      }
    </div>
  )
}

export default Reviews
