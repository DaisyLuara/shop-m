import React, { Component } from 'react'
import './VerifyRecord.scss'
import Header from '../../Header/Header'
import { Picker, Icon, Calendar } from 'antd-mobile'
import { verifyCouponList } from '../../../../api/verify/verify'
import InfiniteScroll from 'react-infinite-scroller'
import moment from 'moment'
import VerifyRecordItem from './VerifyRecordItem/VerifyRecordItem'

interface State {
  currentPage: number
  list: Array<any>
  coupon_batch_name: string | undefined | null
  total: number
  pageSize: number
  isHasMore: boolean
  isLoading: boolean
  status: null | number
  create_start_date: string | null
  create_end_date: string | null
  couponUsedNum: number
  couponUnusedNum: number
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
    create_start_date: null,
    create_end_date: null,
    couponUsedNum: 0,
    couponUnusedNum: 0
  }
  _isMounted = false

  verifyList = async (type?: string, statusCoupon?: null | number) => {
    const {
      isHasMore,
      currentPage,
      isLoading,
      status,
      create_start_date,
      create_end_date
    } = this.state
    if (isLoading || isHasMore) {
      return
    }
    let args = {
      page: currentPage,
      include: 'customer,couponBatch.company.logoMedia,point',
      coupon_batch_name: this.state.coupon_batch_name,
      status: status,
      create_start_date: create_start_date,
      create_end_date: create_end_date
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
      let couponUsedNum = r.meta.couponUsedNum
      let couponUnusedNum = r.meta.couponUnusedNum
      if (this._isMounted) {
        this.setState({
          isLoading: false,
          list: this.state.list.concat(res),
          total: pagination.total,
          couponUsedNum: couponUsedNum,
          couponUnusedNum: couponUnusedNum
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
      create_start_date: null,
      create_end_date: null,
      list: [],
      currentPage: 1,
      isHasMore: false,
      visible: false
    })
    setTimeout(() => {
      this.verifyList()
    }, 100)
  }

  // 加载更多
  loadMore() {
    setTimeout(() => {
      this.verifyList()
    }, 200)
  }

  onOk = (value: any) => {
    let [status] = [...value]
    if (status === 4) {
      status = null
    }
    this.setState({
      status: status,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    setTimeout(() => {
      this.verifyList()
    }, 100)
  }

  onDismiss = () => {
    this.setState({
      status: null,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    setTimeout(() => {
      this.verifyList()
    }, 100)
  }

  onConfirm = (startTime: any, endTime: any) => {
    let create_start_date = moment(startTime).format('YYYY-MM-DD')
    let create_end_date = moment(endTime).format('YYYY-MM-DD')
    this.setState({
      create_start_date: create_start_date,
      create_end_date: create_end_date,
      list: [],
      currentPage: 1,
      isHasMore: false,
      visible: false
    })
    setTimeout(() => {
      this.verifyList()
    }, 100)
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
      create_start_date,
      create_end_date,
      couponUsedNum,
      couponUnusedNum
    } = this.state
    const { history } = this.props

    const verifyItem = list.map((item: any, index) => {
      const {
        name,
        code,
        couponBatch,
        point,
        end_date,
        start_date,
        use_date,
        customer,
        status
      } = item
      return (
        <VerifyRecordItem
          end_date={end_date}
          start_date={start_date}
          use_date={use_date}
          customer={customer}
          status={status}
          key={index}
          name={name}
          code={code}
          couponBatch={couponBatch}
          point={point}
        />
      )
    })
    const district = [
      {
        value: 4,
        label: '全部'
      },
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
              发放日期
              <Icon type="down" size="sm" />
            </div>
            <Calendar
              pickTime={false}
              visible={visible}
              onCancel={this.onCancel}
              onConfirm={this.onConfirm}
              defaultValue={
                create_start_date && create_end_date
                  ? [new Date(create_start_date), new Date(create_end_date)]
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
              <div className="verify-record_count">{couponUsedNum}</div>
            </div>
            <div className="verify-record_status-count-item">
              <div className="verify-record_title">未使用</div>
              <div className="verify-record_count">{couponUnusedNum}</div>
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
