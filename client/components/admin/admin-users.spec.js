// import { expect } from 'chai'
// import React from 'react'
// import AdminUsers from './admin-users'

// import enzyme, { shallow } from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'

// const adapter = new Adapter()
// enzyme.configure({ adapter })

// describe('<AdminUsers /> list all', () => {
//   let users = []
//   let testUserAdmin = {}

//   beforeEach(() => {
//     users = [
//       { id: 1, email: 'aurora@example.com', isAdmin: true },
//       { id: 2, email: 'vaida@example.com', isAdmin: true },
//       { id: 3, email: 'pokey@example.com', isAdmin: false },
//     ]
//     testUserAdmin = shallow(<AdminUsers users={users} />)
//   })

//   describe('renders a list of users', () => {
//     it('with a <div> that has the correct id attribute', () => {
//       expect(testUserAdmin.find('div#user-1').length).to.be.equal(1)
//       expect(testUserAdmin.find('div#user-2').length).to.be.equal(1)
//       expect(testUserAdmin.find('div#user-3').length).to.be.equal(1)
//       expect(testUserAdmin.find('div#user-77').length).to.be.equal(0)
//     })
//     xit('with the email of the user')
//   })
// })
