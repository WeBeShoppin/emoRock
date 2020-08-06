import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

const props = [
  {
    id: 1,
    name: 'Grape Soda Lupine',
    slug: 'Minb-Fzlf',
    summary: 'Grass-roots heuristic standardization',
    description: 'reintermediate visionary experiences',
    price: 50718,
    category: 'Fear',
    color: 'Crimson',
    inventory: 59,
    status: 'inStock',
    orderId: 85
  },
  {
    id: 2,
    name: 'Crabseye Lichen',
    slug: 'Oduw-Qvwk',
    summary: 'Versatile 4th generation approach',
    description: 'synergize interactive markets',
    price: 88064,
    category: 'Enjoyment',
    color: 'Blue',
    inventory: 90,
    status: 'lowSupply',
    orderId: 10
  }
]

function Cart(props) {
  const [cart, setCart] = useState([])

  return (
    <div>
      <ul>{cart.map(item => <li key={item.id}>{item}</li>)}</ul>
    </div>
  )
}

export default Cart
