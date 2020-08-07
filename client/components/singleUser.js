import React, {useEffect} from 'react'
import {me} from '../store/user'
import {useDispatch, useSelector} from 'react-redux'
import {Login} from './auth-form'

function SingleUser() {
  const user = useSelector(state => state.user)
  const isLoggedIn = useSelector(state => !!state.user.id)
  const dispatch = useDispatch()
  const loadUser = () => {
    dispatch(me())
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div>
      {isLoggedIn ? (
        <div id="singleUser">
          <h3>First Name: {user.firstName}</h3>
          <p>Last Name: {user.lastName}</p>
          <p>Account ID #: {user.id}</p>
          <p>Email: {user.email}</p>
          <br />
          <p>Address: {user.address}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ) : (
        <Login />
      )}
    </div>
  )
}

export default SingleUser
