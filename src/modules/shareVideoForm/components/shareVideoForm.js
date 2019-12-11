import React, { useState, useEffect } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import { Form, Input, Button, Row} from 'antd';
import LoginBox from '../../Auth/components/LoginBox'
import { ADD_MOVIE } from '../store/gql'


const ShareBox = (props) => {
    
    const [addMovie] = useMutation(ADD_MOVIE)

    const validateURL = (rule, value, callback) =>{
 
        if( value && !(value.includes("www.youtube.com/watch?v="))){
            callback("Please enter a valid URL! example: [ https://www.youtube.com/watch?v=XXXXX]");
        } else {
            callback();
          }
    }

    const onSubmit = e => {
        e.preventDefault();
        
        props.form.validateFields(async (err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            if( values.url.includes("www.youtube.com/watch?v=")){
            const videoID = values.url.split("=")[1]
            const username = localStorage.getItem('username')
            const variables = {
                movieID: videoID,
                sharedBy: username
            }
            try { 
               await addMovie({ variables: variables })
               window.location.href="/"
            } catch (e) {
              console.log(e)
            }
            }
          }
        });
      }
    const { getFieldDecorator, getFieldError, isFieldTouched } = props.form

    const urlError = isFieldTouched('url') && getFieldError('url')

    return(
        <div >
        <LoginBox />
        <Row type="flex" justify="space-around" align="middle" 
         style={
            {
              paddingTop: "200px",
            }
          }
        
        >
        <div style={
          {
            border:"2px solid black",
            padding: "70px 0",
            paddingLeft: "30px",
            paddingRight: "30px",
            maxWidth: "500px",
            
          }
        }>
         <h4  
         style={
            {
                marginTop:"-86px",
                background:"white",
                marginLeft:"10px",
                width:"140px",
                marginBottom: "40px",
            }
        }
         > Share a youtube URL </h4>   
        <Form layout="inline" onSubmit={onSubmit} style={{textAlign: "center"}}>

        <Form.Item validateStatus={urlError ? 'error' : ''} label="Share URL">
          {getFieldDecorator('url', {
            rules: [
              {
                 validator: validateURL
              },
              {
                required: true,
                message: 'Please input your video URL!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Share
          </Button>
        </Form.Item>
        </Form>

        </div>
        </Row>
        </div>
    )


}
const ShareBoxForm = Form.create({ name: 'share' })(ShareBox)
export default ShareBoxForm