import React, { Component } from 'react'
import './MenuBar.scss'
import { MenuBarConfig } from './MenuBarConfig'
class MenuBar extends Component<any> {
  menuLinkHandle = (url: string, type: string) => {
    alert(url)
    type === 'release' ? '' : this.props.history.push(url)
  }
  MenuBarHandle = () => {
    let childrenElement: any = []
    MenuBarConfig.map((r: any) => {
      childrenElement.push(
        <div
          className={
            r.type === 'release' ? 'menu-bar_item-release' : 'menu-bar_item'
          }
          key={r.id}
          onClick={() => {
            this.menuLinkHandle(r.url, r.type)
          }}
        >
          <img src={r.img_url} />
        </div>
      )
    })
    return childrenElement
  }
  render() {
    return <div className="menu-bar">{this.MenuBarHandle()}</div>
  }
}

export default MenuBar
