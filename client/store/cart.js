import axios from 'axios'

// ACTION TYPES
const GET_CART = 'GET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const DECREMENT_ITEM_QTY = 'DECREMENT_ITEM_QTY'

// ACTION CREATORS
const getCart = cart => ({
  type: GET_CART,
  cart
})

const addToCart = items => ({
  type: ADD_TO_CART,
  items
})

const deleteItem = cartWithOutItem => ({
  type: DELETE_ITEM,
  cartWithOutItem
})

const decrementItemQty = items => ({
  type: DECREMENT_ITEM_QTY,
  items
})

// THUNK CREATORS
export const getCartFromStorage = loggedIn => async dispatch => {
  try {
    let cart
    if (loggedIn === false) {
      cart = localStorage.getItem('cart')
      if (cart) {
        cart = JSON.parse(cart)
      } else {
        cart = []
      }
    } else {
      const res = await axios.get('/api/users/cart')
      cart = res.data
    }
    dispatch(getCart(cart))
  } catch (err) {
    console.error(err.message)
  }
}

export const addItemToLocalStorage = (rock, loggedIn) => (
  dispatch,
  getState
) => {
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

export const deleteItemFromLocalStorage = (itemId, loggedIn) => (
  dispatch,
  getState
) => {
  try {
    const cart = getState().cart.items
    let cartWithoutItem = cart.filter(item => item.id !== itemId)
    localStorage.setItem('cart', JSON.stringify(cartWithoutItem))
    dispatch(deleteItem(cartWithoutItem))
  } catch (err) {
    console.error(err.message)
  }
}

export const decreaseItemQty = (item, loggedIn) => (dispatch, getState) => {
  try {
    let cart = getState().cart.items
    let itemIndex = cart.indexOf(r => r.id === item.id)
    if (item.qty > 1) {
      item.qty -= 1
      cart[itemIndex] = item
      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch(decrementItemQty(cart))
    } else {
      let newCart = cart.filter(r => r.id !== item.id)
      localStorage.setItem('cart', JSON.stringify(newCart))
      dispatch(decrementItemQty(newCart))
    }
  } catch (err) {
    console.error(err.message)
  }
}

// INITIAL STATE
const initialState = {
  items: [],
  total: 0,
  qty: 0
}

// HELPER FUNCTION

const totalPrice = cartItems => {
  return cartItems.reduce((sum, p) => sum + p.price * p.qty, 0)
}

const totalQty = cartItems => {
  return cartItems.reduce((sum, r) => sum + r.qty, 0)
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART: {
      let cartTotal = totalPrice(action.cart)
      let cartQtyTotal = totalQty(action.cart)
      return {
        ...state,
        items: action.cart,
        total: cartTotal / 100,
        qty: cartQtyTotal
      }
    }
    case ADD_TO_CART: {
      let addedTotal = totalPrice(action.items)
      let addedQtyTotal = totalQty(action.items)
      return {
        ...state,
        items: action.items,
        total: addedTotal / 100,
        qty: addedQtyTotal
      }
    }
    case DELETE_ITEM: {
      let deletedTotal = totalPrice(action.cartWithOutItem)
      let deletedQtyTotal = totalQty(action.cartWithOutItem)
      return {
        ...state,
        items: action.cartWithOutItem,
        total: deletedTotal / 100,
        qty: deletedQtyTotal
      }
    }
    case DECREMENT_ITEM_QTY: {
      let decreasedTotal = totalPrice(action.items)
      let decreasedQtyTotal = totalQty(action.items)
      return {
        ...state,
        items: action.items,
        total: decreasedTotal / 100,
        qty: decreasedQtyTotal
      }
    }
    default:
      return state
  }
}
