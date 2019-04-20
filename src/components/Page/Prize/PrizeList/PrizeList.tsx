import React, { Component } from 'react'
import Header from '../../Header/Header'
import { getPrizeList } from '../../../../api/prize/prize'
import InfiniteScroll from 'react-infinite-scroller'
import './PrizeList.scss'
import PrizeItem from './PrizeItem/PrizeItem'
interface State {
  currentPage: number
  list: Array<any>
  name: string | undefined | null
  total: number
  pageSize: number
  isHasMore: boolean
  isLoading: boolean
  is_active: number | null
  isActive: string
  isActiveIndex: number
}
class PrizeList extends Component<any, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentPage: 1,
      list: [],
      name: null,
      total: 0,
      pageSize: 5,
      isHasMore: false,
      isLoading: false,
      isActive: 'is-active-all',
      isActiveIndex: 0,
      is_active: null
    }
  }

  _isMounted = false

  prizeList = async () => {
    const { isHasMore, currentPage, isLoading, is_active } = this.state
    if (isLoading || isHasMore) {
      return
    }
    let args = {
      include: 'company.logoMedia,customer',
      page: currentPage,
      name: this.state.name,
      is_active: is_active
    }
    if (this._isMounted) {
      this.setState({
        isLoading: true
      })
    }
    try {
      const r = await getPrizeList(args)
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
  componentDidMount() {
    this._isMounted = true
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  setSearchArgs = (name: string) => {
    this.setState({
      name: name,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    this.prizeList()
  }
  // 加载更多
  loadMore() {
    setTimeout(() => {
      this.prizeList()
    }, 200)
  }

  TabSetState = (
    isActive: string,
    isActiveIndex: number,
    is_active: number | null
  ) => {
    this.setState({
      isActive: isActive,
      isActiveIndex: isActiveIndex,
      is_active: is_active,
      name: this.state.name,
      list: [],
      currentPage: 1,
      isHasMore: false
    })
    setTimeout(() => {
      this.prizeList()
    }, 100)
  }

  TabHandle = (type: string) => {
    switch (type) {
      case 'all':
        this.TabSetState('is-active-all', 0, null)
        break
      case 'use':
        this.TabSetState('is-active-use', 1, 1)
        break
      case 'stop':
        this.TabSetState('is-active-stop', 2, 0)
        break
    }
  }
  render() {
    const {
      name,
      isActive,
      isActiveIndex,
      isHasMore,
      isLoading,
      list
    } = this.state
    const { history } = this.props
    const contentItem = list.map((item: any, index) => {
      const {
        company,
        name,
        description,
        start_date,
        end_date,
        stock,
        count
      } = item
      return (
        <PrizeItem
          key={index}
          index={index}
          company={company}
          name={name}
          description={description}
          start_date={start_date}
          end_date={end_date}
          stock={stock}
          count={count}
        />
      )
    })
    return (
      <div className="prize-list">
        <Header
          hasBack={true}
          title={'奖品管理'}
          history={history}
          hasSearch={true}
          searchArgs={{ name: name, placeholder: '优惠券名称' }}
          searchHandle={(name: string) => {
            this.setSearchArgs(name)
          }}
        />

        {/* TabBar */}
        <div className="prize-list_header">
          <div className="prize-list_tab-btn">
            <div
              className={
                'prize-list_btn-all ' + (isActiveIndex === 0 ? isActive : '')
              }
              onClick={() => this.TabHandle('all')}
            >
              全部
            </div>
            <div
              className={
                'prize-list_btn-use ' + (isActiveIndex === 1 ? isActive : '')
              }
              onClick={() => this.TabHandle('use')}
            >
              启用
            </div>
            <div
              className={
                'prize-list_btn-stop ' + (isActiveIndex === 2 ? isActive : '')
              }
              onClick={() => this.TabHandle('stop')}
            >
              停用
            </div>
          </div>
        </div>

        <div className="prize-list_content">
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
            {contentItem}
          </InfiniteScroll>
        </div>
      </div>
    )
  }
}

export default PrizeList
