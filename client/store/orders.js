import axios from 'axios'

/**
 * ACTION TYPES
 */
const GOT_ORDERS = 'GOT_ORDERS'

/**
 * INITIAL STATE
 */
const defaultCategories = []

/**
 * ACTION CREATORS
 */
export const gotOrders = orders => ({
  type: GOT_ORDERS,
  orders
})

/**
 * THUNK CREATORS
 */
// export const fetchCategories = () =>
//   dispatch =>
//     axios.get('/api/categories')
//       .then(res => res.data)
//       .then(categories => {
//         dispatch(gotCategories(categories))
//       })
//       .catch(err => console.error('fetching categories went wrong', err))


/**
 * REDUCER
 */
// export default function (state = defaultCategories, action){
//   switch (action.type) {
//     case GOT_CATEGORIES:
//       return action.categories
//     default: return state
//   }
// }
