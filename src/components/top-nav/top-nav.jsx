import React,{Component} from 'react'
import {Menu,Avatar,Modal,message} from "antd"
import {Link,withRouter} from 'react-router-dom'

import './top-nav.less'
import LinkButton from '../link-button/link-button'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import storageUtilsToken from '../../utils/storageUtils-token'
import UpdateUser from '../../pages/update-user/update-user'
import {reqUpdateUser} from '../../api/index'

const SubMenu = Menu.SubMenu

class TopNav extends Component{

    state = {
        ShowUpdate : false,
        user : {},
        image : ''
    }


    GoLogin = () => {
        this.props.history.replace('/login')
    }

    LoginOut = () => {
        Modal.confirm ({
            title: '确认退出吗',
            onOk :() => {
                //console.log('ok',this);
                storageUtils.RemoveUser()
                memoryUtils.user = {}
                storageUtilsToken.RemoveToken()
                memoryUtils.token = {}
                message.success('退出成功')
                this.props.history.replace('/home')
                window.location.reload()
            },
        })
    }

    UpdateUser = () => {

        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    ShowUpdate : false
                })
                const user = this.state.user
                user.id = memoryUtils.user.id
                user.img = this.state.image
                user.password = values.password
                user.username = values.username
                user.phone = values.phone
                const result = await reqUpdateUser(user)
                memoryUtils.user = user
                storageUtils.SaveUser(user)
                if(result.id){
                    message.success('更新成功')
                    this.props.history.replace('/home')
                    this.form.resetFields()
                }else{
                    message.error(result.msg)
                }
            }
        });
    }


    getHeaderUrl(url){
        this.setState({
            image : url
        })
    }
    render () {
        let path = this.props.location.pathname
        const user = memoryUtils.user
        const {ShowUpdate} = this.state
        console.log(path)

        return (
            <div>
                <Link to='/home'>
                <div className="logo"/>
                </Link>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[path]}
                    style={{ lineHeight: '64px' ,float:'left'}}
                >
                    <Menu.Item key="/home">
                        <Link to='/home'>
                        首页
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/wantbuy">
                        <Link to='/wantbuy'>
                        求购
                        </Link>
                    </Menu.Item>
                </Menu>
                {
                    user ? (
                        <span>
                        <LinkButton
                            style={{float:'right',marginRight:'15px'}}
                            onClick = {() => {this.setState({
                                ShowUpdate : true
                            })}}
                        >
                            {
                                memoryUtils.user.img
                                    ? <Avatar icon="user" className='avatar' src={memoryUtils.user.img}/>
                                    : <Avatar icon="user" className='avatar' src='https://api.youzixy.com/public/uploads/avatar/default1.png'/>
                            }
                        </LinkButton>
                            <LinkButton style={{float:'right',marginRight:'15px',pointerEvents:'none'}} >
                                  欢迎您{user.username}
                            </LinkButton>
                        <LinkButton
                            style={{float:'right',marginRight:'15px'}}
                            onClick={this.LoginOut}
                        >
                            退出账户
                        </LinkButton>

                        </span>
                    ) : (
                        <LinkButton
                            onClick={this.GoLogin}
                            style={{float:'right',marginRight:'15px'}}
                        >
                            登录/注册
                        </LinkButton>
                    )
                }

                {
                    memoryUtils.user
                        ?    <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{ lineHeight: '64px' ,float:'right',marginRight:30}}
                        >
                            <SubMenu key="/user" title="个人中心" >
                                <Menu.Item key="/user-detail" >
                                    <Link to='/user-detail'>
                                        我的商品
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/user-buy-detail">
                                    <Link to='/user-buy-detail'>
                                        我的求购
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu> : ''
                }

                {
                    memoryUtils.user
                        ?    <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{ lineHeight: '64px' ,float:'right',marginRight:30}}
                        >
                            <SubMenu key="/product" title="发布" >
                                <Menu.Item key="product">
                                    <Link to='/product'>
                                        发布商品
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="/putbuy">
                                    <Link to='/putbuy'>
                                        发布求购
                                    </Link>
                                </Menu.Item>
                            </SubMenu>
                        </Menu> : ''
                }

                <Modal
                    title="个人信息"
                    visible={ShowUpdate}
                    onOk={this.UpdateUser}
                    onCancel={() => {
                        this.setState({
                            ShowUpdate : false
                        })
                        this.form.resetFields()
                    }}
                >


                    <UpdateUser
                        setForm = {(form) => {this.form = form}}
                        callBack = {this.getHeaderUrl.bind(this)}
                    />
                </Modal>
            </div>
        )
    }
}

export default withRouter(TopNav)


