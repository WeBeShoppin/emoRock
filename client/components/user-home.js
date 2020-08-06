import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {me} from '../store/user'

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

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
    </div>
  )
}

export default UserHome
