import React, { lazy, Suspense, Component } from 'react'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
const FeedbackList = lazy(() =>
  import('../../../components/Page/My/Help/FeedbackList/FeedbackList')
)
const FeedbackDetail = lazy(() =>
  import('../../../components/Page/My/Help/FeedbackDetail/FeedbackDetail')
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
          <Route excat path={'/call/feedback/list'} component={FeedbackList} />
          <Route
            path={'/call/feedback/detail/:id'}
            component={FeedbackDetail}
          />
          <Route component={Error404Page} />
        </Switch>
      </Suspense>
    )
  }
}
export default Verify
