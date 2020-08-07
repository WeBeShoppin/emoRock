import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <Navbar />
        <Routes />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
