import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Routes from '../config/router'

import {Layout, Row, Col, Menu} from 'antd'
import style from './App.scss'
const {Header, Content, Footer} = Layout;

export default class App extends Component {
  render() {
    return (<Layout className={style.app}>
      <Header className={style.header}>
        <Row type='flex' justify='space-between'>
          <Col>
            <Link to='/'><div className={style.logo}>M-node</div></Link>
          </Col>
          <Col>
            <Menu
              mode="horizontal"
              style={{lineHeight: '64px'}}
              theme='dark'>
                <Menu.Item style={{backgroundColor:'#001529'}} key='login'>
                  <Link to='/login'>Login</Link>
                </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content className={style.content}><Routes/></Content>
      <Footer></Footer>
    </Layout>)
  }
}
