import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {
    Input,
    Button,
    Form,
    Icon,
    message,
    Radio
} from 'antd'
import {reqRegister} from '../../api/index'

import logo from './images/logo.png'
import './register.less'


class Register extends Component{

    state = {
        user : {},
        sex: '男'
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const user = this.state.user
                user.sex = this.state.sex
                user.username = values.username
                user.password = values.password
                user.phone = values.phone
                const result = await reqRegister(user)
                if(result.success===1){
                    message.success('注册成功')
                    this.props.history.replace('/login')
                }else{
                    message.error(result.msg)
                }
                }
        });
    }





    render () {
        const formItemLayout = {
            labelCol: { span: 5},
            wrapperCol: { span: 18 },
        };

        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login">
                <div className="login-header">
                    <Link to='/home'>
                        <img src={logo} alt='logo'/>
                    </Link>
                </div>
                <div className="register-content">
                    <h2>Eurasia二手交易平台</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
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

                        <Form.Item label='密码' {...formItemLayout}>
                            {
                                getFieldDecorator('password',{
                                    rules: [
                                        {required: true,whiteSpace: true,message:'密码必须输入'},
                                        {min:4,message:'密码最少为四位'},
                                        {max:12,message:'密码最多为十二位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/,message:'密码必须是英文字母数字下划线组成'}
                                    ]
                                })(
                                    <Input
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
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{width:100}}>
                                注册
                            </Button>
                            <Button type="primary"
                                    className="login-form-button"
                                    style={{marginLeft:100,width:100}}
                                    onClick={() => this.props.history.replace('/login')}
                            >
                               已有账户
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>
        )
    }
}

const WrapLogin = Form.create()(Register)
export default withRouter(WrapLogin)






