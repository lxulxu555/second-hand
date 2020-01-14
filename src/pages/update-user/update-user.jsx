import React, {Component} from 'react'
import {Form, Icon, Input,Button} from "antd";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

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
                <Form.Item label="邮箱" {...formItemLayout}>
                    {
                        getFieldDecorator('email', {
                            initialValue : memoryUtils.user.email,
                            rules: [
                                {
                                    pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/,
                                    message: '请输入正确邮箱'
                                }
                            ]
                        })(
                            <Input
                                prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                placeholder="Email"
                                id='email'
                            />,
                        )
                    }
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
                <Form.Item label='修改密码' {...formItemLayout}>
                    {getFieldDecorator('phone')(
                        <Button type='dashed' onClick={() => this.props.history.replace('/forget')}>修改密码</Button>
                    )}
                </Form.Item>
            </Form>
            </div>
        )
    }
}

const form =  Form.create()(UpdateUser)
export default withRouter(form)
