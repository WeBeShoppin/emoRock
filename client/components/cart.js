import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

function Cart() {
  let localStorage = window.localStorage.cart
  let cart = []

  // so we don't get an error with JSON.parse when there is nothing in the cart
  if (localStorage) {
    cart = JSON.parse(window.localStorage.cart)
  }

  function removeFromCart(itemId) {
    return null
  }

  return (
    <div>
      <ul>
        {cart.map(item => (
          <div key={item.id}>
            <li>
              Name: {item.name} --- Qty: {item.qty}
              <span>
                <button type="button" onClick={() => removeFromCart(item.id)}>
                  X
                </button>
              </span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Cart
