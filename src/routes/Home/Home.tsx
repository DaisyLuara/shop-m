import React, { lazy, Suspense, Component } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
const PageHome = lazy(() => import('../../components/Page/Home/Home'))
const My = lazy(() => import('../../components/Page/My/My'))
const Device = lazy(() => import('./Device/Device'))
const Verify = lazy(() => import('./Verify/Verify'))
const Help = lazy(() => import('../../components/Page/My/Help/Help'))
const ModifyPassword = lazy(() =>
  import('../../components/Page/My/ModifyPassword/ModifyPassword')
)
const Platform = lazy(() =>
  import('../../components/Page/Platform/PlatformList/PlatfromList')
)
const PrizeList = lazy(() =>
  import('../../components/Page/Prize/PrizeList/PrizeList')
)
import { CSSTransition } from 'react-transition-group'

class Home extends Component<RouteComponentProps> {
  render() {
    const { location } = this.props
    return (
      <Suspense fallback={null}>
        <Route path={'/call/my'} component={My} />
        <Route path={'/call/help'} component={Help} />
        <Route path={'/call/verify'} component={Verify} />
        <Route path={'/call/device'} component={Device} />
        <Route path={'/call/platform'} component={Platform} />
        <Route path={'/call/prize'} component={PrizeList} />
        <Route path={'/call/password'} component={ModifyPassword} />
        <Route excat path={'/call/home'} component={PageHome} />
      </Suspense>
    )
  }
}

export default Home
