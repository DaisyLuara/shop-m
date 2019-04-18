import React, { Component } from 'react'
import Header from '../../Header/Header'
import HeaderContent from '../../Header/HeaderContent'
import './DeviceDetail.scss'
import DeviceDetailItem from './DeviceDetailItem/DeviceDetailItem'
import { getDeviceDetail } from '../../../../api/device/device'
interface State {
  list: Array<any>
  point_name: string | null
}
class DeviceDetail extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      list: [],
      point_name: null
    }
  }

  _isMounted = false
  deviceDetail = async () => {
    const { match } = this.props
    let id = match.params.id
    let args = {
      include: 'point,project',
      id: id
    }
    try {
      const r: any = await getDeviceDetail(args)
      if (this._isMounted) {
        this.setState({
          point_name: r.point.name,
          list: [
            { title: '设备号', info: r.id },
            { title: '当前节目', info: r.project.name },
            {
              title: '上次互动',
              info: r.faceDate
            },
            {
              title: '联网时间',
              info: r.networkDate
            },
            {
              title: '登入时间',
              info: r.loginDate
            },
            {
              title: '设备状态',
              info: r.screenStatus
            }
          ]
        })
      }
    } catch (e) {
      console.log(e)
    }
  }
  componentDidMount() {
    this._isMounted = true
    this.deviceDetail()
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    const { history, match } = this.props
    const { list, point_name } = this.state
    const detailItem = list.map((item: any, index) => {
      return <DeviceDetailItem key={index} item={item} index={index} />
    })
    console.log(match.params.id)
    return (
      <div className="device-detail">
        <Header title={'设备详情'} hasBack={true} history={history} />
        <HeaderContent content={point_name} />
        <div className="device-detail_content">{detailItem}</div>
      </div>
    )
  }
}
export default DeviceDetail
