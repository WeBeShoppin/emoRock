import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {me} from '../store/user'
import SingleUser from './singleUser'
import AdminTools from './adminTools'

/**
 * COMPONENT
 */

export const UserHome = () => {
  const dispatch = useDispatch()
  const loadUser = () => {
    dispatch(me())
  }

  useEffect(() => {
    loadUser()
  }, [])

  const user = useSelector(state => state.user)
  const isAdmin = useSelector(state => state.user.isAdmin)

  return (
    <div>
      <div>
        <h1>Welcome, {user.firstName}!</h1>
      </div>
      <div>
        <h3>Account Info:</h3>
        <SingleUser />
      </div>
      <div>{isAdmin && <AdminTools />}</div>
    </div>
  )
}

export default UserHome
