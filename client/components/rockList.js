import React, {useEffect, useState} from 'react'
import {getAllRocks} from '../store/rocks'
import {useDispatch, useSelector} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'

function RockList() {
  const rocks = useSelector(state => state.rocks)
  const [cart, setCart] = useState([])
  const dispatch = useDispatch()

  const loadAllRocks = () => {
    dispatch(getAllRocks())
  }

  function addToCart(product) {
    if (cart.length <= 0) setCart([...cart, product])
  }

  useEffect(() => {
    loadAllRocks()
  }, [])

  return (
    <div className="rockList">
      {rocks.map(rock => (
        <div className="eachRock" key={rock.id}>
          <Link to={`/rocks/${rock.id}`} component={SingleRock}>
            <p className="introduction">Rock name: {rock.name}</p>
          </Link>
          <button type="button" onClick={addToCart}>
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default RockList
