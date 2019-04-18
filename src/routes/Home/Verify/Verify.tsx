import React, { lazy, Suspense, Component } from 'react'
import { Route, RouteComponentProps,Switch } from 'react-router-dom'
const VerifyCode = lazy(() =>
  import('../../../components/Page/Verify/VerfiyCode/VerifyCode')
)
const VerifyRecord = lazy(() =>
  import('../../../components/Page/Verify/VerifyRecord/VerifyRecord')
)
const Error404Page = lazy(() =>
  import('../../../components/Page/Home/PageNotFound/PageNotFound')
)

class Verify extends Component<RouteComponentProps> {
  render() {
    const { location } = this.props
    return (
      <Suspense fallback={null}>
        <Switch>
          <Route excat path={'/call/verify/code'} component={VerifyCode} />
          <Route path={'/call/verify/record'} component={VerifyRecord} />
          <Route component={Error404Page} />
        </Switch>
      </Suspense>
    )
  }
}
export default Verify
