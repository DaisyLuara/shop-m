import React, { lazy, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from '../components/Page/Login/Login'
import { loggedIn } from '../api/storeData'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
// 用 lazy 来懒加载组件
const Home = lazy(() => import('./Home/Home'))
const Error404Page = lazy(() =>
  import('../components/Page/Home/PageNotFound/PageNotFound')
)

// 无状态组件嵌套路由
const Routes = (location: any) => {
  return (
    <Suspense fallback={null}>
      {/* <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}> */}
      <Switch>
        <Redirect from="/login" to="/call/home" />
        <Route
          exact
          path="/"
          render={props =>
            loggedIn() ? <Redirect to="/call/home" /> : <Login {...props} />
          }
        />
        } />
        <Route path="/call" component={Home} />
        <Route path="/404" component={Error404Page} />
        <Route component={Error404Page} />
      </Switch>
      {/* </CSSTransition>
      </TransitionGroup> */}
    </Suspense>
  )
}

export default Routes
