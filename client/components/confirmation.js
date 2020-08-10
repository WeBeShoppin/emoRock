import React from 'react'

export default function Confirmation(props) {
  console.log(props.location)
  const order = props.location.orderObj
  const cart = props.location.cart
  const items = cart.map(item => <li key={item.id}>{item.name}</li>)
  return (
    <div id="confirmation">
      <h1>Thank You!</h1>
      <h3>
        Your order #{order.orderId
          ? order.orderId
          : 'Warning: no order Number. Contact Customer service at support@emorocks.com'}{' '}
        has been placed
      </h3>
      <hr />
      <h2>Order Summary</h2>
      <p>Total: {order.grandTotal / 100}</p>
      Items: <br />
      <ul>{items}</ul>
    </div>
  )
}
