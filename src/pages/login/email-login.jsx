import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {
    Input,
    Button,
    Form,
    Icon,
    message, Row, Col,
} from 'antd'
import logo from './images/logo.png'
import './email-login.less'
import {reqEmailLogin, reqSendVerification} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class Login extends Component {

    state = {
        btnText: '邮箱发送验证码',
        btnBool: false,
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const email = values.email
                const code = values.Verification
                const result = await reqEmailLogin(email, code)
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

    Verification = async () => {
        clearInterval(this.timer)
        let maxTime = 60
        let email = document.getElementById('email').value
        const result = await reqSendVerification(email)
        if (result.code === 0) {
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
        } else {
            message.error(result.msg)
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
                    <h2>Eurasia快速登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
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





