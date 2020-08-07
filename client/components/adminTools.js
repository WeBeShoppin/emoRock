import React from 'react'
// import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const AdminTools = () => {
  const isLoggedIn = useSelector(state => !!state.user.id)
  const isAdmin = useSelector(state => state.user.isAdmin)

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div>
          <p>Link to user list</p>
          <p>Link to product tools</p>
        </div>
      ) : (
        <div>
          <p>..</p>
        </div>
      )}
    </div>
  )
}

export default AdminTools
