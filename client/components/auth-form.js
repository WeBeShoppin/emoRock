import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const LogInForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatchForLogIn = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const credentials = {email, password}
      dispatch(auth(credentials, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatchForLogIn)(LogInForm)

const SignUpForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="form">
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="firstName">
            <small>First Name *</small>
          </label>
          <br />
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <br />
          <input name="lastName" type="text" />
        </div>
        <div>
          <label htmlFor="email">
            <small>Email *</small>
          </label>
          <br />
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password *</small>
          </label>
          <br />
          <input name="password" type="password" />
        </div>
        <div>
          <label htmlFor="phone">
            <small>Phone</small>
          </label>
          <br />
          <input name="phone" type="text" />
        </div>
        <div>
          <label htmlFor="address">
            <small>Address</small>
          </label>
          <br />
          <input name="address" type="text" />
        </div>
        <div>
          <button type="submit">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
      <a href="/auth/google">{displayName} with Google</a>
    </div>
  )
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchForSignUp = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const phone = evt.target.phone.value
      const address = evt.target.address.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      const credentials = {firstName, lastName, phone, address, email, password}
      dispatch(auth(credentials, formName))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatchForSignUp)(SignUpForm)

/**
 * PROP TYPES
 */
SignUpForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

LogInForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
