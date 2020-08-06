import React from 'react'

import {Navbar, Footer, RockList} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
