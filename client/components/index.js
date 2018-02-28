/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { Login, Signup } from './auth-form'
export { default as Products } from './products'
export { default as Cart } from './cart'
export { default as AdminListOrders } from './admin/admin-list-orders'
export { default as AdminUsers } from './admin/admin-users'
export { default as AdminViewUser } from './admin/admin-view-user'
