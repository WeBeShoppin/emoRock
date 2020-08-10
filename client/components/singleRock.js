import React, {useEffect} from 'react'
import {getSingleRock} from '../store/singleRock'
import {useDispatch, useSelector} from 'react-redux'

function SingleRock(props) {
  const rock = useSelector(state => state.singleRock)
  const dispatch = useDispatch()
  const loadSingleRock = id => {
    dispatch(getSingleRock(id))
  }

  useEffect(
    () => {
      loadSingleRock(props.match.params.rockId)
    },
    [props.match.params.rockId]
  )

  return (
    <div id="singleRock">
      <img classNmae="singleRockimg" src={rock.imageUrl} />
      <h1>Name: {rock.name}</h1>
      <p>Price: {rock.price}</p>
      <p>Category: {rock.category}</p>
    </div>
  )
}

export default SingleRock
