/*  A reducer to keep track of which categories are being
    used to filter the products on the products listing
*/

/**
 * ACTION TYPES
 */
const CHANGE_SEARCH_TERM = 'CHANGE_SEARCH_TERM'

/**
 * INITIAL STATE
 */
const defaultSearchTerm = ''

/**
 * ACTION CREATORS
 */
export const changeSearchTerm = term => ({
  type: CHANGE_SEARCH_TERM,
  term: term
})

/**
 * REDUCER
 */
export default function (state = defaultSearchTerm, action){
  switch (action.type) {
    case CHANGE_SEARCH_TERM:
      return action.term
    default: return state
  }
}
