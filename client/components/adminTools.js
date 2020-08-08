import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
// import UserList from './userList'

const AdminTools = () => {
  const isLoggedIn = useSelector(state => !!state.user.id)
  const isAdmin = useSelector(state => state.user.isAdmin)

  return (
    <div>
      {isAdmin && (
        <div>
          <h3>Administrator Tools:</h3>
          <Link to="../admin/users">All Users</Link>
          <p>Link to product tools</p>
        </div>
      )}
    </div>
  )
}

export default AdminTools
