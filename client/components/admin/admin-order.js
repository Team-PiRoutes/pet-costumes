import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminOrder = (props) => {

const { order } = props

  return (
      <NavLink to={`/admin/orders/${order.id}`}>
        {order.id}
      </NavLink>
  )
}

export default AdminOrder
