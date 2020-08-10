import React, {useEffect} from 'react'
import {getAllRocks} from '../store/rocks'
import {useDispatch, useSelector} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'
import {addItemToLocalStorage} from '../store/cart'
import {useToasts} from 'react-toast-notifications'

function RockList() {
  const rocks = useSelector(state => state.rocks)
  const {addToast} = useToasts()
  const dispatch = useDispatch()

  const loadAllRocks = () => {
    dispatch(getAllRocks())
  }

  const handleAddBtn = item => {
    addToast('Successfully added to cart', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 1500
    })
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
            <img className="rockimg" src={rock.imageUrl} />
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
