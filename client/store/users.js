import axios from 'axios'
import user from './user'

/**
 * ACTION TYPES
 */
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const setAllUsers = users => ({
  type: GET_USERS,
  users
})

/**
 * THUNK CREATORS
 */

export const getAllUsers = () => async dispatch => {
  try {
    console.log('before test if admin')
    // if (user.isAdmin) {
    console.log('after if statement')
    const {data} = await axios.get('/api/users')
    console.log('after axios request')
    dispatch(setAllUsers(data))
    // }
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
