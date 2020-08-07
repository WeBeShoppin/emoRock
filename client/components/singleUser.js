import React, {useEffect} from 'react'
import {me} from '../store/user'
import {useDispatch, useSelector} from 'react-redux'

function SingleUser() {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const loadUser = () => {
    dispatch(me())
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <div id="singleUser">
      <h1>First Name: {user.firstName}</h1>
      <p>Last Name: {user.lastName}</p>
    </div>
  )
}

export default SingleUser
