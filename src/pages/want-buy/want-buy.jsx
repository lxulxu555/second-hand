import React,{Component} from 'react'
import {Card, Pagination, Icon, Avatar, message, BackTop, Input,Button} from 'antd'

import {reqBuyProduct,reqLookUpWantBuy} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import storageUtilsToken from '../../utils/storageUtils-token'

export default class WantBuy extends Component{

    state = {
        defaultPageSize: 10,
        total : 0,
        BuyProduct : [],
        title:''
    }

    getBuyProduct = async (page) => {
        this.page = page
        let title = this.state.title
        let token = memoryUtils.token
        let rows = this.state.defaultPageSize
        let result
        if(title !== ''){
            result = await reqLookUpWantBuy(token,title)
        }else{
            result = await reqBuyProduct(token,page,rows)
        }
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
        if(BuyProduct.length!==0){
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
    }

    SearchName = async (title) => {
        this.setState({
            title
        })
    }

    componentDidMount(){
        this.getBuyProduct(1)
    }



    componentDidUpdate(){
        window.scrollTo(0,0)
        const title = this.state.title
        if(title !== ''){
            this.getBuyProduct(1)
            this.setState({
                title : ''
            })
        }
    }


    render () {
        const BuyProduct = this.state.BuyProduct
        return (
            <div>
                <span style={{marginLeft:'30%'}}>
                    <Input
                        id='input'
                        placeholder='请输入关键字'
                        style={{width: 400, height: 40, marginTop: 12}}
                        addonBefore={<Icon type='search'/>}
                        onPressEnter={() => this.SearchName(document.getElementById('input').value)}
                    />
                     <Button
                         type='primary'
                         style={{
                             width: 63,
                             marginTop: 13,
                             height: 30,
                             textAlign: 'center',
                             borderRadius: 0,
                             borderBottomRightRadius: '5px',
                             borderTopRightRadius: '5px'
                         }}
                         onClick={() => this.SearchName(document.getElementById('input').value)}
                     >
                         搜索
                     </Button>
                </span>
                <div>
                    {
                        BuyProduct.length !== 0 ?  this.getBuyProductList() : (<span style={{margin: "5% 5% 0 30%"}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>)
                    }
                </div>
                {
                    BuyProduct.length !== 0 ? <Pagination
                        current= {this.page}
                        defaultPageSize= {this.state.defaultPageSize}
                        showQuickJumper
                        total={this.state.total}
                        onChange={this.getBuyProduct}
                        style={{textAlign:'center',marginTop:20}}
                    /> : ''
                }

                <BackTop/>
            </div>
        )
    }
}

