import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products', () => {
  let productsTest

  beforeEach(() => {
    const products = [
      { id: 1, title: 'pirate', description: 'cutest pirate ever', priceInCents: 1599, quantity: 7 },
      { id: 2, title: 'hotDog', description: 'yummy dog', priceInCents: 1299, quantity: 5 }
    ] 
    productsTest = shallow(<Products products={products} />)
  })

  it('renders product in span', () => {
    expect(productsTest.find('div#product-1').length).to.be.equal(1)
    expect(productsTest.find('div#product-2').length).to.be.equal(1)
    expect(productsTest.find('div#product-77').length).to.be.equal(0)
  })
})
