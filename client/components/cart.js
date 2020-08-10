import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartFromStorage, addItemToLocalStorage} from '../store/cart'

function Cart() {
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const loadCart = () => {
    dispatch(getCartFromStorage())
  }

  useEffect(() => {
    loadCart()
  }, [])

  const handleAddBtn = item => {
    dispatch(addItemToLocalStorage(item))
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
      <div className="cart-list">
        {cart.items.length === 0 ? (
          <p>No Items</p>
        ) : (
          cart.items.map(item => (
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
                <span>{item.name}</span>
                <span>{item.summary}</span>
                <span>{item.description}</span>
              </div>

              <div className="quantity">
                <button
                  className="plus-btn"
                  type="button"
                  onClick={() => handleAddBtn(item)}
                >
                  <img src="https://www.svgrepo.com/show/135110/plus.svg" />
                </button>
                <input type="text" name="name" value={item.qty} />
                <button className="minus-btn" type="button">
                  <img src="https://www.svgrepo.com/show/201922/minus.svg" />
                </button>
              </div>
              <div className="total-price">Total: 0</div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Cart
