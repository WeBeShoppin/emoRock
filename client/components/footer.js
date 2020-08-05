import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <nav>
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/contactUs">Contact Us</Link>
          <Link to="/PrivacyAndTerms">Privacy and Terms</Link>
          <Link to="/support">Support</Link>
          <Link to="/joinUs">Join Us</Link>
        </div>
      </nav>
      <hr />
    </div>
  )
}

export default Footer
