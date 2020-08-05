import React, {useState, useEffect} from 'react'
import getAllRocks from '../store'
import {useDispatch} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'

function rockList() {
  const [rocks, setRocks] = useState([])
  const dispatch = useDispatch()

  const loadAllRocks = () => {
    dispatch(getAllRocks())
  }

  useEffect(() => {
    loadAllRocks()
  }, [])

  return (
    <div>
      {rocks.map(rock => (
        <div key={rock.id}>
          <Link to={`/rocks/${rock.id}`} component={SingleRock}>
            <img src={rock.imageUrl} />
            <p>{rock.name}</p>
            <p>{rock.price}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default rockList
