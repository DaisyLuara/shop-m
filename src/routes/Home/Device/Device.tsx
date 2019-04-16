import React, { lazy, Suspense, Component } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
const DeviceList = lazy(() =>
  import('../../../components/Page/Device/DeviceList')
)
const DeviceDetail = lazy(() =>
  import('../../../components/Page/Device/DeviceDetail/DeviceDetail')
)
class Device extends Component<RouteComponentProps> {
  render() {
    const { location } = this.props
    return (
      <Suspense fallback={null}>
        <Switch>
          <Route path={'/call/device/detail/:id'} component={DeviceDetail} />
          <Route excat path={'/call/device'} component={DeviceList} />
        </Switch>
      </Suspense>
    )
  }
}
export default Device
