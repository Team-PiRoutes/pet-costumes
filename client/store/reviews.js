import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_REVIEW = 'ADD_REVIEW'

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * ACTION CREATORS
 */
const addReview = review => ({ type: ADD_REVIEW, review })

/**
 * THUNK CREATORS
 */
export const postReview = (review) =>
  dispatch =>
    axios.post('/api/products/:id/reviews', review)
      .then(res => res.data)
      .then(newReview => {
        dispatch(addReview(newReview))
        history.push('/products/')
      })
      .catch(err => console.error('posting new review went wrong', err))


/**
 * REDUCER
 */
export default function (state = defaultReviews, action) {
  switch (action.type) {
    case ADD_REVIEW: return [...state, action.review]
    default: return state
  }
}
