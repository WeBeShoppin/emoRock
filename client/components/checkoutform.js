import React from 'react'
import {Link} from 'react-router-dom'
import {newOrder} from '../store/orders'
import {useDispatch} from 'react-redux'

//need to add user (or guest) and items in cart to database

export default function CheckoutForm(props) {
  const {subtotal, tax, shipping, grandTotal, cart} = props
  let orderObj = {
    subtotal: subtotal * 100,
    tax: tax * 100000,
    shipping: shipping * 100,
    grandTotal: Math.round(grandTotal * 100),
    status: 'confirmed'
  }
  const dispatch = useDispatch()

  function handleChange() {
    console.log(props)
  }

  function handleSubmit(e) {
    e.preventDefault()
    //const firstName = evt.target.firstName.value
    console.log(props)
    dispatch(newOrder(orderObj))
  }

  return (
    <div id="orderForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          name="firstName"
          //value={state.lastName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          name="lastName"
          //value={state.lastName}
          onChange={handleChange}
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          name="address"
          //value={state.address}
          onChange={handleChange}
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          name="phone"
          //value={state.phone}
          onChange={handleChange}
        />
        <Link
          to={{
            pathname: '/confirmation',
            cart,
            orderObj
          }}
        >
          <button type="submit">Place Order</button>
        </Link>
      </form>
    </div>
  )
}
