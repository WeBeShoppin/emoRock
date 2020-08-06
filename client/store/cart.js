import axios from 'axios'

/**
 * ACTION TYPES
 */
const ADD_TO_CART = 'ADD_TO_CART'

/**
 * INITIAL STATE
 */
const initialState = {
  items: [],
  total: 0
}

/**
 * ACTION CREATORS
 */

const addToCart = singleRock => ({
  type: ADD_TO_CART,
  singleRock
})

/**
 * THUNK CREATORS
 */

export const getCart = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/rocks/${id}`)
      dispatch(addToCart(data))
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
