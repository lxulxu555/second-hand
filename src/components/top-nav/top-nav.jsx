import React, {Component} from 'react'
import {Menu, Avatar, Modal,Icon, Popover} from "antd"
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import './top-nav.less'
import LinkButton from '../link-button/link-button'
import UpdateUser from '../../pages/update-user/update-user'
import Page from '../../utils/page'
import {UserMessage,updateUser} from '../../redux/action/user'

const SubMenu = Menu.SubMenu

class TopNav extends Component {

    state = {
        ShowUpdate: false,
    }

    getLookUserReplay = async () => {
        const id = this.props.user.id || ''
        this.props.getMessage(id)
    }


    GoLogin = () => {
        this.props.history.replace('/login')
    }

    LoginOut = () => {
        Modal.confirm({
            title: '确认退出吗',
            onOk: () => {
                window.localStorage.removeItem('Token')
                window.localStorage.removeItem('User')
                window.location.reload()
            },
        })
    }

    UpdateUser = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                this.setState({
                    ShowUpdate: false
                },() => {
                    values.img = this.props.uploadImage.image
                    values.id = this.props.user.id
                    this.props.updateUser(values,() => {
                        this.props.history.replace('/home')
                        this.form.resetFields()
                    })
                })
            }
        });
    }

    goInitHome = () => {
        this.props.history.replace('/')
        Page.SavePage(1)
    }

    isLogin = () => {
        return this.props.user.id !== ''
    }

    ReadyMessage = () => {
        this.props.history.replace('/unread-information')
        this.props.getMessage(this.props.user.id)
    }


    componentWillMount() {
        this.getLookUserReplay()
    }


    render() {
        let path = this.props.location.pathname
        const {user,userMessage} = this.props
        const {message} = userMessage
        const {ShowUpdate} = this.state
        return (
            <div>
                <div className="logo" onClick={this.goInitHome} style={{cursor: 'pointer'}}/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[path]}
                    style={{lineHeight: '64px', float: 'left'}}
                >
                    <Menu.Item key="/home" onClick={this.goInitHome}>
                        首页
                    </Menu.Item>
                    <Menu.Item key="/wantbuy">
                        <Link to='/wantbuy'>
                            求购
                        </Link>
                    </Menu.Item>
                </Menu>


                {
                    this.isLogin() === true ? (
                        <div>
                            <LinkButton
                                style={{float: 'right', marginRight: '15px'}}
                                onClick={() => {
                                    this.setState({
                                        ShowUpdate: true
                                    })
                                }}
                            >
                                <Popover
                                    content={<span>更新自己的个人信息</span>}>
                                    <Avatar
                                        icon="user"
                                        className='avatar'
                                        src={user.img || ''}/>
                                </Popover>
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

                            <Menu
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
                            </Menu>

                            <Menu
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
                            </Menu>

                            <Popover
                                content={<span>{user.nickname}，您拥有{message} 条未读信息，
                                    <LinkButton
                                        onClick={this.ReadyMessage}>点击查看</LinkButton></span>}>
                                {
                                    message > 0 ?
                                        <Icon type="mail" className='HaveMessage'/> :
                                        <Icon type="mail" className='NoMessage'/>
                                }
                            </Popover>
                        </div>
                    ) : (
                        <LinkButton
                            onClick={this.GoLogin}
                            style={{float: 'right', marginRight: '15px'}}
                        >
                            登录/注册
                        </LinkButton>
                    )
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
                        user={user}
                    />
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({user,userMessage,uploadImage}) => ({
    user,userMessage,uploadImage
})

const mapDispatchToProps = (dispatch) => ({
    getMessage : (id) => dispatch(UserMessage(id)),
    updateUser : (user,callback) => dispatch(updateUser(user,callback))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav))


