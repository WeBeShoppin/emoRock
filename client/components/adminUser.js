import React from 'react'

function AdminUser(props) {
  const user = props.location.state.user

  return (
    <div id="user">
      <h1>Name: {user.email}</h1>
      <p>edit form goes here</p>
    </div>
  )
}

export default AdminUser
