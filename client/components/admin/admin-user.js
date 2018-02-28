import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminUser = (props) => {

const { user } = props
  return (
    <li>
      <NavLink to={`/admin/users/${user.id}`}>
        {user.email}
      </NavLink>
    </li>
  )
}

export default AdminUser
