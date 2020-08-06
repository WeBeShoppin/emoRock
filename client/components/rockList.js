import React, {useEffect} from 'react'
import {getAllRocks} from '../store/rocks'
import {useDispatch, useSelector} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'

function RockList() {
  //const [rocks, setRocks] = useState([])
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
        <Link to={`/rocks/${rock.id}`} key={rock.id}>
          <SingleRock rock={rock} />
        </Link>
        // <div key={rock.id}>
        //   <h1>single Rock</h1>
        //   <Link to={`/rocks/${rock.id}`} component={SingleRock}>
        //     {/* <img src={rock.imageUrl} /> */}
        //     <p>{rock.name}</p>
        //     <p>{rock.price}</p>
        //   </Link>
        // </div>
      ))}
    </div>
  )
}

export default RockList
