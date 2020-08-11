import React, {useEffect, useState} from 'react'
import {getAllRocks} from '../store/rocks'
import {useDispatch, useSelector} from 'react-redux'
import SingleRock from './singleRock'
import {Link} from 'react-router-dom'
import {addItemToLocalStorage} from '../store/cart'
import {useToasts} from 'react-toast-notifications'

//MATERIALIZE
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import ListSubheader from '@material-ui/core/ListSubheader'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/Info'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 1000,
    height: 450
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)'
  }
}))

function RockList() {
  const classes = useStyles() //materialize

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
      <div className={classes.root}>
        <GridList cellHeight={180} className={classes.gridList} cols={4}>
          <GridListTile key="Subheader" cols={4} style={{height: 'auto'}}>
            <ListSubheader component="div">
              <label htmlFor="categoriesFilter">Shop by categories: </label>
              <select onChange={handleSelectChange} name="categoriesFilter">
                <option>All</option>
                <option>Fear</option>
                <option>Enjoyment</option>
                <option>Anger</option>
                <option>Sadness</option>
                <option>Miscellaneous</option>
              </select>
            </ListSubheader>
          </GridListTile>
          {filteredRocks.map(rock => (
            <GridListTile key={rock.id} cols={1}>
              <Link to={`/rocks/${rock.id}`} component={SingleRock}>
                <img src={rock.imageUrl} alt={rock.name} width="100%" />
              </Link>
              <GridListTileBar
                title={rock.name}
                subtitle={<span>${rock.price / 100}</span>}
                actionIcon={
                  <IconButton
                    aria-label="add to shopping cart"
                    onClick={() => handleAddBtn(rock)}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>

      {/* <div className="rockList">
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
      </div> */}
    </div>
  )
}

export default RockList
