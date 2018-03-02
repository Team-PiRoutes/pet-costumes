import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_CATEGORIES = 'GOT_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
export const gotCategories = categories => ({
  type: GOT_CATEGORIES,
  categories: categories
})

/**
 * THUNK CREATORS
 */
export const fetchCategories = () =>
  dispatch =>
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        dispatch(gotCategories(categories))
      })
      .catch(err => console.error('fetching categories went wrong', err))


/**
 * REDUCER
 */
export default function (state = defaultCategories, action){
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories
    default: return state
  }
}
