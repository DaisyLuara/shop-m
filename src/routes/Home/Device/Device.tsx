import React, { lazy, Suspense, Component } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
const DeviceList = lazy(() =>
  import('../../../components/Page/Device/DeviceList')
)
const DeviceDetail = lazy(() =>
  import('../../../components/Page/Device/DeviceDetail/DeviceDetail')
)
const Error404Page = lazy(() =>
  import('../../../components/Page/Home/PageNotFound/PageNotFound')
)
class Device extends Component<RouteComponentProps> {
  render() {
    const { location } = this.props
    return (
      <Suspense fallback={null}>
        <Switch>
          <Route excat path={'/call/device/list'} component={DeviceList} />
          <Route path={'/call/device/detail/:id'} component={DeviceDetail} />
          <Route component={Error404Page} />
        </Switch>
      </Suspense>
    )
  }
}
export default Device
