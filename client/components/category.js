import React from 'react'
import { connect } from 'react-redux'
import { addActiveCategory, removeActiveCategory } from '../store'

const Category = (props) => {
  const { category, activeCategories, handleToggle } = props
  const active = !!activeCategories.find(catId => catId === category.id)
  const activeClass = active ? 'active-category' : 'inactive-category'

  return (
    <li className={activeClass} onClick={() => handleToggle(active, category)}>
      {category.label}
    </li>
  )
}

const mapStateToProps = function (state) {
  return {
    activeCategories: state.activeCategories
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    handleToggle (active, category) {
      if (active) dispatch(removeActiveCategory(category))
      else dispatch(addActiveCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category)
