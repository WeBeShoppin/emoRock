import React, {useEffect} from 'react'
import {getAllRocks} from '../store/rocks'
import {useDispatch, useSelector} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'

function RockList() {
  const rocks = useSelector(state => state.rocks)
  const dispatch = useDispatch()

  const loadAllRocks = () => {
    dispatch(getAllRocks())
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
        </div>
      ))}
    </div>
  )
}

export default RockList
