import React, {useState, useEffect} from 'react'
import getSingleRock from '../store'
import {useDispatch} from 'react-redux'

function singleRock() {
  const [rock, setRock] = useState({})
  const dispatch = useDispatch()

  const loadSingleRock = id => {
    dispatch(getSingleRock(id))
  }

  useEffect(id => {
    loadSingleRock(id)
  }, [])

  return (
    <div>
      <img src={rock.imgUrl} />
      <h1>{rock.name}</h1>
      <p>
        {rock.price} {rock.category}
      </p>
    </div>
  )
}

export default singleRock
