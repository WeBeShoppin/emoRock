import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SINGLE_ROCK = 'SET_SINGLE_ROCK'

/**
 * INITIAL STATE
 */
const initialState = {}

/**
 * ACTION CREATORS
 */

const setSingleRock = singleRock => ({
  type: SET_SINGLE_ROCK,
  singleRock
})

/**
 * THUNK CREATORS
 */

export const getSingleRock = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/rocks/${id}`)
      dispatch(setSingleRock(data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_ROCK:
      return action.singleRock
    default:
      return state
  }
}
