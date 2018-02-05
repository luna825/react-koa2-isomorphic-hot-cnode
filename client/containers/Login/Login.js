import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, Form, Input, Button, Icon} from 'antd'
import {login} from '../../redux/modules/auth'
const FormItem = Form.Item
@Form.create()
@connect(state => ({auth: state.auth}), {login})
export default class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      auth,
      login,
      history,
      location,
      form: {
        validateFields,
        setFields
      }
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        const {token} = values
        login(token).then(result => {
          if(result){
            setFields({token:{value:values.token, errors:[new Error(result)]}})
          }else{
            const { from } = this.props.location.state || { from: { pathname: '/' } }
            history.push(from)
          }
        })
      }
    })
  }
  render() {
    const {auth} = this.props
    const {getFieldDecorator } = this.props.form

    return (<div>
      <Card type='inner' title='登录'>
        <Form onSubmit={this.handleSubmit} layout='horizontal'>
          <FormItem label='AccessToken' labelCol={{
              span: 4
            }} wrapperCol={{
              span: 14
            }}>
            {
              getFieldDecorator('token', {
                rules: [
                  {
                    required: true,
                    message: '请输入你cnode的accesstoken'
                  }
                ]
              })(<Input placeholder='access with token'></Input>)
            }
          </FormItem>
          <FormItem wrapperCol={{
              offset: 4
            }}>
            <Button disabled={auth.logining} type='primary' htmlType="submit">
              {
                auth.logining
                  ? <Icon type="loading"/>
                  : 'Login'
              }
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>)
  }
}
// 6e190f7c-32b3-44d2-a37e-e49680b24c8f
