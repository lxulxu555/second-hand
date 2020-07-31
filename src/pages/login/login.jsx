import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {
    Input,
    Button,
    Form,
    Icon,
    Row, Col,Radio
} from 'antd'
import logo from './images/logo.png'
import './login.less'
import LinkButton from "../../components/link-button/link-button";
import {QqOutlined} from '@ant-design/icons'
import {LoginUser, ForgetUser, QQLogin,register} from '../../redux/action/user'
import {connect} from 'react-redux'
import {reqSendVerification} from "../../api";

class Login extends Component {

    state = {
        user: {},
        type: 'login',
        btnText: '邮箱发送验证码',
        btnBool: true,
    }

    Verification = async () => {
        clearInterval(this.timer)
        const {type} = this.state
        let maxTime = 60
        let email = document.getElementById('email').value
        const flag = type === 'register' ? '注册' : ''
        const result = await reqSendVerification(email,flag)
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
        }
    }

    SubmitEmail = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.props.login('', () => {
                    this.props.history.push('/')
                }, values)
            }
        });
    }

    SubmitForget = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.props.forGetUser(values, () => {
                    this.setState({
                        type: 'login'
                    })
                })
            }
        });

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.props.login(values, () => {
                    this.props.history.push('/')
                })
            }
        });
    }

    SubmitRegister = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                this.props.Register(values, () => {
                    this.setState({
                        type: 'login'
                    })
                })
            }
        });
    }

    GoQQLogin = () => {
        this.props.QQLogin(() => {
            this.props.history.push('/')
        })
    }

    backLogin = () => {
        this.setState({
            type: 'login',
            btnBool: true
        })
    }

    changeType = (type) => {
        this.setState({
            type: type === 'email' ? 'email' : type === 'forget' ? 'forget' : 'register'
        })
    }

    onChangeEmail = (e) => {
        const parten = /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/
        if(parten.test(e)){
            this.setState({
                btnBool: false
            })
        }else{
            this.setState({
                btnBool: true
            })
        }
    }


    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18},
        };
        const {getFieldDecorator} = this.props.form;
        const {type} = this.state
        return (
            <div className="login">
                <div className="login-header">
                    <Link to='/home'>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className='content'>
                    <div className="login-content" style={type === 'forget' ? {height: 400} : type === 'register' ? {height:500} : {height: 300}}>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            {
                                type === 'login' ? <div/> :
                                    <Icon type="arrow-left" className='left-icon-father'
                                          onClick={() => this.backLogin()}/>
                            }
                            <h2>Eurasia二手交易平台</h2>
                        </div>
                        {
                            type === 'login' ?
                                <div>
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
                                                onPressEnter={this.handleSubmit}
                                            />
                                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                            <LinkButton onClick={() => this.changeType('forget')}>忘记密码</LinkButton>
                                            <LinkButton
                                                style={{marginLeft: '10%'}}
                                                onClick={() => this.changeType('email')}>使用邮箱登录</LinkButton>
                                            </div>
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
                                                onClick={() => this.changeType('register')}
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
                                </div> :
                                type === 'forget' ?
                                    <Form onSubmit={this.SubmitForget} className="login-form">
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
                                                        onChange={(event => {
                                                            this.onChangeEmail(event.target.value)
                                                        })}
                                                    />,
                                                )
                                            }
                                        </Form.Item>

                                        <Form.Item label="验证码" {...formItemLayout}>
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    {
                                                        getFieldDecorator('code', {
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
                                    : type === 'email' ? <div>
                                        <Form onSubmit={this.SubmitEmail} className="login-form">
                                            <Form.Item label="邮箱" {...formItemLayout}>
                                                {
                                                    getFieldDecorator('email', {
                                                        rules: [
                                                            {
                                                                pattern: /[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/,
                                                                message: '请输入正确邮箱'
                                                            },
                                                        ]
                                                    })(
                                                        <Input
                                                            prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                                            placeholder="Email"
                                                            onChange={(event => {
                                                                this.onChangeEmail(event.target.value)
                                                            })}
                                                        />,
                                                    )
                                                }
                                            </Form.Item>

                                            <Form.Item label="验证码" {...formItemLayout}>
                                                <Row gutter={8}>
                                                    <Col span={12}>
                                                        {
                                                            getFieldDecorator('code', {
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
                                    </div> :  <Form onSubmit={this.SubmitRegister} className="login-form">
                                        <Form.Item label='用户名'  {...formItemLayout}>
                                            {
                                                getFieldDecorator('username',{
                                                    initialValue:'',
                                                    rules : [
                                                        {required:true,whiteSpace:true,message:'用户名必须输入'},
                                                        {min:4,message:'用户名最少为4位'},
                                                        {max:12,message:'用户名最多为12位'},
                                                        {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文数字和下划线组成'}
                                                    ]
                                                })(
                                                    <Input
                                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                        placeholder="Username"
                                                    />,
                                                )
                                            }
                                        </Form.Item>

                                        <Form.Item label='密码' {...formItemLayout} >
                                            {
                                                getFieldDecorator('password',{
                                                    rules: [
                                                        {required: true,whiteSpace: true,message:'密码必须输入'},
                                                        {min:4,message:'密码最少为四位'},
                                                        {max:12,message:'密码最多为十二位'},
                                                        {pattern: /^[a-zA-Z0-9_]+$/,message:'密码必须是英文字母数字下划线组成'}
                                                    ]
                                                })(
                                                    <Input.Password
                                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                        type="password"
                                                        placeholder="Password"
                                                    />,
                                                )
                                            }
                                        </Form.Item>

                                        <Form.Item label='手机号' {...formItemLayout}>
                                            {
                                                getFieldDecorator('phone',{
                                                    rules : [
                                                        {min:11,message:'手机号最少为11位'},
                                                        {max:11,message:'手机号最多为11位'},
                                                        {pattern:/^[0-9_]+$/,message:'手机号必须为数字'}
                                                    ]
                                                })(
                                                    <Input
                                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                        placeholder="Phone"
                                                        addonBefore='+86'
                                                    />,
                                                )
                                            }
                                        </Form.Item>

                                        <Form.Item label="邮箱" {...formItemLayout}>
                                            {
                                                getFieldDecorator('email',{
                                                    rules : [
                                                        {pattern:/[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}/,message:'请输入正确邮箱'}
                                                    ]
                                                })(
                                                    <Input
                                                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                        placeholder="Email"
                                                        onChange={(event => {
                                                            this.onChangeEmail(event.target.value)
                                                        })}
                                                    />,
                                                )
                                            }
                                        </Form.Item>

                                        <Form.Item label="验证码" {...formItemLayout}>
                                            <Row gutter={8}>
                                                <Col span={12}>
                                                    {
                                                        getFieldDecorator('code',{
                                                            rules:[
                                                                {required: true,message:'验证码不能为空'},
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

                                        <Form.Item label='性别' {...formItemLayout}>
                                            <Radio.Group
                                                value={this.state.sex}
                                                onChange = {event => this.setState({
                                                    sex : event.target.value,
                                                })}
                                            >
                                                <Radio value='男'>男</Radio>
                                                <Radio value='女'>女</Radio>
                                            </Radio.Group>
                                        </Form.Item>

                                        <Form.Item>
                                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:'100%',marginBottom:-20}}>
                                                注册
                                            </Button>
                                        </Form.Item>

                                    </Form>

                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = (dispatch) => ({
    login: (user, callback, emailUser) => dispatch(LoginUser(user, callback, emailUser)),
    forGetUser: (user, callback) => dispatch(ForgetUser(user, callback)),
    QQLogin: (callback) => dispatch(QQLogin(callback)),
    Register : (user,callback) => dispatch(register(user,callback))
})

const WrapLogin = Form.create()(Login)
const Router = withRouter(WrapLogin)
export default connect(mapStateToProps, mapDispatchToProps)(Router)





