import React, { Component } from 'react'
import './VerifyRecord.scss'
import Header from '../../Header/Header'
import { Picker, Icon, Calendar } from 'antd-mobile'
import { verifyCouponList } from '../../../../api/verify/verify'
import InfiniteScroll from 'react-infinite-scroller'
import moment from 'moment'

interface State {
  currentPage: number
  list: Array<any>
  coupon_batch_name: string | undefined | null
  total: number
  pageSize: number
  isHasMore: boolean
  isLoading: boolean
  status: null | number
  start_date: string | null
  end_date: string | null
}
class VerifyRecord extends Component<any & State> {
  state = {
    coupon_batch_name: null,
    currentPage: 1,
    list: [],
    total: 0,
    pageSize: 5,
    isHasMore: false,
    isLoading: false,
    visible: false,
    status: null,
    start_date: null,
    end_date: null
  }
  _isMounted = false

  verifyList = async () => {
    const {
      isHasMore,
      currentPage,
      isLoading,
      status,
      start_date,
      end_date
    } = this.state
    if (isLoading || isHasMore) {
      return
    }
    let args = {
      page: currentPage,
      include: 'customer,couponBatch,point',
      coupon_batch_name: this.state.coupon_batch_name,
      status: status,
      start_date: start_date,
      end_date: end_date
    }
    if (this._isMounted) {
      this.setState({
        isLoading: true
      })
    }
    try {
      const r = await verifyCouponList(args)
      let res: any = r.data
      let pagination: any = r.meta.pagination
      if (this._isMounted) {
        this.setState({
          isLoading: false,
          list: this.state.list.concat(res),
          total: pagination.total
        })
      }
      if (pagination.current_page >= pagination.total_pages) {
        if (this._isMounted) {
          this.setState({
            isHasMore: true
          })
        }
      } else {
        if (this._isMounted) {
          this.setState({
            currentPage: currentPage + 1
          })
        }
      }
    } catch (e) {
      if (this._isMounted) {
        this.setState({
          isLoading: false
        })
      }
    }
  }

  setSearchArgs = (name: string) => {
    this.setState({
      coupon_batch_name: name,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
  }
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  isShowCalendar = () => {
    this.setState({
      visible: true
    })
  }
  onCancel = () => {
    this.setState({
      start_date: null,
      end_date: null,
      list: [],
      currentPage: 1,
      isHasMore: false,
      visible: false
    })
    this.verifyList()
  }

  // 加载更多
  loadMore() {
    setTimeout(() => {
      this.verifyList()
    }, 2000)
  }

  onOk = (value: any) => {
    let [status] = [...value]
    this.setState({
      status: status,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    this.verifyList()
  }

  onDismiss = () => {
    this.setState({
      status: null,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    this.verifyList()
  }

  onConfirm = (startTime: any, endTime: any) => {
    let start_date = moment(startTime).format('YYYY-MM-DD')
    let end_date = moment(endTime).format('YYYY-MM-DD')
    this.setState({
      start_date: start_date,
      end_date: end_date,
      list: [],
      currentPage: 1,
      isHasMore: false,
      visible: false
    })
    this.verifyList()
  }
  render() {
    const {
      coupon_batch_name,
      visible,
      isHasMore,
      isLoading,
      list,
      total,
      status,
      start_date,
      end_date
    } = this.state
    const { history } = this.props

    const verifyItem = list.map((item: any, index) => {
      return (
        <div className="verify-record_content-item" key={index}>
          <div className="verify-record_content-coupon-info">
            <div className="verify-record_coupon-title-logo">
              <div className="verify-record_title-code">
                <div className="verify-record_title">{item.name}</div>
                <div className="verify-record_code">{item.code}</div>
              </div>
              <div className="verify-record_content-item-logo">
                <img src="http://qiniucdn.xingstation.com/images_1553071832_sUyZznEMUU.png" />
              </div>
            </div>

            <div className="verify-record_point-date">
              <div className="verify-record_point-date-item">
                点位名:{item.point.name}
              </div>
              <div className="verify-record_point-date-item">
                有效期:{item.start_date} - {item.end_date}
              </div>
            </div>
          </div>
          <div className="verify-record_content-coupon-people">
            <div className="verify-record_coupon-people">
              <div className="verify-record_coupon-people-item">
                核销时间: {item.use_date}
              </div>
              <div className="verify-record_coupon-people-item">
                核销人员: {item.customer ? item.customer.name : ''}
              </div>
            </div>
            <div className="verify-record_coupon-people-status">
              <span
                className={
                  item.status === 1
                    ? 'verify-record_status coupon-use'
                    : 'verify-record_status coupon-no-use'
                }
              >
                {item.status === 1
                  ? '已使用'
                  : item.status === 0
                  ? '未领取'
                  : item.status === 2
                  ? '停用'
                  : '未使用'}
              </span>
            </div>
          </div>
        </div>
      )
    })
    const district = [
      {
        value: 0,
        label: '未领取'
      },
      {
        value: 1,
        label: '已使用'
      },
      {
        value: 2,
        label: '停用'
      },
      {
        value: 3,
        label: '未使用'
      }
    ]
    return (
      <div className="verify-record">
        <Header
          title={'核销记录'}
          hasBack={true}
          history={history}
          hasSearch={true}
          searchArgs={{
            coupon_batch_name: coupon_batch_name,
            placeholder: '优惠券名称'
          }}
          searchHandle={(name: string) => {
            this.setSearchArgs(name)
          }}
        />

        <div className="verify-record_content-search-status">
          <div className="verify-record_search">
            <Picker
              data={district}
              cols={1}
              value={status ? [status] : []}
              title="状态"
              onDismiss={this.onDismiss}
              onOk={(value: any) => this.onOk(value)}
            >
              <div className="verify-record_status">
                状态
                <Icon type="down" size="sm" />
              </div>
            </Picker>
            <div className="verify-record_date" onClick={this.isShowCalendar}>
              日期
              <Icon type="down" size="sm" />
            </div>
            <Calendar
              pickTime={false}
              visible={visible}
              onCancel={this.onCancel}
              onConfirm={this.onConfirm}
              defaultValue={
                start_date && end_date
                  ? [new Date(start_date), new Date(end_date)]
                  : [new Date()]
              }
            />
          </div>
          <div className="verify-record_status-count-wrap">
            <div className="verify-record_status-count-item">
              <div className="verify-record_title">总券数</div>
              <div className="verify-record_count">{total}</div>
            </div>
            <div className="verify-record_status-count-item">
              <div className="verify-record_title">已使用</div>
              <div className="verify-record_count">290</div>
            </div>
            <div className="verify-record_status-count-item">
              <div className="verify-record_title">未使用</div>
              <div className="verify-record_count">610</div>
            </div>
          </div>
        </div>
        <div className="verfiy-record_content">
          <InfiniteScroll
            pageStart={1}
            loadMore={this.loadMore.bind(this)}
            hasMore={!isHasMore || !isLoading}
            loader={
              !isHasMore ? (
                <div className="loader" key={0}>
                  Loading ...
                </div>
              ) : (
                undefined
              )
            }
            useWindow={false}
          >
            {verifyItem}
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}

export default VerifyRecord
