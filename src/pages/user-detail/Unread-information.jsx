import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import noReplay from '../../utils/noGoods.cc45e087_副本.png'
import {Card, Icon, Avatar, BackTop} from "antd";
import {connect} from 'react-redux'
import {ReplayByMe} from '../../redux/action/user'

class UnreadInformation extends Component {


    getReplayByMeList = () => {
        const {userReplayByMe} = this.props || []
        if (userReplayByMe.length === 0) {
            return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 20
            }}>
                <img src={noReplay}
                         alt='img'/>
            </div>)
        } else {
            return userReplayByMe.map(item => {
                const title = (
                    <span>
                <Avatar src={item.user.img} style={{marginRight: 20}}/>
                    <span><Link to={{
                        pathname: '/product-user-detail',
                        state: item.user
                    }}>{item.user.username}</Link> 回复了您</span>
                </span>
                )
                return <Card title={title} bordered={false} style={{margin: '1% 10% 3% 10%'}}
                             key={item.content}
                >
                    <div style={{display: 'flex'}}>
                        <Link to={{
                            pathname: '/product-detail',
                            state: item.goodsid
                        }}>
                            <img src={item.images}
                                 style={{width: 250, height: 200}}
                                 alt='img'
                            />
                        </Link>
                        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                            <span style={{marginLeft: '10%', fontSize: 15, marginTop: 20}}><Icon type="clock-circle"
                                                                                                 style={{marginRight: 20}}/>回复时间：{item.createtime}</span>
                            <span style={{marginLeft: '10%', fontSize: 15, marginTop: 30}}><Icon type="profile"
                                                                                                 style={{marginRight: 20}}/>商品标题：{item.name}</span>
                            <span style={{marginLeft: '10%', fontSize: 15, marginTop: 30}}><Icon type="message"
                                                                                                 style={{marginRight: 20}}/>信息详情：{item.content}</span>
                        </div>
                    </div>
                </Card>
            })
        }
    }


    componentDidMount() {
        this.props.ReplayByMe()
    }


    render() {

        return (
            <div>
                {
                    this.getReplayByMeList()
                }
                <BackTop/>
            </div>
        )
    }
}

const mapStateToProps = ({userReplayByMe}) => ({
    userReplayByMe
})

const mapDispatchToProps = (dispatch) => ({
    ReplayByMe: () => dispatch(ReplayByMe())
})

export default connect(mapStateToProps, mapDispatchToProps)(UnreadInformation)