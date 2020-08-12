import React from 'react'
import {Link} from 'react-router-dom'
const orderid = require('order-id')('mysecret')

//need to add user (or guest) and items in cart to database

export default function CheckoutForm(props) {
  const {subtotal, tax, shipping, grandTotal, cart} = props
  let orderObj = {
    subtotal: subtotal * 100,
    tax: tax * 100000,
    shipping: shipping * 100,
    grandTotal: Math.round(grandTotal * 100),
    status: 'confirmed',
    orderNumber: orderid.generate()
  }

  function handleSubmit(e) {
    e.preventDefault()
  }

  return (
    <div id="orderForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" name="firstName" />
        <label htmlFor="lastName">Last Name:</label>
        <input type="text" name="lastName" />
        <label htmlFor="address">Address:</label>
        <input type="text" name="address" />
        <label htmlFor="phone">Phone Number:</label>
        <input type="text" name="phone" />
        <br />
        <br />
        <Link
          to={{
            pathname: '/confirmation',
            cart,
            orderObj
          }}
        >
          <button id="placeOrderBtn" type="submit">
            Place Order
          </button>
        </Link>
      </form>
    </div>
  )
}
