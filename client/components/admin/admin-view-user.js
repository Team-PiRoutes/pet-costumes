import React, { Component } from 'react'
import axios from 'axios'
import history from '../../history'

class AdminViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }

    this.handleReset = this.handleReset.bind(this)
    this.handlePromotion = this.handlePromotion.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount () {
    const userId = this.props.match.params.userId
    axios.get(`/api/users/${userId}`)
      .then(res => res.data)
      .then(user => {
        if (!user) throw new Error(`No user found with id ${userId}`)
        return this.setState({ user })
      })
      .catch(err => console.error(err))
  }

  handleReset () {
    const userId = this.state.user.id || this.props.match.params.userId
    const newValue = !this.state.user.shouldResetPassword
    axios.put(`/api/users/${userId}`, { shouldResetPassword: newValue })
      .then(res => res.data)
      .then(user => this.setState({ user }))
      .catch(err => console.error(err))
  }

  handlePromotion () {
    const userId = this.state.user.id || this.props.match.params.userId
    const newValue = !this.state.user.isAdmin
    axios.put(`/api/users/${userId}`, { isAdmin: newValue })
      .then(res => res.data)
      .then(user => this.setState({ user }))
      .catch(err => console.error(err))
  }

  handleDelete () {
    const userId = this.state.user.id || this.props.match.params.userId
    axios.delete(`/api/users/${userId}`)
      .then(res => res.data)
      .then(() => {
        history.push('/admin/users')
      })
      .catch(err => console.error(err))
  }

  render () {
    const { user } = this.state
    return (
      <div className="container larger">
        <h4>User: {user.email}</h4>
        <ul>
          <li className="switch">'Should Reset Password' set?
            <label className="inline-switch right">
              No
              <input type="checkbox" onChange={this.handleReset} />
              <span className="lever" />
              Yes
            </label>
          </li>
          <li className="switch">Is this user an admin?
            <label className="inline-switch right">
              No
              <input type="checkbox" onChange={this.handlePromotion} />
              <span className="lever" />
              Yes
            </label>
          </li>
          <li className="switch">Has this user been deleted?
            <label className="inline-switch right">
              No
              <input type="checkbox" onChange={this.handleDelete} />
              <span className="lever" />
              Yes
            </label>
          </li>
        </ul>
      </div>
    )
  }
}

export default AdminViewUser
