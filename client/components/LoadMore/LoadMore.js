import React from 'react'
import PropTypes from 'prop-types'
import {Spin ,Icon} from 'antd'
//加载按键样式
const btnStyle ={
  borderRadius: '20px',
  width: '60%',
  border: '1px solid #ef9a9a',
  cursor: 'pointer',
  outline: 'none'
}
export default class LoadMore extends React.Component {
  constructor(props){
    super(props)
  }
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    onLoadMore : PropTypes.func.isRequired
  }
  render(){
    const {loading, onLoadMore} = this.props
    return(
      <div style={{textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px'}}>
          <button style={btnStyle} onClick={onLoadMore} disabled={loading}>
              {loading?
                <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} /> :
                '阅读更多'
              }
          </button>
      </div>
    )
  }
}
