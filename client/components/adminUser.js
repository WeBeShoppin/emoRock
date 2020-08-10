import React, {useEffect} from 'react'
import {adminGetUser, me} from '../store/user'
import {useDispatch, useSelector} from 'react-redux'

function AdminUser(props) {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const loadUser = id => {
    dispatch(adminGetUser(id))
  }

  useEffect(
    () => {
      loadUser(props.match.params.userId)
    },
    [props.match.params.userId]
  )
  return (
    <div id="user">
      <h1>Name: {user.email}</h1>
      <p>edit form goes here</p>
    </div>
  )
}

export default AdminUser
