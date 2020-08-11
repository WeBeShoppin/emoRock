import React, {useEffect, useState} from 'react'
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

  const [filter, setFilter] = useState('All')
  const handleSelectChange = evt => {
    setFilter(evt.target.value)
  }

  const filteredRocks = rocks.filter(rock => {
    if (filter === 'All') return rocks
    if (filter === 'Enjoyment') return rock.category === 'Enojyment'
    if (filter === 'Sadness') return rock.category === 'Sadness'
    if (filter === 'Fear') return rock.category === 'Fear'
    if (filter === 'Anger') return rock.category === 'Anger'
    if (filter === 'Miscellaneous') return rock.category === 'Misc'
  })

  return (
    <div>
      <div>
        <label htmlFor="categoriesFilter">Shop by categories: </label>
        <select onChange={handleSelectChange} name="categoriesFilter">
          <option>All</option>
          <option>Fear</option>
          <option>Enjoyment</option>
          <option>Anger</option>
          <option>Sadness</option>
          <option>Miscellaneous</option>
        </select>
      </div>

      <div className="rockList">
        {filteredRocks.map(rock => (
          <div className="eachRock" key={rock.id}>
            <Link to={`/rocks/${rock.id}`} component={SingleRock}>
              <img className="rockimg" src={rock.imageUrl} />
              <p className="introduction">Rock: {rock.name}</p>
            </Link>
            <button type="button" onClick={() => handleAddBtn(rock)}>
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RockList
