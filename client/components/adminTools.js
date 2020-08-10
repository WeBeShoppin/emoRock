import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AdminTools = () => {
  const isAdmin = useSelector(state => state.user.isAdmin)

  return (
    <div>
      {isAdmin && (
        <div>
          <h3>Administrator Tools:</h3>
          <Link to="/users">All Users</Link>
          <p>Link to product tools</p>
        </div>
      )}
    </div>
  )
}

export default AdminTools
