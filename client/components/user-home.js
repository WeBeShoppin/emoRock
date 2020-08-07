import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {me} from '../store/user'
import SingleUser from './singleUser'

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
      <div>
        <h3>Welcome, {user.firstName}!</h3>
      </div>
      <div>
        <h3>Account Info:</h3>
        <SingleUser />
      </div>
      <div>Link goes here for user to EDIT their account details</div>
      <div>Link goes here for user to view history (?)</div>
    </div>
  )
}

export default UserHome
