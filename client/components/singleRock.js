import React, {useEffect} from 'react'
import {getSingleRock} from '../store/singleRock'
import {useDispatch, useSelector} from 'react-redux'
import {useToasts} from 'react-toast-notifications'
import {addItemToLocalStorage} from '../store/cart'

function SingleRock(props) {
  const rock = useSelector(state => state.singleRock)
  const dispatch = useDispatch()
  const {addToast} = useToasts()
  const loadSingleRock = id => {
    dispatch(getSingleRock(id))
  }

  const handleAddBtn = item => {
    addToast('Successfully added to cart', {
      appearance: 'success',
      autoDismiss: true,
      autoDismissTimeout: 1500
    })
    dispatch(addItemToLocalStorage(item))
  }

  useEffect(
    () => {
      loadSingleRock(props.match.params.rockId)
    },
    [props.match.params.rockId]
  )

  return (
    <div id="singleRock">
      <img className="singleRockimg" src={rock.imageUrl} />
      <div id="rockInfo">
        <h1>Name: {rock.name}</h1>
        <p>Price: {rock.price / 100}</p>
        <p>Category: {rock.category}</p>
        <p>Color: {rock.color}</p>
        <p>Summary: {rock.summary}</p>
        <p>Product Detail:{rock.description}</p>
        <button type="button" onClick={() => handleAddBtn(rock)}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

export default SingleRock
