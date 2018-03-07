import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <nav className="navbar">
    <span className="nav-brand">
      <Link to="/">Pet Costumes by πRoutes</Link>
    </span>
    <span className="navmenu">
      <Link to="/products">Products</Link>
      {isAdmin &&
        <span>
          <Link to="/admin/users">User</Link>
          <Link to="/admin/products/new">Add Product</Link>
          <Link to="/admin/orders">Orders</Link>
        </span>
      }
      {isLoggedIn
        ? <span>
          <Link to="/me">Me</Link>
          <a href="#" onClick={handleClick} >Logout</a>
        </span>
        : <span>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </span>
      }
      <Link to="/cart"><i className="material-icons">shopping_cart</i></Link>
    </span>
  </nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
