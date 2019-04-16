import React, { Component } from 'react'
import { menuConfig } from './menuConfig'
import './Menu.scss'
class Menu extends Component<any> {
  menuLinkHandle = (url: string) => {
    this.props.history.push(url)
  }

  MenuItem = () => {
    let items: any = []
    menuConfig.map((r: any) => {
      items.push(
        <div className="menu_item" key={r.id}>
          <img src={r.icon} onClick={(e: any) => this.menuLinkHandle(r.url)} />
          <div className="menu_item-name">{r.name}</div>
        </div>
      )
    })
    return items
  }

  render() {
    return <div className="menu">{this.MenuItem()}</div>
  }
}

export default Menu
