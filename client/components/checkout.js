import React from 'react'
import CheckoutForm from './checkoutform'
import {useSelector} from 'react-redux'
import history from '../history'

function Checkout() {
  let cart = useSelector(state => state.cart.items)
  console.log(cart)

  let prices = cart.map(item => item.price * item.qty)
  let subtotal = prices.reduce((acc, current) => acc + current, 0)
  let taxPercent = 0.08875
  let tax = 1.08875
  let shipping = 999
  let grandTotal = Math.round(subtotal * tax + shipping) / 100

  return (
    <div id="checkoutDiv">
      <h1 text-align="center">Checkout</h1>
      <div id="orderItems">
        {cart.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price / 100}</p>
            <p>Quantity: {item.qty}</p>
            <p>Total: ${item.price * item.qty / 100}</p>
          </div>
        ))}
      </div>
      <div id="checkoutSummary">
        <CheckoutForm
          subtotal={subtotal}
          tax={taxPercent}
          shipping={shipping}
          //discount={discount}
          grandTotal={grandTotal}
          cart={cart}
          history={history}
        />
        <div id="bill">
          <h2>Order Summary</h2>
          <hr />
          <p>Subtotal: {subtotal / 100}</p>
          <p>Tax: {Math.round(subtotal * taxPercent) / 100}</p>
          <p>Ground Shipping: Flat Rate 9.99</p>
          <p>Grand Total: {grandTotal}</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
