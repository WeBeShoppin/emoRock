import React, {useEffect} from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {
  Login,
  Signup,
  //UserHome,
  SingleRock,
  RockList,
  Landing,
  Cart,
  UserList,
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
      <Route path="/cart" component={Cart} />
      <Route path="/myAccount" component={UserHome} />
      <Route path="/admin/users" component={UserList} />
      <Route path="/confirmation" component={Confirmation} />
      {/* Displays our Landing component as a fallback */}
      <Route component={Landing} />
      {isLoggedIn && (
        <Switch>
          {/* Routes placed here are only available after logging in */}
          <Route path="/home" component={Landing} />
        </Switch>
      )}
    </Switch>
  )
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(Routes)
