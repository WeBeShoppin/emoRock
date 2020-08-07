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

  function addToCart(rock) {
    // if qty property does not exist then the item wasn't added to cart yet
    let newRock = {}
    if (!rock.qty || rock.qty === 0) {
      newRock = {...rock, qty: 1}
    }
    // find item in cart if it already exists
    let addedItem = cart.find(r => r.id === newRock.id)
    if (addedItem) {
      //filter out the item in the cart so we can add it with the updated qty amount
      let cartWithoutItem = cart.filter(r => r.id !== addedItem.id)
      addedItem.qty += 1
      setCart([...cartWithoutItem, addedItem])
    } else {
      setCart([...cart, newRock])
    }
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
