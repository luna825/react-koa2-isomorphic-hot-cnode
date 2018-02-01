import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {increment} from '../../redux/modules/count'

//antd 组件
import { Button } from 'antd'
import styles from './index.scss'

@connect(
  state => ({count: state.count}),
  {increment}
)
export default class TopicList extends Component {
  constructor(props){
    super(props)
  }

  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired
  }

  render(){
    const {increment, count} = this.props
    return(
      <div className={styles.topiclist}>
        <div className={styles.title}>this is topic list page</div>
        <Button onClick={increment}>{count}</Button>
      </div>
    )
  }
}
