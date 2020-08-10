import React, {useEffect} from 'react'
import {getAllUsers} from '../store/users'
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

function UserList() {
  const isAdmin = useSelector(state => state.user.isAdmin)

  const dispatch = useDispatch()

  const loadAllUsers = () => {
    dispatch(getAllUsers())
  }

  useEffect(() => {
    loadAllUsers()
  }, [])

  const users = useSelector(state => state.users)

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
