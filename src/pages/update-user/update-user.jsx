import React, {Component} from 'react'
import {Form, Input} from "antd";
import PropTypes from 'prop-types'

import UpdateImage from './upload-image'
import memoryUtils from '../../utils/memoryUtils'

class UpdateUser extends Component{



    static propTypes = {
        setForm : PropTypes.func.isRequired,
    }

   /* constructor(props){
        super(props)
        this.pw = React.createRef()
    }*/


    componentWillMount () {
        this.props.setForm(this.props.form)
    }

   /* componentDidMount () {
        const images = this.pw.current.GetImgs()
        this.setState({
            images
        })
        console.log('ssss',this.state.images)
    }*/


    getImageUrl = (url) =>  {
        console.log("121333"+url)
        this.props.callBack(url)
    }

    render () {

        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span: 10 },
        };

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
            <Form>
                <Form.Item label='我的头像: ' {...formItemLayout}>
                  {/*  <UpdateImage callBack={this.getImageUrl.bind(this)}/>*/}
                    <UpdateImage
                        callBack = {(url) => this.getImageUrl(url)}
                    />
                </Form.Item>
                <Form.Item label='用户名' {...formItemLayout}>
                    {getFieldDecorator('username', {
                        initialValue : memoryUtils.user.username,
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder='password'/>
                    )}
                </Form.Item>
                <Form.Item label='密码' {...formItemLayout}>
                    {getFieldDecorator('password', {
                        initialValue : memoryUtils.user.password,
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input type='password' placeholder='password'/>
                    )}
                </Form.Item>
                <Form.Item label='手机号' {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue : memoryUtils.user.phone,
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input placeholder='phone'/>
                    )}
                </Form.Item>
            </Form>
            </div>
        )
    }
}

export default Form.create()(UpdateUser)
