import React, {useEffect} from 'react'
import {getSingleRock} from '../store/singleRock'
import {useDispatch} from 'react-redux'

function SingleRock(props) {
  //const [rock, setRock] = useState({})

  // const rock = useSelector(state => state.SingleRock)
  // const dispatch = useDispatch()
  // const loadSingleRock = id => {
  //   dispatch(getSingleRock(id))
  // }

  // useEffect(id => {
  //   loadSingleRock(id)
  // }, [])

  const {rock} = props

  return (
    <div>
      {/* <img src={rock.imgUrl} /> */}
      <h1>{rock.name}</h1>
      <p>
        {rock.price} {rock.category}
      </p>
    </div>
  )
}

export default SingleRock
