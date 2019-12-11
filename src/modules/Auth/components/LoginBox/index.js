import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Form, Icon, Input, Button, Row, Col, Typography, Alert} from 'antd';

import { LOGIN } from '../../store/gql'

const LoginBox = (props) => {

  const {Title} = Typography
  const [login] = useMutation(LOGIN)
  const [isSubmitting, setSubmitting] = useState(false)
  const [isLogedIn, setLogin] = useState("")
  const [error, setError] = useState(false)
  const client = useApolloClient()
  const onLogin = e => {
    e.preventDefault();
    setSubmitting(true)
    
    props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        try { 
          const response = await login({ variables: {...values} })
          const token = response.data.login.token
          console.log('response', response)
          client.writeData({ data: { token }})
          await localStorage.setItem('token', token)
          await localStorage.setItem('username', values.username)
          setLogin(values.username)
          await window.location.reload(false);
        } catch (e) {
          console.log(e.message.split(':')[1])
          console.log('hereeeeee')
          setError(e.message.split(':')[1]+" please check username or password")
        }
        setSubmitting(false)
      }
    });
  }

  const onLogout = async(e) =>{
    await localStorage.removeItem('token')
    await localStorage.removeItem('username')
    setLogin(false)
    await window.location.reload(false); //dumb way to reload but there is no proper way to useEffect on localStorage 
  }

  useEffect(() => {
    setLogin(localStorage.getItem('username'))
  },[props.isLogedIn]); 


  const { getFieldDecorator, getFieldError, isFieldTouched } = props.form

  const usernameError = isFieldTouched('username') && getFieldError('username');
  const passwordError = isFieldTouched('password') && getFieldError('password')

  return (
    
    <div className="loginBar" style={{textAlign: "center"}}>
    <Row type="flex" justify="space-around" align="middle" >
    <Col span={8} >
       <Row > 
       <Col span={2} align="right">
            <Icon type="home" /> 
       </Col>
       <Col span={22}>           
          <Title level={2}> 
        
          Funny Movies
          
          </Title>
       </Col>
       </Row>  
    </Col>
    <Col span={16}>
       { isLogedIn
          ?
        <Row type="flex" justify="space-around" align="middle" >
                <Col span={8} >
                    <p> Welcome {isLogedIn}</p>
                </Col>
           <Col span={8} >
                <Button type="primary" href="/shareURL">
                        Share A Movie
                </Button>
           </Col> 
           <Col span={8} >
                <Button type="default" onClick={onLogout}  >
                        Log Out
                 </Button>
          </Col>  
        </Row>
        : 
    <Form layout="inline" onSubmit={onLogin}>
      <Form.Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
        {getFieldDecorator('username', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
          />
        )}

      </Form.Item>
      <Form.Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
      {getFieldDecorator('password', {
        rules: [{ required: true, message: 'Please input your Password!' }],
      })(
        <Input
          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
          type="password"
          placeholder="Password"
        />,
      )}
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" disabled={isSubmitting}>
        Log in / Register
      </Button>
      </Form.Item>
      </Form>
}
    </Col>
    </Row>
    <Row>
      {error ? 
      <Alert message={error} type="error" closable />
      :
      <p></p>
      }
    </Row>
    </div>
  )
}

const LoginBoxForm = Form.create({ name: 'login' })(LoginBox)

export default LoginBoxForm
