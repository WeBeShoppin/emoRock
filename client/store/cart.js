/* eslint-disable complexity */
/* eslint-disable max-statements */
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
export const fetchCart = () => async dispatch => {
  try {
    let cart = []
    let {data: user} = await axios.get('/auth/me')
    if (!user) {
      cart = localStorage.getItem('cart')
      if (cart.length !== 0) {
        cart = JSON.parse(cart)
      }
    } else {
      const res = await axios.get(`/api/users/${user.id}/cart`)
      // cart coming from database does not look like stata
      // loop through response from database to contruct proper cart
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i]
          let rockForCart = {...item.rock, qty: item.quantity}
          cart.push(rockForCart)
        }
      }
    }
    dispatch(getCart(cart))
  } catch (err) {
    console.error(err.message)
  }
}

export const addItemToLocalStorage = rock => async (dispatch, getState) => {
  try {
    let {data: user} = await axios.get('/auth/me')
    let newRock = {}
    if (!rock.qty) {
      newRock = {...rock, qty: 1}
    }

    let cart = []
    if (!user) {
      cart = getState().cart.items
    } else {
      const res = await axios.get(`/api/users/${user.id}/cart`)
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          let item = res.data[i]
          let rockForCart = {...item.rock, qty: item.quantity}
          cart.push(rockForCart)
        }
      }
    }

    let addedItem = cart.find(r => r.id === rock.id)
    let addedItemIndex = cart.findIndex(r => r.id === rock.id)

    // if item is not new in cart
    if (addedItem) {
      addedItem.qty += 1
      cart[addedItemIndex] = addedItem
      // if user is not logged in use localStorage
      if (!user) {
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch(addToCart(cart))
        //else user is logged in so use database
      } else {
        await axios.put(`/api/users/${user.id}/cart`, addedItem)
        dispatch(addToCart(cart))
      }
    } else {
      let newCart = [...cart]
      newCart.push(newRock)
      if (!user) {
        localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch(addToCart(newCart))
      } else {
        await axios.post(`/api/users/${user.id}/cart`, newRock)
        dispatch(addToCart(newRock))
      }
    }
  } catch (err) {
    console.error(err.message)
  }
}

export const deleteItemFromLocalStorage = itemId => async (
  dispatch,
  getState
) => {
  try {
    let {data: user} = await axios.get('/auth/me')
    const cart = getState().cart.items
    let cartWithoutItem = cart.filter(item => item.id !== itemId)
    if (!user) {
      localStorage.setItem('cart', JSON.stringify(cartWithoutItem))
      dispatch(deleteItem(cartWithoutItem))
    } else {
      await axios.delete(`/api/users/${user.id}/cart`, {data: {rockId: itemId}})
      dispatch(deleteItem(cartWithoutItem))
    }
  } catch (err) {
    console.error(err.message)
  }
}

export const decreaseItemQty = item => async (dispatch, getState) => {
  try {
    let {data: user} = await axios.get('/auth/me')

    let cart = []
    if (!user) {
      cart = getState().cart.items
    } else {
      const res = await axios.get(`/api/users/${user.id}/cart`)
      if (res) {
        for (let i = 0; i < res.data.length; i++) {
          let element = res.data[i]
          let rockForCart = {...element.rock, qty: element.quantity}
          cart.push(rockForCart)
        }
      }
    }

    let itemIndex = cart.findIndex(r => r.id === item.id)
    console.log('item index', itemIndex)

    if (item.qty > 1) {
      item.qty -= 1
      cart[itemIndex] = item
      if (!user) {
        localStorage.setItem('cart', JSON.stringify(cart))
        dispatch(decrementItemQty(cart))
      } else {
        console.log('item', item)
        await axios.put(`/api/users/${user.id}/cart`, item)
        dispatch(decrementItemQty(cart))
      }
    } else {
      let newCart = cart.filter(r => r.id !== item.id)
      if (!user) {
        localStorage.setItem('cart', JSON.stringify(newCart))
        dispatch(decrementItemQty(newCart))
      } else {
        await axios.delete(`/api/users/${user.id}/cart`, {
          data: {rockId: item.id}
        })
        dispatch(decrementItemQty(newCart))
      }
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

// HELPER FUNCTION

const totalPrice = cartItems => {
  return cartItems.reduce((sum, p) => sum + p.price * p.qty, 0)
}

// REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CART: {
      let cartTotal = totalPrice(action.cart)
      return {
        ...state,
        items: action.cart,
        total: cartTotal / 100
      }
    }
    case ADD_TO_CART: {
      let addedTotal = totalPrice(action.items)
      return {
        ...state,
        items: action.items,
        total: addedTotal / 100
      }
    }
    case DELETE_ITEM: {
      let deletedTotal = totalPrice(action.cartWithOutItem)
      return {
        ...state,
        items: action.cartWithOutItem,
        total: deletedTotal / 100
      }
    }
    case DECREMENT_ITEM_QTY: {
      let decreasedTotal = totalPrice(action.items)
      return {
        ...state,
        items: action.items,
        total: decreasedTotal / 100
      }
    }
    default:
      return state
  }
}
