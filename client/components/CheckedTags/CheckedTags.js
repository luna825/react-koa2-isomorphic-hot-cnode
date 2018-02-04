import React from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router'
import { Tag } from 'antd'

class CheckedTags extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      select: this.props.currentTab
    }
  }

  static propTypes = {
    tabs: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  //地址跳转和设置相应的tab
  handleOnClick = (value) => {
    this.props.history.push({
      pathname: '/index',
      search: `?tab=${value}`
    })
    this.setState({
      select: value
    })
  }

  render() {
    const {tabs} = this.props
    return(
    <div>
      {Object.keys(tabs).map(tab=>
        <Tag
        key={tab}
        onClick={()=>this.handleOnClick(tab)}
        color={tab === this.state.select ? '#87d068' : ''}
        style={{border:0, fontSize:'14px', marginRight:'20px'}}
        >
          {tabs[tab]}
        </Tag>
      )}
    </div>)
  }
}

export default withRouter(CheckedTags)
