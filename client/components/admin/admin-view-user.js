import React, { Component } from 'react'
import axios from 'axios'

class AdminViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount () {
    const userId = this.props.match.params.userId
    axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => this.setState({ user }))
      .catch(err => console.error(err))
  }

  render () {
    const { user } = this.state
    return (
      <div>
        <h2>User: {user.email}</h2>
        {user.isAdmin ? <div><em>Admin</em></div> : <div />}
        <button>Reset Password</button>
        <button>Promote to Admin</button>
        <button>Delete</button>
      </div>
    )
  }
}

export default AdminViewUser
