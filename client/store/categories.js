/*  A reducer to keep track of which categories are being
    used to filter the products on the products listing
*/

/**
 * ACTION TYPES
 */
const ADD_CATEGORY = 'ADD_CATEGORY'
const REMOVE_CATEGORY = 'REMOVE_CATEGORY'
const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
export const addCategory = category => ({
  type: ADD_CATEGORY,
  categoryId: category.id
})

export const removeCategory = category => ({
  type: REMOVE_CATEGORY,
  categoryId: category.id
})

export const clearCategories = () => ({ type: CLEAR_CATEGORIES })

/**
 * REDUCER
 */
export default function (state = defaultCategories, action){
  switch (action.type) {
    case ADD_CATEGORY:
      return [...state, action.categoryId]
    case REMOVE_CATEGORY:
      return state.filter(catId => catId !== action.categoryId)
    case CLEAR_CATEGORIES:
      return []
    default: return state
  }
}
