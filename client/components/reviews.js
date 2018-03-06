import React from 'react'
import { displayStarRating } from '../utils/starRating'

const Reviews = (props) => {

  const { reviews } = props

  return (
    <div>
      <p>Avarage rating:</p>
      {displayStarRating(
        reviews && reviews.length > 0 ?
          Math.floor((reviews.reduce((sum, review) => {
            return sum + review.rating
          }, 0)) / reviews.length)
          : 0
      )
      }
      <p>Reviews:</p>
      {
        reviews && reviews.map(review => (
          <div key={review.id}>
            <div>{displayStarRating(review.rating)} </div>
            <p>{review.message} </p>
          </div>
        ))
      }
    </div>
  )
}

export default Reviews
