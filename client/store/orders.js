import axios from 'axios'

//ACTION TYPES

const ADD_ORDER = 'ADD_ORDER'

//INITIAL STATE
const initialState = {}

//ACTION CREATORS
const addOrder = order => ({
  type: ADD_ORDER,
  order
})

//THUNK CREATORS

export const newOrder = order => async dispatch => {
  try {
    const res = await axios.post('/api/orders', order)
    console.log(res.data)
    dispatch(addOrder(res.data))
  } catch (error) {
    console.error(error)
  }
}

//REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_ORDER:
      return action.order
    default:
      return state
  }
}
