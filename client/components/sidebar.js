import React from 'react'
import Category from './category'

const Sidebar = (props) => {
  const { categories } = props
  return (
    <div className="sidebar">
      <div className="sidebar-header">Categories</div>
      <ul>
        {categories.map(category => {
          return <Category key={category.id} category={category} />
        })}
      </ul>
    </div>
  )
}

export default Sidebar
