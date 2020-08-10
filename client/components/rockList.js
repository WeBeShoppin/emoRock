import React, {useEffect, useState} from 'react'
import {getAllRocks} from '../store/rocks'
import {useDispatch, useSelector} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'
import {addItemToLocalStorage} from '../store/cart'

function RockList() {
  const rocks = useSelector(state => state.rocks)
  const dispatch = useDispatch()

  const loadAllRocks = () => {
    dispatch(getAllRocks())
  }

  const handleAddBtn = item => {
    dispatch(addItemToLocalStorage(item))
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
          <button type="button" onClick={() => handleAddBtn(rock)}>
            Add To Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default RockList
