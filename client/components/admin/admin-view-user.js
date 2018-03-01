import React, { Component } from 'react'
import axios from 'axios'

class AdminViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }

    this.handleReset = this.handleReset.bind(this)
    this.handlePromotion = this.handlePromotion.bind(this)
  }

  componentDidMount () {
    const userId = this.props.match.params.userId
    axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => this.setState({ user }))
      .catch(err => console.error(err))
  }

  handleReset () {
    const userId = this.state.user.id || this.props.match.params.userId
    axios.put(`/api/users/${userId}`, { shouldResetPassword: true })
      .then(res => res.data)
      .then(user => this.setState({ user }))
      .catch(err => console.error(err))
  }

  handlePromotion () {
    const userId = this.state.user.id || this.props.match.params.userId
    axios.put(`/api/users/${userId}`, { isAdmin: true })
      .then(res => res.data)
      .then(user => this.setState({ user }))
      .catch(err => console.error(err))
  }

  render () {
    const { user } = this.state
    return (
      <div className="container">
        <h2>User: {user.email}</h2>
        <ul>
          {
            !user.shouldResetPassword ?
            <li><button onClick={this.handleReset}>Reset Password</button></li> :
            <li>This user should reset their password</li>
          }
          {
            !user.isAdmin ?
            <li><button onClick={this.handlePromotion}>Promote to Admin</button></li> :
            <li>User is Admin</li>
          }
          <li><button>Delete</button></li>
        </ul>
      </div>
    )
  }
}

export default AdminViewUser
