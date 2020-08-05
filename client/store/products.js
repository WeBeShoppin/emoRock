import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */
const products = []

/**
 * ACTION CREATORS
 */

const setAllProducts = products => ({
  type: GET_PRODUCTS,
  products
})

/**
 * THUNK CREATORS
 */

export const getAllProducts = () => async dispatch => {
  try {
    const res = await axios.get('/api/rocks')
    dispatch(setAllProducts(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */

export default function(state = products, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
