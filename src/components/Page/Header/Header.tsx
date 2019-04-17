import React, { Component } from 'react'
import './Header.scss'
import { Icon, SearchBar } from 'antd-mobile'
class Header extends Component<any> {
  state = {
    open: false
  }

  titleLabel = () => {
    return <label>{this.props.title}</label>
  }
  back = () => {
    this.props.history.goBack()
  }
  backIcon = () => {
    if (this.props.hasBack) {
      return (
        <Icon
          type="left"
          size="md"
          className="header-wrap_left-icon"
          onClick={() => this.back()}
        />
      )
    }
    return ''
  }
  searchIcon = () => {
    if (this.props.hasSearch) {
      return (
        <Icon
          type="search"
          size="md"
          className="header-wrap_search-icon"
          onClick={this.searchOpen}
        />
      )
    }
  }
  searchOpen = () => {
    this.setState({
      open: true
    })
  }

  onSubmit = (value: any) => {
    this.props.searchHandle(value)
  }
  onCancel = () => {
    this.setState({
      open: false
    })
    this.props.searchHandle()
  }
  render() {
    const { open } = this.state
    const { searchArgs } = this.props
    return (
      <div>
        {!open ? (
          <header className="header-wrap">
            {this.titleLabel()}
            {this.backIcon()}
            {this.searchIcon()}
          </header>
        ) : (
          <div className="search-content">
            <SearchBar
              placeholder={'搜索' + searchArgs.placeholder}
              maxLength={20}
              onSubmit={value => this.onSubmit(value)}
              onClear={value => console.log(value, 'onClear')}
              onCancel={() => this.onCancel()}
            />
          </div>
        )}
      </div>
    )
  }
}
export default Header
