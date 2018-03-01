import React from 'react'
import { NavLink } from 'react-router-dom'

const Review = (props) => {

  const { reviews } = props

  return (
    <li>
      <p>Reviews:</p>
      {
        reviews && reviews.map(review => (
          <div key={review.id}>
            <div>{review.rating} </div>
            <p>{review.message} </p>
          </div>
        ))
      }
    </li>
  )
}

export default Review
