import React, {Component} from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import {
    Input,
    Button,
    Form,
    Icon,
    message,
} from 'antd'
import logo from './images/logo.png'
import './login.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqLogin} from '../../api/index'
import {QqOutlined} from '@ant-design/icons'

class Login extends Component {

    state = {
        user: {},
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const username = values.username
                const password = values.password
                const result = await reqLogin(username, password)
                if (result.code === 0) {
                    const user = result.data
                    memoryUtils.user = user
                    storageUtils.SaveUser(user)
                    message.success('登录成功')
                    this.props.history.replace('/home')
                } else {
                    message.error(result.msg)
                }
            }
        });
    }


    GoQQLogin = () => {
        const QQUrl = 'http://eurasia.plus:8800/api/user/qqLogin'
        // 弹出 500 * 500 的窗口
        window.open(QQUrl, 'newwindow', 'height=500, width=500, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no')

        // 通过监听，父页面可以拿到子页面传递的token，父(前端页面)，子(小窗)
        window.addEventListener('message', function (e) {
            const data = JSON.parse(e.data)
            const user = data.data
            user.user["img"] = user.user.img.replace(/amp;/g, "")
            memoryUtils.user = user
            storageUtils.SaveUser(user)
            message.success('登录成功')
            window.location.href = '/home';
        }, false);
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18},
        };
        const {getFieldDecorator} = this.props.form;
        const user = memoryUtils.user ? memoryUtils.user.user : ''
        if (user && user.id) {
            return <Redirect to='/home'/>
        }
        return (
            <div className="login">
                <div className="login-header">
                    <Link to='/home'>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className="login-content">
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
                        <Form.Item  {...formItemLayout} label='密码'>
                            {
                                getFieldDecorator('password', {
                                    rules: [
                                        {required: true, whiteSpace: true, message: '密码必须输入'},
                                        {min: 2, message: '密码最少为四位'},
                                        {max: 12, message: '密码最多为十二位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文字母数字下划线组成'}
                                    ]
                                })(
                                    <span>
                                            <Input.Password
                                                prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                type="password"
                                                placeholder="Password"
                                            />
                                            <a href='/forget'>忘记密码</a>
                                            <a href='/email-login' style={{marginLeft: '40%'}}>使用邮箱登录</a>
                                            </span>
                                )
                            }
                        </Form.Item>

                        <Form.Item style={{marginTop: -30}}>
                            <Button type="primary" htmlType="submit" style={{width: 100}}>
                                登录
                            </Button>
                            <Button
                                type="primary"
                                style={{marginLeft: 100, width: 100}}
                                onClick={() => this.props.history.replace('/register')}
                            >
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{marginTop: -20, color: '#808080'}}>
                        其他登录方式：
                        <QqOutlined
                            onClick={() => this.GoQQLogin()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Login)
export default withRouter(WrapLogin)





