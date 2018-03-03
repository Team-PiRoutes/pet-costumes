import React from 'react'
import Category from './category'
import Size from './size'

const Sidebar = (props) => {
  const { categories, sizes } = props

  return (
    <div className="sidebar">
      <div className="sidebar-header">Categories</div>
      <ul>
        {categories.map(category => {
          return <Category key={`category-${category.id}`} category={category} />
        })}
      </ul>
      <div className="sidebar-header">Sizes</div>
      <ul>
        {sizes.map(size => {
          return <Size key={`size-${size}`} size={size} />
        })}
      </ul>
    </div>
  )
}

export default Sidebar
