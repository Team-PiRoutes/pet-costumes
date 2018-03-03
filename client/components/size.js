import React from 'react'
import { connect } from 'react-redux'
import { addActiveSize, removeActiveSize } from '../store'

const Size = (props) => {
  const { size, activeSizes, handleToggle } = props
  const active = !!activeSizes.find(activeSize => activeSize === size)
  const activeClass = active ? 'active-size' : 'inactive-size'

  return (
    <li className={activeClass} onClick={() => handleToggle(active, size)}>
      {size}
    </li>
  )
}

const mapStateToProps = function (state) {
  return {
    activeSizes: state.activeSizes
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    handleToggle (active, category) {
      if (active) dispatch(removeActiveSize(category))
      else dispatch(addActiveSize(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Size)
