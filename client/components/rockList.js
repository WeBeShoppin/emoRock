import React, {useEffect, useState} from 'react'
import {getAllRocks} from '../store/rocks'
import {useDispatch, useSelector} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'

function RockList() {
  const rocks = useSelector(state => state.rocks)
  const [cart, setCart] = useLocalStorage('cart', [])
  const dispatch = useDispatch()

  const loadAllRocks = () => {
    dispatch(getAllRocks())
  }

  function addToCart(product) {
    setCart([...cart, product])
    console.log('cart', cart)
    // let newCart = JSON.parse(window.localStorage.cart)
    console.log('parsed Cart', JSON.parse(window.localStorage.cart))
  }

  useEffect(() => {
    loadAllRocks()
  }, [])

  function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : initialValue
      } catch (error) {
        console.log(error)
        return initialValue
      }
    })

    const setValue = value => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.log(error)
      }
    }

    return [storedValue, setValue]
  }

  return (
    <div className="rockList">
      {rocks.map(rock => (
        <div className="eachRock" key={rock.id}>
          <Link to={`/rocks/${rock.id}`} component={SingleRock}>
            <p className="introduction">Rock name: {rock.name}</p>
          </Link>
          <button type="button" onClick={() => addToCart(rock)}>
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default RockList
