import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ROCKS = 'GET_ROCKS'

/**
 * INITIAL STATE
 */
const initialState = []

/**
 * ACTION CREATORS
 */

const setAllRocks = rocks => ({
  type: GET_ROCKS,
  rocks
})

/**
 * THUNK CREATORS
 */

export const getAllRocks = () => async dispatch => {
  try {
    const res = await axios.get('/api/rocks')
    dispatch(setAllRocks(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROCKS:
      return action.rocks
    default:
      return state
  }
}
