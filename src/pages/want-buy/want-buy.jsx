import React,{Component} from 'react'
import {Card, Pagination, Icon,Avatar,message} from 'antd'

import {reqBuyProduct} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import storageUtilsToken from '../../utils/storageUtils-token'

export default class WantBuy extends Component{

    state = {
        defaultPageSize: 10,
        total : 0,
        BuyProduct : []
    }

    getBuyProduct = async (page) => {
        this.page = page
        const token = memoryUtils.token
        /*if(!token){
            message.error('请先登录')
            this.props.history.replace('/login')
        }*/
        const rows = this.state.defaultPageSize
        const result = await reqBuyProduct(token,page,rows)
        if(result.code === -1) {
            memoryUtils.user = ''
            storageUtils.RemoveUser()
            memoryUtils.token = ''
            storageUtilsToken.RemoveToken()
            this.props.history.replace('/login')
            message.error('您需要验证身份')
        }
        const total = result.total
        this.setState({
            BuyProduct : result.data,
            total
        })
    }

    getBuyProductList = () => {
        const BuyProduct = this.state.BuyProduct
        return BuyProduct.map(Item => {
            const title = (
                <span>
                <Avatar
                    size="large"
                    src={Item.user.img}
                    style={{marginRight:20}}
                />
                    <span style={{marginRight:20}}>
                        {Item.user.username}
                    </span>
                    <span>发布于{Item.create_time}</span>
                </span>
            )
            return (
            <Card title={title} bordered={false} style={{margin : '1% 10% 3% 10%'}}
                  key={Item.id}
            >
                <p style={{fontWeight:'bold',fontSize : '20px'}}>{Item.title}</p>
                <p>{Item.intro}</p>
                <p>
                    <Icon type="wechat" theme="filled" style={{fontSize: 25,paddingRight:10}}/>
                    微信&nbsp;:&nbsp;&nbsp;&nbsp;{Item.weixin}
                </p>
            </Card>
            )
        })
    }

    componentDidMount(){
        this.getBuyProduct(1)
    }

    render () {
        const BuyProduct = this.state.BuyProduct
        return (
            <div>
                <div>
                    {
                        BuyProduct ?  this.getBuyProductList() : (<span style={{margin:"auto auto"}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>)
                    }
                </div>
                <Pagination
                    current= {this.page}
                    defaultPageSize= {this.state.defaultPageSize}
                    showQuickJumper
                    total={this.state.total}
                    onChange={this.getBuyProduct}
                    style={{textAlign:'center',marginTop:20}}
                />
            </div>
        )
    }
}

