export const filterByCategories = (products, activeCategories) => {
  if (activeCategories.length === 0) return products

  return products.filter(product => {
    const productCatIds = product.categories.map(cat => cat.id)
    for (let i = 0; i < activeCategories.length; i++) {
      if (productCatIds.indexOf(activeCategories[i]) === -1) return false
    }
    return true
  })
}

export const filterBySizes = (products, activeSizes) => {
  if (activeSizes.length === 0) return products
  return products.filter(product => activeSizes.indexOf(product.size) !== -1)
}

export const filterByName = (products, searchTerm) => {
  searchTerm = searchTerm.toLowerCase()
  if (searchTerm.replace(/\s/g, '') === '') return products
  return products.filter(product => {
    return product.title.toLowerCase().indexOf(searchTerm) >= 0
  })
}

