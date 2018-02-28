import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar } from './components'
import Routes from './routes'
import { fetchProducts } from './store/products'


class App extends Component {

  componentDidMount() {
    this.props.allProducts()
  }


  render() {

    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  allProducts: () => dispatch(fetchProducts())
})


export default connect(null, mapDispatchToProps)(App)
