import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {changeUser} from '../store/user'

function AdminUser(props) {
  const user = props.location.state.user
  const dispatch = useDispatch()
  const updateUser = (userId, user) => {
    dispatch(changeUser(userId, user))
  }

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone)
  const [address, setAddress] = useState(user.address)
  const [isAdmin, setIsAdmin] = useState(user.isAdmin)

  const handleSubmit = event => {
    event.preventDefault()

    try {
      updateUser(user.id, {firstName, lastName, email, phone, address, isAdmin})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="user">
      <h1>Name: {user.email}</h1>
      <div className="form">
        <form name={name} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <br />
            <input
              name="firstName"
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <br />
            <input
              name="lastName"
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <br />
            <input
              name="email"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="phone">
              <small>Phone</small>
            </label>
            <br />
            <input
              name="phone"
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <br />
            <input
              name="address"
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="isAdmin">
              <small>Administrator</small>
            </label>
            <br />
            <select
              id="idAdmin-select"
              defaultValue={isAdmin}
              onChange={e => setIsAdmin(e.target.value)}
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div>
            {/* eslint-disable-next-line react/button-has-type */}
            <button type="submit">Update my profile</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminUser
