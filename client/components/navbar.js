import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {useSelector, useDispatch} from 'react-redux'

import {
  PersonIcon,
  FavoriteBorderIcon,
  ShoppingCartOutlinedIcon,
  HomeIcon
} from '@material-ui/icons'
//import { Button, Menu, MenuItem } from '@material-ui/core'

const Navbar = () => {
  const isLoggedIn = useSelector(state => ({isLoggedIn: !!state.user.id}))
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>emoRocks</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/home">{HomeIcon}</Link>
            <Link to="/myAccount">{PersonIcon}</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>

            {/* <Button aria-controls="fade-menu" aria-haspopup="true" onClick = {handleClick}>{PersonIcon}</Button>
          <Menu
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            TransitionComponent={Fade}
            >
            <MenuItem onClick={handleClose}><Link to='/myAccount'>My account</Link></MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu> */}

            <Link to="/wishList">{FavoriteBorderIcon}</Link>
            <Link to="/cart">{ShoppingCartOutlinedIcon}</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">{ShoppingCartOutlinedIcon}</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
}
