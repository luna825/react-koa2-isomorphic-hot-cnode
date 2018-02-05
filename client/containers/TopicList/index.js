import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import queryString from 'query-string'
import {load as loadTopics} from '../../redux/modules/topics'
import {formatDate} from '../../util/utils'
import {Link} from 'react-router-dom'
//antd 组件
import {Card, List, Avatar, Tag, Pagination } from 'antd'
import {CheckedTags, LoadMore} from '../../components'
import style from './index.scss'
const R = require('ramda');
//分类标签
const tabs = {
  all: "全部",
  good: "精华",
  share: "分享",
  ask: "问答",
  dev: "客户端测试"
}

@connect(state => ({topics: state.topics}), {loadTopics})
export default class TopicList extends Component {
  constructor(props) {
    super(props)
    this.fetchTopic = this.fetchTopic.bind(this)
    this.asyncBootstrap = this.asyncBootstrap.bind(this)
  }

  static propTypes = {
    topics: PropTypes.object.isRequired,
    loadTopics: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }
  /*-----------------------react周期函数 start--------------------------*/
  componentDidMount() {
    const { topics, loadTopics } = this.props
    //服务端取得了数据则不再loadTopics or 从其他页面跳转时都取得数据
    if(!topics.loaded || topics.pageInfo.tab !== this.fetchTopic(this.props.location).tab){
      loadTopics(this.fetchTopic(this.props.location).tab)
    }
  }
  //地址发生变化时重新取得数据
  componentWillReceiveProps(nextProps) {
    if(nextProps.location.search !== this.props.location.search){
      this.props.loadTopics(this.fetchTopic(nextProps.location).tab)
    }
  }
  /*-----------------------react周期函数 end--------------------------*/

  /*-----------------------状态控制函数 start--------------------------*/
  //取得路由的查询信息
  //?tab=all&limit=20&page=0  ===> {tab:'all', limit: 20, page: 0}
  //默认值是{tab: 'all'}
  fetchTopic(location){
    location  = location ||  this.props.location
    const query = queryString.parse(location.search)
    return R.has('tab')(query) ? query : {...query, tab: 'all'}
  }
  //数据异步获取
  asyncBootstrap(){
    return this.props.loadTopics(this.fetchTopic(this.props.location).tab)
  }
  //翻页
  onLoadMore = ()=>{
    this.props.loadTopics(this.fetchTopic().tab, true)
  }
  /*-----------------------状态控制函数 end--------------------------*/

  /*-----------------------子node洗渲染 start--------------------------*/
  //针对 对每个topic的类型进行不同的标签渲染
  //top > good > tab
  renderTag(topic){
    const { top, good, tab} = topic
    if(top){
      return <div className={style.tab}><Tag color='green'>置顶</Tag></div>
    }else if(good){
      return <div className={style.tab}><Tag color='red'>精华</Tag></div>
    }else{
      return <div className={style.tab}><Tag>{tabs[tab] || '分享'}</Tag></div>
    }
  }

  /*-----------------------子node洗渲染 end--------------------------*/

  render() {
    const {loadTopics, topics, } = this.props
    const query = this.fetchTopic()
    return (
      <Card type='inner'
        title={<CheckedTags tabs={tabs} currentTab={query.tab} />}
      >
        <List
          loading={topics.loading}
          dataSource={topics.data.success && topics.data.data}
          itemLayout="horizontal"
          className={style.topics}
          renderItem={item=>(
            <List.Item className={style.list}>
              <div className={style.avatar}><Avatar src={item.author.avatar_url} /></div>
              <div className={style.replyCount}>
                <span className='text-Purple-400' style={{fontSize:'14px'}}>{item.reply_count}</span>/
                <span className='text-grey-400'>{item.visit_count}</span>
              </div>
              { query.tab === 'all' && this.renderTag(item) }
              <Link to={`/detail/${item.id}`} className={style.title}>{item.title}</Link>
              <div className={style.lastTime + ' text-grey-600'}>{formatDate(item.last_reply_at)}</div>
            </List.Item>
          )}
        />
      {topics.data.data && <LoadMore loading={topics.loading} onLoadMore={this.onLoadMore} />}
      </Card>
    )
  }
}
