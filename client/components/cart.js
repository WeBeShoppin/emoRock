import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

function Cart() {
  let cart = JSON.parse(window.localStorage.cart)

  function removeFromCart(itemId) {
    return null
  }

  return (
    <div>
      <ul>
        {cart.map(item => (
          <div>
            <li key={item.id}>Name: {item.name}</li>
            <button onClick={() => removeFromCart(item.id)}>X</button>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Cart
