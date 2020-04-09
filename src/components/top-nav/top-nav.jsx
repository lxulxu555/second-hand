import React, {Component} from 'react'
import {Menu, Avatar, Modal, message, Icon, Popover} from "antd"
import {Link, withRouter} from 'react-router-dom'

import './top-nav.less'
import LinkButton from '../link-button/link-button'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import UpdateUser from '../../pages/update-user/update-user'
import {reqUpdateUser, reqLookUserReplay} from '../../api/index'
import Page from '../../utils/page'

const SubMenu = Menu.SubMenu

class TopNav extends Component {

    state = {
        ShowUpdate: false,
        image: '',
        message: '',
        user: {}
    }

    getLookUserReplay = async () => {
        const id = memoryUtils.user ? memoryUtils.user.user.id : ''
        const result = await reqLookUserReplay(id)
        if (result !== this.state.message && result.code !== -1) {
            this.setState({message: result})
        }
    }


    GoLogin = () => {
        this.props.history.replace('/login')
    }

    LoginOut = () => {
        Modal.confirm({
            title: '确认退出吗',
            onOk: () => {
                //console.log('ok',this);
                storageUtils.RemoveUser()
                memoryUtils.user = {}
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
                    ShowUpdate: false
                })
                const user = this.state.user
                user.id = memoryUtils.user.user.id
                user.img = this.state.image
                user.password = values.password
                user.nickname = values.nickname
                user.email = values.email
                user.phone = values.phone
                const result = await reqUpdateUser(user)
                memoryUtils.user = user
                storageUtils.SaveUser(user)
                if (result.id) {
                    message.success('更新成功')
                    this.props.history.replace('/home')
                    this.form.resetFields()
                } else {
                    message.error(result.msg)
                }
            }
        });
    }


    getHeaderUrl(url) {
        this.setState({
            image: url
        })
    }

    componentWillMount() {
        this.getLookUserReplay()
    }

    componentDidUpdate() {
        this.getLookUserReplay()
    }


    render() {
        const message = this.state.message
        let path = this.props.location.pathname
        const user = memoryUtils.user ? memoryUtils.user.user : ''
        const {ShowUpdate} = this.state

        return (
            <div>
                <div className="logo" onClick={() => {
                    this.props.history.replace('/')
                    Page.SavePage(1)
                }} style={{cursor: 'pointer'}}/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[path]}
                    style={{lineHeight: '64px', float: 'left'}}
                >
                    <Menu.Item key="/home" onClick={() => {
                        this.props.history.replace('/home')
                        Page.SavePage(1)
                    }}>
                        首页
                    </Menu.Item>
                    <Menu.Item key="/wantbuy">
                        <Link to='/wantbuy'>
                            求购
                        </Link>
                    </Menu.Item>
                </Menu>

                {
                    user !== '' ? (
                        <span>
                        <LinkButton
                            style={{float: 'right', marginRight: '15px'}}
                            onClick={() => {
                                this.setState({
                                    ShowUpdate: true
                                })
                            }}
                        >
                            {
                                memoryUtils.user.user.img
                                    ? <Popover content={<span>更新自己的个人信息</span>}><Avatar icon="user" className='avatar'
                                                                                        src={memoryUtils.user.user.img}/></Popover>
                                    : <Avatar icon="user" className='avatar'
                                              src='https://api.youzixy.com/public/uploads/avatar/default1.png'/>
                            }
                        </LinkButton>
                            <LinkButton style={{float: 'right', marginRight: '15px', pointerEvents: 'none'}}>
                                  欢迎您，{user.nickname}
                            </LinkButton>
                        <LinkButton
                            style={{float: 'right', marginRight: '15px'}}
                            onClick={this.LoginOut}
                        >
                            退出账户
                        </LinkButton>

                        </span>
                    ) : (
                        <LinkButton
                            onClick={this.GoLogin}
                            style={{float: 'right', marginRight: '15px'}}
                        >
                            登录/注册
                        </LinkButton>
                    )
                }

                {
                    user !== ''
                        ? <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{lineHeight: '64px', float: 'right', marginRight: 30}}
                            selectedKeys={[path]}
                        >
                            <SubMenu key="/user" title="个人中心">
                                <Menu.Item key="/user-detail">
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
                    user !== ''
                        ? <Menu
                            theme="dark"
                            mode="horizontal"
                            style={{lineHeight: '64px', float: 'right', marginRight: 30}}
                            selectedKeys={[path]}
                        >
                            <SubMenu key="/productHome" title="发布">
                                <Menu.Item key="/product">
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

                {
                    user !== '' ?
                        <Popover
                            content={<span>{user.nickname}，您拥有{message} 条未读信息，<LinkButton onClick={() => {
                                    this.props.history.replace('/unread-information')
                                    this.setState({
                                        message : 0
                                    })
                                }
                                }>点击查看</LinkButton></span>}>
                            {this.state.message > 0 ? <Icon type="mail"
                                                            style={{
                                                                float: 'right',
                                                                color: '#FF0000',
                                                                fontSize: 20,
                                                                marginTop: 22,
                                                                marginRight: 20
                                                            }}
                            /> : <Icon type="mail"
                                       style={{
                                           float: 'right',
                                           color: '#808080',
                                           fontSize: 20,
                                           marginTop: 22,
                                           marginRight: 20
                                       }}
                            />}
                        </Popover>
                        :
                        <Popover content={<span>登陆后查看，<Link to='/login'>请登录</Link></span>}>
                            <Icon type="mail"
                                  style={{
                                      float: 'right',
                                      color: '#FFFFFF',
                                      fontSize: 20,
                                      marginTop: 22,
                                      marginRight: 20
                                  }}
                            />
                        </Popover>
                }


                <Modal
                    title="个人信息"
                    visible={ShowUpdate}
                    onOk={this.UpdateUser}
                    onCancel={() => {
                        this.setState({
                            ShowUpdate: false
                        })
                        this.form.resetFields()
                    }}
                >


                    <UpdateUser
                        setForm={(form) => {
                            this.form = form
                        }}
                        callBack={this.getHeaderUrl.bind(this)}
                    />
                </Modal>
            </div>
        )
    }
}

export default withRouter(TopNav)


