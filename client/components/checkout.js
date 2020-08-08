import React from 'react'
import CheckoutForm from './checkoutform'

function Checkout(props) {
  let cart = props.location.state.cart
  let prices = cart.map(item => item.price)
  let subtotal = prices.reduce((acc, current) => acc + current)
  let taxPercent = 0.08775
  let tax = 1.08875
  //let shipping = 9.99
  let grandTotal = Math.round(subtotal * tax) / 100 //+ shipping
  console.log('subtotal', subtotal)
  console.log('grand total', grandTotal)
  return (
    <div id="checkoutDiv">
      <h1>Checkout</h1>
      <div id="orderItems">
        {cart.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: {item.price / 100}</p>
            {/* <p>Quantity: {item.quantity}</p> */}
          </div>
        ))}
      </div>
      <div id="bill">
        <h2>Order Summary</h2>
        <p>Subtotal: {subtotal / 100}</p>
        <p>Tax: {Math.round(subtotal * taxPercent) / 100}</p>
        <p>Ground Shipping: Flat Rate 9.99</p>
        <p>Grand Total: {grandTotal}</p>
      </div>
      <p>Sorry! We are currently only accepting orders from NYC</p>
      <CheckoutForm />
    </div>
  )
}

export default Checkout