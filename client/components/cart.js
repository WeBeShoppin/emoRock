import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

function Cart() {
  let cart = JSON.parse(window.localStorage.cart)

  function removeFromCart(itemId) {
    return null
  }

  return (
    <div>
      <ul>
        {cart.map(item => (
          <div key={item.id}>
            <li>Name: {item.name}</li>
            <button onClick={() => removeFromCart(item.id)}>X</button>
          </div>
        ))}
      </ul>
      <Link to={{pathname: '/checkout', state: {cart}}}>
        <button type="button">Checkout</button>
      </Link>
    </div>
  )
}

export default Cart
