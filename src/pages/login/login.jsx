import React,{Component} from 'react'
import {Link,withRouter,Redirect} from 'react-router-dom'
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
import storageUtilsToken from '../../utils/storageUtils-token'
import {reqLogin} from '../../api/index'

class Login extends Component{

    state = {
        user : {},
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const username = values.username
                const password = values.password
                const result = await reqLogin(username,password)
                if(result.code===0){
                    const user = result
                    memoryUtils.user = user.data
                    storageUtils.SaveUser(user.data)
                    memoryUtils.token = user.token
                    storageUtilsToken.SaveToken(user.token)
                    message.success('登录成功')
                    this.props.history.replace('/home')
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
        const user = memoryUtils.user
        if(user && user.id){
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
                                getFieldDecorator('username',{
                                    initialValue:'',
                                    rules : [
                                        {required:true,whiteSpace:true,message:'用户名必须输入'},
                                        {min:2,message:'用户名最少为4位'},
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
                        <Form.Item  {...formItemLayout} label='密码'>
                                    {
                                        getFieldDecorator('password',{
                                            rules: [
                                                {required: true,whiteSpace: true,message:'密码必须输入'},
                                                {min:2,message:'密码最少为四位'},
                                                {max:12,message:'密码最多为十二位'},
                                                {pattern: /^[a-zA-Z0-9_]+$/,message:'密码必须是英文字母数字下划线组成'}
                                            ]
                                        })(
                                            <span>
                                            <Input.Password
                                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                                type="password"
                                                placeholder="Password"
                                            />
                                            <a href='/forget'>忘记密码</a>
                                            </span>
                                        )
                                    }
                        </Form.Item>

                        <Form.Item style={{marginTop:-20}}>
                            <Button type="primary" htmlType="submit"  style={{width:100}}>
                                登录
                            </Button>
                            <Button
                                type="primary"
                                style={{marginLeft:100,width:100}}
                                onClick={() => this.props.history.replace('/register')}
                            >
                                注册
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





