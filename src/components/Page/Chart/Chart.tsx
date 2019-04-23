import React, { Component } from 'react'
import Header from '../Header/Header'
import { Picker, Icon, ActivityIndicator } from 'antd-mobile'
import './Chart.scss'
import moment from 'moment'
import { Chart, Geom, Axis, Legend, Coord, Label } from 'bizcharts'
import { getPersonTimes } from '../../../api/chart/chartData'
import ChartTransfromCount from './ChartTransform/ChartTransformCount'
import ChartTransformRate from './ChartTransform/ChartTransformRate'
const DataSet = require('@antv/data-set')

interface State {
  dateType: number
  dataLabel: string
  rateList: Array<any>
  countList: Array<any>
  experienceData: Array<any>
  genderData: Array<any>
  genderLoading: boolean
  experienceLoading: boolean
  ageData: Array<any>
  timeAgeData: Array<any>
  ageLoading: boolean
  timeGenderLoading: boolean
  end_date: string
  start_date: string
}

class ChartData extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      rateList: [],
      countList: [],
      dateType: 3,
      dataLabel: '近七天',
      experienceData: [],
      genderData: [],
      genderLoading: true,
      experienceLoading: true,
      ageData: [],
      timeAgeData: [],
      ageLoading: true,
      timeGenderLoading: true,
      start_date: '2019-02-01',
      end_date: '2019-02-07'
    }
  }
  _isMounted = false
  setArgs(id: any, start_date: string, end_date: string, index?: any) {
    return {
      index: index,
      id: id,
      end_date: end_date,
      start_date: start_date
    }
  }
  getChartData = async () => {
    const { start_date, end_date } = this.state
    // 获取次数
    try {
      let argsCount = this.setArgs(1, start_date, end_date)
      let peopleTimesCount: any = await getPersonTimes(argsCount)
      let countArr: any = []
      let rateArr: any = []
      peopleTimesCount.map((item: any, index: number) => {
        countArr.push({
          title: item.number.display_name,
          count: item.number.count ? item.number.count : 0
        })
        if (index !== 0) {
          rateArr.push({
            title: item.rate.display_name,
            count: item.rate.value
          })
        }
      })
      if (this._isMounted) {
        this.setState({
          countList: countArr,
          rateList: rateArr
        })
      }

      // 获取体验图表
      let argsChart = this.setArgs(2, start_date, end_date)
      argsChart.index = 'looktimes,playtimes7,omo_scannum,verifytimes'
      let peopelTimesChart: any = await getPersonTimes(argsChart)
      let experienceData: any = []
      peopelTimesChart.map((r: any) => {
        experienceData.push({
          day: moment(r.display_name).format('MM-DD'),
          围观人次: parseInt(r.looktimes),
          '7秒fCPE': parseInt(r.playtimes7),
          扫码次数: parseInt(r.omo_scannum),
          到店核销: parseInt(r.verifytimes)
        })
      })
      if (this._isMounted) {
        this.setState({
          experienceData: experienceData,
          experienceLoading: false
        })
      }

      // 获取性别
      let argsPie = this.setArgs(3, start_date, end_date)
      let genderPie: any = await getPersonTimes(argsPie)
      let genderData: any = []
      genderPie.map((r: any) => {
        genderData.push({
          item: r.display_name,
          count: r.count ? Number(r.count) : 0
        })
      })
      if (this._isMounted) {
        this.setState({
          genderData: genderData,
          genderLoading: false
        })
      }

      // 获取年龄
      let argsAge = this.setArgs(4, start_date, end_date)
      let ageColumnar: any = await getPersonTimes(argsAge)
      let ageData: any = []
      ageColumnar.map((r: any) => {
        let item = {
          '0-10': Number(r[10]),
          '11-18': Number(r[18]),
          '19-30': Number(r[30]),
          '31-40': Number(r[40]),
          '41-50': Number(r[60]),
          '60+': Number(r[61]),
          name: r.name
        }
        ageData.push(item)
      })

      if (this._isMounted) {
        this.setState({
          ageData: ageData,
          ageLoading: false
        })
      }

      // 获取时间与年龄段
      let argsTimeAndAge = this.setArgs(5, start_date, end_date)
      let timeAge: any = await getPersonTimes(argsTimeAndAge)
      let timeAgeData: any = []
      timeAge.map((r: any) => {
        timeAgeData.push({
          time: r.display_name,
          女: r.count.female,
          男: r.count.male
        })
      })

      if (this._isMounted) {
        this.setState({
          timeAgeData: timeAgeData,
          timeGenderLoading: false
        })
      }
    } catch (e) {
      if (this._isMounted) {
        this.setState({
          experienceLoading: false,
          genderLoading: false,
          ageLoading: false,
          timeGenderLoading: false
        })
      }
    }
  }

  onOk = (value: any) => {
    let [dateType] = [...value]
    if (dateType === 1) {
      this.setState({
        dateType: dateType,
        dataLabel: '昨天',
        start_date: moment(new Date().getTime() - 3600 * 1000 * 24 * 1).format(
          'YYYY-MM-DD'
        ),
        end_date: moment(new Date().getTime() - 3600 * 1000 * 24 * 1).format(
          'YYYY-MM-DD'
        )
      })
    } else if (dateType === 2) {
      this.setState({
        dateType: dateType,
        dataLabel: '近三天',
        start_date: moment(new Date().getTime()).format('YYYY-MM-DD'),
        end_date: moment(new Date().getTime() - 3600 * 1000 * 24 * 2).format(
          'YYYY-MM-DD'
        )
      })
    } else {
      this.setState({
        dateType: dateType,
        dataLabel: '近七天',
        start_date: '2019-02-01',
        end_date: '2019-02-07'
        // start_date: moment(new Date().getTime()).format('YYYY-MM-DD'),
        // end_date: moment(new Date().getTime() - 3600 * 1000 * 24 * 6).format(
        //   'YYYY-MM-DD'
        // )
      })
    }
    setTimeout(() => {
      this.getChartData()
    }, 100)
  }
  onDismiss = () => {
    this.setState({
      dateType: 3,
      dataLabel: '近七天',
      start_date: '2019-02-01',
      end_date: '2019-02-07'
      // start_date: moment(new Date().getTime()).format('YYYY-MM-DD'),
      // end_date: moment(new Date().getTime() - 3600 * 1000 * 24 * 6).format(
      //   'YYYY-MM-DD'
      // )
    })
    setTimeout(() => {
      this.getChartData()
    }, 100)
  }

  ChartExperienceData = () => {
    // 图表
    const ds = new DataSet()

    const dv = ds.createView().source(this.state.experienceData)
    dv.transform({
      type: 'fold',
      fields: ['围观人次', '7秒fCPE', '扫码次数', '到店核销'],
      // 展开字段集
      key: 'count',
      // key字段
      value: 'number' // value字段
    })
    const label: any = {
      rotate: 0, //文本旋转角度
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start center end
        fill: '#444', // 文本的颜色
        fontSize: '10', // 文本大小
        textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
      }
    }
    let ChartDataBlock = (
      <Chart
        height={280}
        data={dv}
        forceFit
        padding={[30, 10, 50, 50]}
        background={{ fill: '#fff', radius: 10 }}
      >
        <Legend position="top-center" marker="square" />
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
              return type === '围观人次'
                ? 'l(0) 0:#3e8fc9 1:#1ad4ff'
                : type === '7秒fCPE'
                ? 'l(0) 0:#ff957c 1:#ffe97d'
                : type === '扫码次数'
                ? 'l(0) 0:#03b8cb 1:#bdff3f'
                : 'l(0) 0:#007ccd 1:#00f5d1'
            }
          ]}
        />
      </Chart>
    )
    return ChartDataBlock
  }

  ChartGenderPie = () => {
    // 饼图
    const ds = new DataSet()

    const dv = ds.createView().source(this.state.genderData)
    dv.transform({
      type: 'percent',
      fields: 'count',
      dimension: 'item',
      as: 'percent'
    })
    let ChartDataBlock = (
      <Chart
        height={250}
        data={dv}
        forceFit
        padding={[30, 10, 10, 10]}
        background={{ fill: '#fff', radius: 10 }}
      >
        <Coord type="theta" radius={0.75} />
        <Legend position="top-center" marker="square" />
        <Geom
          type="intervalStack"
          position="percent"
          color={['item', ['#e95caf', '#23b6f4']]}
          style={{
            lineWidth: 3,
            stroke: '#fff'
          }}
        >
          <Label content="count" />
        </Geom>
      </Chart>
    )
    return ChartDataBlock
  }

  ChartAge = () => {
    // 年龄折叠图
    const ds = new DataSet()

    const dv = ds.createView().source(this.state.ageData)
    dv.transform({
      type: 'fold',
      fields: ['0-10', '11-18', '19-30', '31-40', '41-50', '60+'],
      // 展开字段集
      key: 'ageKey',
      // key字段
      value: 'ageValue' // value字段
    })
    const label: any = {
      rotate: 0, //文本旋转角度
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start center end
        fill: '#444', // 文本的颜色
        fontSize: '10', // 文本大小
        textBaseline: 'middle' // 文本基准线，可取 top middle bottom，默认为middle
      }
    }
    let ChartDataBlock = (
      <Chart
        height={280}
        data={dv}
        forceFit
        padding={[30, 10, 50, 50]}
        background={{ fill: '#fff', radius: 10 }}
      >
        <Legend position="top-center" marker="square" />
        <Axis name="ageKey" label={label} />
        <Axis
          name="ageValue"
          label={{
            formatter: (val: any) => `${val}`
          }}
        />
        <Geom
          type="intervalStack"
          position="ageKey*ageValue"
          color={['name', ['#23b6f4', '#e95caf']]}
          style={{
            stroke: '#fff',
            lineWidth: 1
          }}
        />
      </Chart>
    )
    return ChartDataBlock
  }

  ChartTimeGenderData = () => {
    // 时间段和年龄图表
    const ds = new DataSet()
    const dv = ds.createView().source(this.state.timeAgeData)
    dv.transform({
      type: 'fold',
      fields: ['女', '男'],
      // 展开字段集
      key: 'name',
      // key字段
      value: 'number' // value字段
    })
    const label: any = {
      rotate: 0, //文本旋转角度
      textStyle: {
        textAlign: 'center', // 文本对齐方向，可取值为： start center end
        fill: '#444', // 文本的颜色
        fontSize: '10', // 文本大小
        textBaseline: 'top'
      },
      htmlTemplate(text: any, item: any, index: any) {
        let arr = text.split('-')
        return (
          '<div style="margin-top:0.15rem;"><div style="font-size:0.1rem">' +
          arr[0] +
          '</div><div style="font-size:0.1rem;text-align:center;">~</div><div style="font-size:0.1rem;">' +
          arr[1] +
          '</div></div>'
        )
      }
    }
    let ChartDataBlock = (
      <Chart
        height={280}
        data={dv}
        forceFit
        padding={[30, 10, 70, 50]}
        background={{ fill: '#fff', radius: 10 }}
      >
        <Legend position="top-center" marker="square" />
        <Axis name="time" label={label} />
        <Axis
          name="number"
          label={{
            formatter: (val: any) => `${val}`
          }}
        />
        <Geom
          type="line"
          position="time*number"
          size={2}
          color={['name', ['#e95caf', '#23b6f4']]}
        />
        <Geom
          type="point"
          position="time*number"
          size={3}
          shape={'circle'}
          color={['name', ['#e95caf', '#23b6f4']]}
          style={{
            stroke: '#fff',
            lineWidth: 1
          }}
        />
      </Chart>
    )
    return ChartDataBlock
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
  componentDidMount() {
    this._isMounted = true
    this.getChartData()
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    const { history } = this.props
    const {
      dateType,
      countList,
      rateList,
      genderLoading,
      experienceLoading,
      ageLoading,
      timeGenderLoading,
      dataLabel
    } = this.state
    const district = [
      {
        value: 1,
        label: '昨天'
      },
      {
        value: 2,
        label: '近三天'
      },
      {
        value: 3,
        label: '近七天'
      }
    ]
    const countItem = countList.map((item: any, index) => {
      const { title, count } = item
      return (
        <ChartTransfromCount
          key={index}
          index={index}
          title={title}
          count={count}
        />
      )
    })

    const rateItem = rateList.map((item: any, index) => {
      const { title, count } = item
      return (
        <ChartTransformRate
          index={index}
          key={index}
          title={title}
          count={count}
        />
      )
    })
    return (
      <div className="chart-data">
        <Header hasBack={true} title={'按人次计'} history={history} />
        <div className="chart-data_search">
          <Picker
            data={district}
            cols={1}
            value={[dateType]}
            title="时间"
            onDismiss={this.onDismiss}
            onOk={(value: any) => this.onOk(value)}
          >
            <div className="chart-data_date">
              {dataLabel}
              <Icon type="down" size="sm" />
            </div>
          </Picker>
        </div>
        <div className="chart-data_transform">
          <h4 className="chart-data_transform-title">体验转化分析</h4>
          <div className="chart-data_transform-content">
            <div className="chart-data_transform-content-count">
              {countItem}
            </div>
            <div className="chart-data_transform-content-rate">{rateItem}</div>
          </div>
        </div>

        <div className="chart-data_experience">
          <h4 className="chart-data_title">体验数据概览</h4>
          {experienceLoading ? this.Loading() : this.ChartExperienceData()}
        </div>

        <div className="chart-data_gender">
          <h4 className="chart-data_title">性别特征</h4>
          {genderLoading ? this.Loading() : this.ChartGenderPie()}
        </div>

        <div className="chart-data_age">
          <h4 className="chart-data_title">年龄段</h4>
          {ageLoading ? this.Loading() : this.ChartAge()}
        </div>

        <div className="chart-data_time-gender">
          <h4 className="chart-data_title">时间段与性别特征</h4>
          {timeGenderLoading ? this.Loading() : this.ChartTimeGenderData()}
        </div>
      </div>
    )
  }
}

export default ChartData
