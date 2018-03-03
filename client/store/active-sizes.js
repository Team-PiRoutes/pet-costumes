/*  A reducer to keep track of which categories are being
    used to filter the products on the products listing
*/

/**
 * ACTION TYPES
 */
const ADD_ACTIVE_SIZE = 'ADD_ACTIVE_SIZE'
const REMOVE_ACTIVE_SIZE = 'REMOVE_ACTIVE_SIZE'
const CLEAR_ACTIVE_SIZES = 'CLEAR_ACTIVE_SIZES'

/**
 * INITIAL STATE
 */
const defaultActiveSize = []

/**
 * ACTION CREATORS
 */
export const addActiveSize = size => ({
  type: ADD_ACTIVE_SIZE,
  size: size
})

export const removeActiveSize = size => ({
  type: REMOVE_ACTIVE_SIZE,
  size: size
})

export const clearActiveSizes = () => ({ type: CLEAR_ACTIVE_SIZES })

/**
 * REDUCER
 */
export default function (state = defaultActiveSize, action){
  switch (action.type) {
    case ADD_ACTIVE_SIZE:
      return [...state.filter(size => size !== action.size), action.size].sort()
    case REMOVE_ACTIVE_SIZE:
      return state.filter(size => size !== action.size).sort()
    case CLEAR_ACTIVE_SIZES:
      return []
    default: return state
  }
}
