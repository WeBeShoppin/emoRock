import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

function Cart() {
  let localStorage = window.localStorage.cart
  let cart = []

  // so we don't get an error with JSON.parse when there is nothing in the cart
  if (localStorage) {
    cart = JSON.parse(window.localStorage.cart)
  }

  function minusItem(itemId) {
    return null
  }

  function deleteItem(itemId) {
    return null
  }

  return (
    <div className="shopping-cart">
      <div className="shopping-title">Your Cart</div>
      {cart.map(item => (
        <div className="item" key={item.id}>
          <div className="buttons">
            <button
              className="delete-btn"
              type="button"
              onClick={() => deleteItem(item.id)}
            >
              X
            </button>
          </div>

          <div className="image">
            <img src="https://cdn.shoplightspeed.com/shops/623692/files/15032482/156x230x2/igneous-theory-pet-rock-craft-kit.jpg" />
          </div>

          <div className="description">
            <span>{item.summary}</span>
            <span>{item.description}</span>
          </div>

          <div className="quantity">
            <button className="plus-btn" type="button">
              <img src="https://www.svgrepo.com/show/135110/plus.svg" />
            </button>
            <input type="text" name="name" value={item.qty} />
            <button className="minus-btn" type="button">
              <img src="https://www.svgrepo.com/show/217/minus.svg" />
            </button>
          </div>
          <div className="total-price">Total: 0</div>
        </div>
      ))}
    </div>
  )
}

export default Cart
