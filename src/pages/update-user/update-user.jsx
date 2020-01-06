import React, {Component} from 'react'
import {Form, Input} from "antd";
import PropTypes from 'prop-types'

import UpdateImage from './upload-image'
import memoryUtils from '../../utils/memoryUtils'

class UpdateUser extends Component{



    static propTypes = {
        setForm : PropTypes.func.isRequired,
    }


    componentWillMount () {
        this.props.setForm(this.props.form)
    }




    getImageUrl = (url) =>  {
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
            <Form onSubmit={this.handleSubmit}  >
                <Form.Item label='我的头像: ' {...formItemLayout}>
                    <UpdateImage
                        callBack = {(url) => this.getImageUrl(url)}
                    />
                </Form.Item>
                <Form.Item label='用户名' {...formItemLayout}>
                    {getFieldDecorator('username', {
                        initialValue : memoryUtils.user.username,
                    })(
                        <Input placeholder='UserName' disabled/>
                    )}
                </Form.Item>
                <Form.Item label='密码' {...formItemLayout}>
                    {getFieldDecorator('password', {
                        initialValue : memoryUtils.user.password,
                        rules: [
                            {required: true,whiteSpace: true,message:'密码必须输入'},
                            {min:4,message:'密码最少为四位'},
                            {max:32,message:'密码最多为三十二位'},
                            {pattern: /^[a-zA-Z0-9_]+$/,message:'密码必须是英文字母数字下划线组成'}
                        ]
                    })(
                        <Input type='password' placeholder='PassWord'/>
                    )}
                </Form.Item>
                <Form.Item label='手机号' {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue : memoryUtils.user.phone,
                        rules : [
                            {min:11,message:'手机号最少为11位'},
                            {max:11,message:'手机号最多为11位'},
                            {pattern:/^[0-9_]+$/,message:'手机号必须为数字'}
                        ]
                    })(
                        <Input placeholder='Phone' addonBefore='+86'/>
                    )}
                </Form.Item>
            </Form>
            </div>
        )
    }
}

export default Form.create()(UpdateUser)
