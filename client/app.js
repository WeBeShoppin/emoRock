import React from 'react'

import {Navbar, Footer, RockCarousel} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <RockCarousel />
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
