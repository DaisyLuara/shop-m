import React, { lazy, Suspense, Component } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
const VerifyCode = lazy(() =>
  import('../../../components/Page/Verify/VerfiyCode/VerifyCode')
)
const VerifyRecord = lazy(() =>
  import('../../../components/Page/Verify/VerifyRecord/VerifyRecord')
)
class Verify extends Component<RouteComponentProps> {
  render() {
    const { location } = this.props
    return (
      <Suspense fallback={null}>
        <Route excat path={'/call/verify/code'} component={VerifyCode} />
        <Route path={'/call/verify/record'} component={VerifyRecord} />
      </Suspense>
    )
  }
}
export default Verify
