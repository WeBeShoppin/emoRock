import React from 'react'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {useSelector, useDispatch} from 'react-redux'

const Navbar = () => {
  const isLoggedIn = useSelector(state => !!state.user.id)
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      <nav>
        {isLoggedIn ? (
          <div className="nav">
            {/* The navbar will show these links after you log in */}
            <div id="logo">
              <Link to="/home">
                <img src="/EmoRocksLogo.png" height="75px" />
              </Link>
            </div>
            <div id="shopAll">
              <Link to="/rocks">SHOP ALL ROCKS</Link>
            </div>
            <Link to="/myAccount">My Account</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div className="nav">
            {/* The navbar will show these links before you log in */}
            <div id="logo">
              <Link to="/home">
                <img src="/EmoRocksLogo.png" height="75px" />
              </Link>
            </div>
            <div id="shopAll">
              <Link to="/rocks">SHOP ALL ROCKS</Link>
            </div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
