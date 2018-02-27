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
    productsTest = shallow(<UserHome email={'cody@email.com'} />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})