// import axios from 'axios';

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addToCart = items => ({
  type: ADD_TO_CART,
  items
})

// THUNK CREATORS
export const getCartFromStorage = () => dispatch => {
  try {
    let cart = localStorage.getItem('cart')
    if (cart) {
      cart = JSON.parse(cart)
    } else {
      cart = []
    }
    dispatch(getCart(cart))
  } catch (err) {
    console.error(err.message)
  }
}

export const addItemToLocalStorage = rock => (dispatch, getState) => {
  try {
    let newRock = {}
    if (!rock.qty || rock.qty === 0) {
      newRock = {...rock, qty: 1}
    }

    let cart = getState().cart.items
    let addedItem = cart.find(r => r.id === rock.id)
    let addedItemIndex = cart.indexOf(r => r.id === rock.id)
    if (addedItem) {
      addedItem.qty += 1
      cart[addedItemIndex] = addedItem
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(addToCart(cart))
    } else {
      let newCart = [...cart]
      newCart.push(newRock)
      localStorage.setItem('cart', JSON.stringify(newCart))
      dispatch(addToCart(newCart))
    }
  } catch (err) {
    console.error(err.message)
  }
}

// INITIAL STATE
const initialState = {
  items: [],
  total: 0
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        items: action.cart
      }
    case ADD_TO_CART:
      return {
        ...state,
        items: action.items
      }
    default:
      return state
  }
}
