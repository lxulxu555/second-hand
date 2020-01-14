import React, {Component} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import {
    Input,
    Button,
    Form,
    Icon,
    message, Row, Col,
} from 'antd'
import logo from './images/logo.png'
import './forget.less'
import {reqChangePassword, reqSendVerification,reqFindEmailByName} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import storageUtilsToken from "../../utils/storageUtils-token";

class Login extends Component {

    state = {
        btnText: '邮箱发送验证码',
        btnBool: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const username = values.username
                const password = values.password
                const email = values.email
                const code = values.Verification
                const result = await reqChangePassword(username,password,email,code)
                if(result.code === 0){
                    message.success('修改成功')
                    storageUtils.RemoveUser()
                    memoryUtils.user = {}
                    storageUtilsToken.RemoveToken()
                    memoryUtils.token = {}
                    this.props.history.replace('/home')
                    window.location.reload()
                }else {
                    message.error(result.msg)
                }
            }
        });
    }

    Verification = async () => {
        clearInterval(this.timer)
        let maxTime = 60
        let email = document.getElementById('email').value
        let flag = 'change'
        let username = document.getElementById('username').value
        const result1 = await reqFindEmailByName(username)
        if(result1 === email){
            const result = await reqSendVerification(email,flag)
            if(result.code === 0){
                this.timer = setInterval(() => {
                    if (maxTime > 0) {
                        --maxTime
                        this.setState({
                            btnText: '重新获取' + maxTime,
                            btnBool: true
                        })
                    } else {
                        this.setState({
                            btnText: '邮箱发送验证码',
                            btnBool: false
                        })
                    }
                }, 1000)
            }else{
                message.error(result.msg)
            }
        }else{
            message.error('用户没有绑定该邮箱')
        }
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18},
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <Link to='/home'>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className="login-content1">
                    <h2>Eurasia二手交易平台</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item  {...formItemLayout} label='用户名'>
                            {
                                getFieldDecorator('username', {
                                    initialValue: '',
                                    rules: [
                                        {required: true, whiteSpace: true, message: '用户名必须输入'},
                                        {min: 2, message: '用户名最少为4位'},
                                        {max: 12, message: '用户名最多为12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文数字和下划线组成'}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="Username"
                                    />,
                                )
                            }
                        </Form.Item>
                        <Form.Item  {...formItemLayout} label='新密码'>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {required: true, whiteSpace: true, message: '密码必须输入'},
                                        {min: 2, message: '密码最少为四位'},
                                        {max: 12, message: '密码最多为十二位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文字母数字下划线组成'}
                                    ]
                                })(
                                    <Input.Password
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="Password"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="邮箱" {...formItemLayout}>
                            {
                                getFieldDecorator('email', {
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

                        <Form.Item label="验证码" {...formItemLayout}>
                            <Row gutter={8}>
                                <Col span={12}>
                                    {
                                        getFieldDecorator('Verification', {
                                            rules: [
                                                {required: true, message: '验证码不能为空'},
                                            ]
                                        })(
                                            <Input
                                                placeholder="验证码"
                                            />,
                                        )
                                    }
                                </Col>
                                <Col span={12}>
                                    <Button
                                        onClick={() => this.Verification()}
                                        disabled={this.state.btnBool}
                                    >
                                        {this.state.btnText}
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                                确认
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Login)
export default withRouter(WrapLogin)





