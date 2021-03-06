import React, {useEffect} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  Login,
  Signup,
  SingleRock,
  RockList,
  Landing,
  Cart,
  UserList,
  AdminUser,
  UserHome,
  Checkout,
  Confirmation
} from './components'
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
      <Route path="/checkout" component={Checkout} />
      <Route
        path="/cart"
        render={routeProps => <Cart {...routeProps} isLoggedIn={isLoggedIn} />}
      />
      <Route path="/myAccount" component={UserHome} />
      <Route path="/users/:userId" component={AdminUser} />
      <Route exact path="/users" component={UserList} />
      <Route path="/confirmation" component={Confirmation} />
      <Route component={Landing} />
    </Switch>
  )
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)
