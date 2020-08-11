import React, {useEffect} from 'react'
import {newOrder} from '../store/orders'
import {useDispatch} from 'react-redux'

export default function Confirmation(props) {
  const order = props.location.orderObj
  const cart = props.location.cart
  const items = cart.map(item => <p key={item.id}>{item.name}</p>)
  const dispatch = useDispatch()

  function addOrder() {
    console.log('Updated')
    localStorage.clear()
    console.log('after', localStorage.cart)
    dispatch(newOrder(order))
  }

  useEffect(() => addOrder())

  return (
    <div id="confirmation">
      <h1>Thank You!</h1>
      <h3>Your order #{order.orderNumber} has been placed</h3>
      <hr />
      <h2>Order Summary</h2>
      <p>Total: {order.grandTotal / 100}</p>
      Items: <br />
      {items ? items : 'No items in order'}
      <hr />
      <p>Problems? Contact Customer service at support@emorocks.com </p>
    </div>
  )
}
