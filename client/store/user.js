import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USER_ADMIN_VIEW = 'GET_USER_ADMIN_VIEW'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({
  type: GET_USER,
  user
})

const getUserAdminView = userAV => ({
  type: GET_USER_ADMIN_VIEW,
  userAV
})

const removeUser = () => ({
  type: REMOVE_USER
})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (credentials, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, credentials)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const adminGetUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      dispatch(getUserAdminView(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case GET_USER_ADMIN_VIEW:
      return action.userAV
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
