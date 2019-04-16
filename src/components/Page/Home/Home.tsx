import React, { Component } from 'react'
import Header from '../Header/Header'
import { getPerAndInfo } from '../../../api/storeData'
import VerifyMenu from '../Verify/VerifyMenu/VerifyMenu'
import MenuBar from '../Menu/MenuBar/MenuBar'
import Menu from '../Menu/Menu'
import './Home.scss'
import { Toast, ActivityIndicator } from 'antd-mobile'
import moment from 'moment'
import { Chart, Geom, Axis } from 'bizcharts'
import { getPersonTimes } from '../../../api/chart/chartData'
const DataSet = require('@antv/data-set')
class PageHome extends Component<any> {
  state = {
    looktimes: 0,
    playtimes7: 0,
    omo_scannum: 0,
    data: [],
    loading: true
  }
  _isMounted = false

  async init() {
    try {
      // 获取次数
      let argsCount = {
        id: 1,
        end_date: '2018-02-05',
        start_date: '2018-02-03'
      }
      let peopleTimesCount = await getPersonTimes(argsCount)
      let dataArr: any = peopleTimesCount.data
      dataArr.map((r: any) => {
        if (r.number.index === 'looktimes') {
          if (this._isMounted) {
            this.setState({
              looktimes: r.number.count ? r.number.count : 0
            })
          }
        }
        if (r.number.index === 'playtimes7') {
          if (this._isMounted) {
            this.setState({
              playtimes7: r.number.count ? r.number.count : 0
            })
          }
        }
        if (r.number.index === 'omo_scannum') {
          if (this._isMounted) {
            this.setState({
              omo_scannum: r.number.count ? r.number.count : 0
            })
          }
        }
      })
      if (this._isMounted) {
        this.setState({
          loading: false
        })
      }
      // 获取图表
      let argsChart = {
        id: 2,
        end_date: '2018-02-05',
        start_date: '2018-02-03',
        index: 'looktimes,playtimes7,omo_scannum,verifytimes'
      }
      let peopelTimesChart = await getPersonTimes(argsChart)
      let chartDataTimes: any = peopelTimesChart.data
      let data: any = []
      chartDataTimes.map((r: any) => {
        data.push({
          day: moment(r.display_name).format('MM-DD'),
          looktimes: parseInt(r.looktimes),
          playtimes7: parseInt(r.playtimes7),
          omo_scannum: parseInt(r.omo_scannum)
        })
      })
      if (this._isMounted) {
        this.setState({
          data: data
        })
      }
    } catch (err) {
      if (this._isMounted) {
        this.setState({
          loading: false
        })
      }
      console.log(err)
      console.log(err.response)
      // Toast.fail(err.response.data.message, 3)
    }
  }
  componentDidMount() {
    this._isMounted = true
    this.init()
  }
  componentWillUnmount() {
    this._isMounted = false
  }

  Loading = () => {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '150px'
        }}
      >
        <ActivityIndicator text="Loading..." />
      </div>
    )
  }
  ChartData = () => {
    // 图表
    const ds = new DataSet()
    const dv = ds.createView().source(this.state.data)
    dv.transform({
      type: 'fold',
      fields: ['looktimes', 'playtimes7', 'omo_scannum'],
      // 展开字段集
      key: 'count',
      groupBy: ['looktimes', 'playtimes7'], // 颜色分组
      // key字段
      value: 'number' // value字段
    })
    const label: any = {
      rotate: 0, //文本旋转角度
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start center end
        fill: '#444', // 文本的颜色
        fontSize: '12', // 文本大小
        textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
      }
    }
    let ChartDataBlock = (
      <Chart height={150} data={dv} forceFit padding={[10, 10, 30, 30]}>
        <Axis name="day" label={label} />
        <Axis
          name="number"
          label={{
            formatter: (val: any) => `${val / 1000}k`
          }}
        />
        <Geom
          type="line"
          position="day*number"
          size={2}
          // l 线性渐变 0 初始 1 终止
          color={[
            'count',
            type => {
              return type === 'looktimes'
                ? 'l(0) 0:#3e8fc9 1:#1ad4ff'
                : type === 'playtimes7'
                ? 'l(0) 0:#ff957c 1:#ffe97d'
                : 'l(0) 0:#03b8cb 1:#bdff3f'
            }
          ]}
        />
        <Geom
          type="point"
          position="day*number"
          size={3}
          shape={'circle'}
          color={[
            'count',
            type => {
              return type === 'looktimes'
                ? '#3e8fc9'
                : type === 'playtimes7'
                ? '#ffe97d'
                : '#03b8cb'
            }
          ]}
          style={{
            stroke: '#fff',
            lineWidth: 1
          }}
        />
      </Chart>
    )
    return ChartDataBlock
  }
  render() {
    const { history } = this.props
    const userInfo = getPerAndInfo()
    const name = userInfo.name

    return (
      <div style={{ overflowX: 'hidden' }}>
        <Header title={name} hasBack={false} />
        <VerifyMenu history={history} />
        <Menu history={history} />

        {/* 数据部分 */}
        <div className="data-wrap">
          <h4 className="data-wrap_title">最近3天数据</h4>
          <div className="data-wrap_number-wrap">
            <div className="data-wrap_item item-onlooker">
              <span className="data-wrap_item-name">围观人次</span>
              <div className="data-wrap_item-count">{this.state.looktimes}</div>
            </div>
            <div className="data-wrap_item item-fcpe">
              <span className="data-wrap_item-name">7秒fCPE</span>
              <div className="data-wrap_item-count">
                {this.state.playtimes7}
              </div>
            </div>
            <div className="data-wrap_item sweep-code">
              <span className="data-wrap_item-name">扫码次数</span>
              <div className="data-wrap_item-count">
                {this.state.omo_scannum}
              </div>
            </div>
          </div>
          <div className="data-wrap_chart">
            {this.state.loading ? this.Loading() : this.ChartData()}
          </div>
        </div>
        <MenuBar history={history} />
      </div>
    )
  }
}

export default PageHome
