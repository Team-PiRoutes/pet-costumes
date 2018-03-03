/*  A reducer to keep track of which categories are being
    used to filter the products on the products listing
*/

/**
 * ACTION TYPES
 */
const ADD_ACTIVE_CATEGORY = 'ADD_ACTIVE_CATEGORY'
const REMOVE_ACTIVE_CATEGORY = 'REMOVE_ACTIVE_CATEGORY'
const CLEAR_ACTIVE_CATEGORIES = 'CLEAR_ACTIVE_CATEGORIES'

/**
 * INITIAL STATE
 */
const defaultActiveCategories = []

/**
 * ACTION CREATORS
 */
export const addActiveCategory = category => ({
  type: ADD_ACTIVE_CATEGORY,
  categoryId: category.id
})

export const removeActiveCategory = category => ({
  type: REMOVE_ACTIVE_CATEGORY,
  categoryId: category.id
})

export const clearActiveCategories = () => ({ type: CLEAR_ACTIVE_CATEGORIES })

/**
 * REDUCER
 */
export default function (state = defaultActiveCategories, action){
  switch (action.type) {
    case ADD_ACTIVE_CATEGORY:
      return [...state, action.categoryId]
    case REMOVE_ACTIVE_CATEGORY:
      return state.filter(catId => catId !== action.categoryId)
    case CLEAR_ACTIVE_CATEGORIES:
      return []
    default: return state
  }
}
