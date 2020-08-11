import React from 'react'
import {useDispatch} from 'react-redux'
import {changeAdmin} from '../store/user'

function AdminUser(props) {
  const user = props.location.state.user
  const admin = user.isAdmin
  const [isAdmin, setIsAdmin] = React.useState(admin)
  const dispatch = useDispatch()
  const makeAdmin = () => {
    dispatch(changeAdmin(user.userId))
  }

  const handleClick = () => {
    makeAdmin()
    setIsAdmin(!admin)
    console.log('testing click')
    console.log('user admin status', admin)
  }
  console.log('user before click', user)
  return (
    <div id="user">
      <h1>Name: {user.email}</h1>
      <label>Make {admin ? 'regular user:' : 'admin:'}</label>
      {/* eslint-disable-next-line react/button-has-type*/}
      <button onClick={handleClick}>Toggle Admin</button>
      <p>edit form goes here</p>
    </div>
  )
}

export default AdminUser
