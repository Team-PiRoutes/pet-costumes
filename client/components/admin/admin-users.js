import React, { Component } from 'react'
import axios from 'axios'
import AdminUser from './admin-user'

class AdminUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }
  }

  componentDidMount () {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => this.setState({ users }))
      .catch(err => console.error(err))
  }

  render () {
    const { users } = this.state
    return (
      <ul>
        {users.map(user => {
          return (
            <AdminUser user={user} key={user.id} />
          )
        })}
      </ul>
    )
  }
}

export default AdminUsers
