import { filterByCategories, filterBySizes } from './products'
import { expect } from 'chai'


describe('filterByCategories', () => {
  let products = []

  beforeEach(() => {
    products = [
      {id: 1, name: 'pirate', categories: [ { id: 1 }, { id: 2 } ]},
      {id: 2, name: 'hotdog', categories: [ { id: 1 } ]},
      {id: 3, name: 'wonderkitty', categories: [ { id: 2 } ]},
    ]
  })
  it('should return all products if activeCategories is empty', () => {
    const filteredProducts = filterByCategories(products, [])
    expect(filteredProducts).to.be.deep.equal(products)
  })

  it('should only return products which match all categories in active categories', () => {
    const filteredProducts1 = filterByCategories(products, [1])
    expect(filteredProducts1).to.be.deep.equal([
      {id: 1, name: 'pirate', categories: [ { id: 1 }, { id: 2 } ]},
      {id: 2, name: 'hotdog', categories: [ { id: 1 } ]}
    ])
    const filteredProducts3 = filterByCategories(products, [2])
    expect(filteredProducts3).to.be.deep.equal([
      {id: 1, name: 'pirate', categories: [ { id: 1 }, { id: 2 } ]},
      {id: 3, name: 'wonderkitty', categories: [ { id: 2 } ]},
    ])
  })

  it('should only return products which match all in activeCategories', () => {
    const filteredProducts2 = filterByCategories(products, [1, 2])
    expect(filteredProducts2).to.be.deep.equal([
      {id: 1, name: 'pirate', categories: [ { id: 1 }, { id: 2 } ]},
    ])
  })

  it('not return any products if any of the activeCategories have no products', () => {
    const filteredProducts4 = filterByCategories(products, [1, 2, 3])
    expect(filteredProducts4).to.be.deep.equal([])
  })

})

describe('filterBySizes', () => {
  let products = []

  beforeEach(() => {
    products = [
      {id: 1, name: 'pirate', size: 'S'},
      {id: 2, name: 'hotdog', size: 'L'},
      {id: 3, name: 'wonderkitty', size: 'XXL'},
    ]
  })

  it('should return all products if activeSizes is empty', () => {
    const filteredProducts = filterBySizes(products, [])
    expect(filteredProducts).to.be.deep.equal(products)
  })

  it('should return any products which match any of the sizes in activeSizes', () => {
    const filteredProducts1 = filterBySizes(products, ['S'])
    expect(filteredProducts1).to.be.deep.equal([
      {id: 1, name: 'pirate', size: 'S'}
    ])
  })

  it('should return some products even if there are none of one of the activeSizes', () => {
    const filteredProducts2 = filterBySizes(products, ['S', 'M'])
    expect(filteredProducts2).to.be.deep.equal([
      {id: 1, name: 'pirate', size: 'S'}
    ])
  })

  it('should return no products if there are none matching any of the sizes in activeSizes', () => {
    const filteredProducts3 = filterBySizes(products, ['XS', 'M', 'XL'])
    expect(filteredProducts3).to.be.deep.equal([])
  })
})
