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
    const {data} = await axios.get('/api/users')
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
