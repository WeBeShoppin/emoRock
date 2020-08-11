import React, {useEffect} from 'react'
import {adminGetUser} from '../store/user'
import {useDispatch, useSelector} from 'react-redux'

function AdminUser(props) {
  const dispatch = useDispatch()
  const loadUser = id => {
    dispatch(adminGetUser(id))
  }

  useEffect(
    () => {
      loadUser(props.match.params.userId)
    },
    [props.match.params.userId]
  )

  const user = useSelector(state => state.user)

  return (
    <div id="user">
      <h1>Name: {user.email}</h1>
      <div className="form">
        <form name={name}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <br />
            <input name="firstName" type="text" value={user.firstName} />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" value={user.lastName} />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <br />
            <input name="email" type="text" value={user.email} />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <br />
            <input name="password" type="password" />
          </div>
          <div>
            <label htmlFor="phone">
              <small>Phone</small>
            </label>
            <br />
            <input name="phone" type="text" value={user.phone} />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <br />
            <input name="address" type="text" value={user.address} />
          </div>
          <div>
            <label htmlFor="isAdmin">
              <small>Administrator</small>
            </label>
            <br />
            <select id="idAdmin-select" defaultValue={user.isAdmin}>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div>
            <button type="update">Update my profile</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminUser
