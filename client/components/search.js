import React from 'react'
import { connect } from 'react-redux'
import { changeSearchTerm } from '../store/search-term'

const Search = (props) => {
  const { handleChange } = props
  return (
    <div className="input-field">
      <i className="material-icons prefix">search</i>
      <input id="search" type="text" onChange={handleChange} />
      <label htmlFor="search">Search</label>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: (event) => {
      dispatch(changeSearchTerm(event.target.value))
    }
  }
}

export default connect(null, mapDispatchToProps)(Search)

