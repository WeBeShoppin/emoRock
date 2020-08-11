import React from 'react'

export default function Confirmation(props) {
  console.log(props.location)
  const order = props.location.orderObj
  const cart = props.location.cart
  const items = cart.map(item => <p key={item.id}>{item.name}</p>)
  return (
    <div id="confirmation">
      <h1>Thank You!</h1>
      <h3>Your order #{order.orderId} has been placed</h3>
      <hr />
      <h2>Order Summary</h2>
      <p>Total: {order.grandTotal / 100}</p>
      Items: <br />
      {items}
      <hr />
      <p>Problems? Contact Customer service at support@emorocks.com </p>
    </div>
  )
}
