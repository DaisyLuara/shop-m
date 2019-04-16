import React, { Component } from 'react'
import './PageNotFound.scss'

class PageNotFound extends Component<any> {
  goBackHome = () => {
    const { history } = this.props
    history.push('/call/home')
  }
  render() {
    return (
      <div className="page-not-found">
        <div className="page-not-found_btn" onClick={this.goBackHome}>
          返回首页
        </div>
      </div>
    )
  }
}

export default PageNotFound
