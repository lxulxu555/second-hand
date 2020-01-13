import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {reqFindReplayByMe} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import noReplay from '../../utils/noGoods.cc45e087_副本.png'
import {Card, Icon, Avatar, BackTop} from "antd";

export default class UnreadInformation extends Component {

    state = {
        ReplayByMe: [],
    }

    getFindReplayByMe = async (nameId) => {
        const token = memoryUtils.token
        const result = await reqFindReplayByMe(token, nameId)
        this.setState({
            ReplayByMe: result.data
        })
    }

    getReplayByMeList = () => {
        const ReplayByMeList = this.state.ReplayByMe
        if (!ReplayByMeList) {
            return <img src={noReplay} style={{margin: "5% 5% 0 30%"}} alt='img'/>
        } else {
            return ReplayByMeList.map(item => {
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
        const nameId = memoryUtils.user.id
        this.getFindReplayByMe(nameId)
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

