import React, {useEffect} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, UserHome, SingleRock, RockList, Landing} from './components'
import {me} from './store'
import {useSelector, useDispatch} from 'react-redux'

/**
 * COMPONENT
 */

const Routes = () => {
  const isLoggedIn = useSelector(state => !!state.user.id)
  const dispatch = useDispatch()
  const loadInitialData = () => {
    dispatch(me())
  }

  useEffect(() => {
    loadInitialData()
  })

  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/rocks" component={RockList} />
      <Route path="/rocks/:rockId" component={SingleRock} />
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={UserHome} />
        </Switch>
      )}
      {/* Displays our Landing component as a fallback */}
      <Route component={Landing} />
    </Switch>
  )
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)
