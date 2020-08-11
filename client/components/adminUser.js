import React, {useEffect} from 'react'
import {adminGetUser} from '../store/user'
import {useDispatch, useSelector} from 'react-redux'

function AdminUser(props) {
  const dispatch = useDispatch()
  const loadUser = id => {
    dispatch(adminGetUser(id))
  }
  console.log('props', props)

  useEffect(
    () => {
      loadUser(props.match.params.userId)
    },
    [props.match.params.userId]
  )

  // const user = useSelector(state => state.user)
  return (
    <div id="user">
      {/* <h1>Name: {user.email}</h1> */}
      <p>edit form goes here</p>
    </div>
  )
}

export default AdminUser
