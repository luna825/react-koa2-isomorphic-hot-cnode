import React, {Component} from 'react'
import {connect} from 'react-redux'
import {increment} from '../../redux/modules/count'
@connect(
  state => ({count: state.count}),
  {increment}
)
export default class TopicList extends Component {
  render(){
    const {increment, count} = this.props
    return(
      <div>
        <div>this is topic list page</div>
        <button onClick={increment}>{count}</button>
      </div>
    )
  }
}
