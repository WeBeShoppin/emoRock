import React, {useEffect} from 'react'
import {getAllUsers} from '../store/users'
import {me} from '../store/user'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function UserList() {
  const isAdmin = useSelector(state => state.user.isAdmin)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()

  const loadAllUsers = () => {
    dispatch(getAllUsers())
  }

  const loadAdminStatus = () => {
    dispatch(me())
  }

  useEffect(() => {
    loadAdminStatus()
    loadAllUsers()
  }, [])

  return (
    <div>
      {isAdmin && (
        <div className="userList">
          {users.map(user => (
            <div className="eachUser" key={user.id}>
              <Link to={`/users/${user.id}`}>
                <p className="email">User email: {user.email}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserList
