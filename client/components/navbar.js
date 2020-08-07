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
                <img src="/EmoRocksLogo.png" height="100px" />
              </Link>
            </div>
            <Link to="/rocks">Shop All Rocks!!</Link>
            <Link to="/myAccount/{state.user.id}">MyAccount</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/wishList">Wish List</Link>
            <Link to="/cart">Cart</Link>
          </div>
        ) : (
          <div className="nav">
            {/* The navbar will show these links before you log in */}
            <div id="logo">
              <Link to="/home">
                <img src="/EmoRocksLogo.png" height="100px" />
              </Link>
            </div>
            <Link to="/rocks">Shop All Rocks!!</Link>
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
