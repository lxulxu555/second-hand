import React,{Component} from 'react'
import memoryUtils from "../../utils/memoryUtils";
import {reqBuyProduct,reqUpdateBuyProduct,reqDeleteBuyProduct} from "../../api";
import storageUtils from "../../utils/storageUtils";
import storageUtilsToken from "../../utils/storageUtils-token";
import {Avatar, Card, Icon, message, Pagination, Button, Modal, BackTop} from "antd";
import UpdateWantBuy from './update-want-buy'



export default class UserBuyDetail extends Component{

    state = {
        defaultPageSize: 10,
        total : 0,
        BuyProduct : [],
        ShowUpdate : false,
        product : {},
        buyProduct:{}
    }

    getBuyProduct = async (page) => {
        this.page = page
        const token = memoryUtils.token
        const rows = this.state.defaultPageSize
        const userid = memoryUtils.user.id
        const result = await reqBuyProduct(token,page,rows,userid)
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
                    <Button
                        type='primary'
                        style={{float:'right'}}
                        onClick = {() => this.setState({
                            ShowUpdate : true,
                            product : Item
                        })}
                    >
                        更新求购信息
                    </Button>
                    <Button
                        type='danger'
                        style={{float:'right',marginRight:20}}
                        onClick={() => this.deleteBuy(Item)}
                    >
                        删除
                    </Button>
                </span>
            )


            return (
                <Card title={title} bordered={false} style={{margin : '1% 10% 3% 10%'}} key={Item.id}>
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

    deleteBuy = (Item) => {
        Modal.confirm ({
            title: `确认删除${Item.title}吗`,
            onOk :async () => {
                const token = memoryUtils.token
                const id = Item.id
                const result = await reqDeleteBuyProduct(token,id)
                if(result.code === 0){
                    message.success('删除成功')
                    this.getBuyProduct(1)
                }else{
                    message.error('删除失败')
                }
            },
        })
    }

    UpdateWantBuy = () => {
        this.form.validateFields(async (err,values) => {
            if(!err){
                this.setState({
                    ShowUpdate : false
                })
                const buyProduct = this.state.buyProduct
                buyProduct.id = this.state.product.id
                buyProduct.title = values.title
                buyProduct.intro = values.intro
                buyProduct.weixin = values.weixin
                buyProduct.userid = memoryUtils.user.id
                const result = await reqUpdateBuyProduct(buyProduct)
                if(result.code === 0){
                    message.success('更新成功')
                    this.getBuyProduct(1)
                }else{
                    message.error('更新失败')
                }
                this.form.resetFields()
            }
        })
    }



    componentDidMount(){
        this.getBuyProduct(1)
    }

    render () {
        const {ShowUpdate,BuyProduct} = this.state

        return (
            <div>
                <div>
                    {
                        BuyProduct.length !== 0 ?  this.getBuyProductList() : (<span style={{margin: "5% 5% 0 30%"}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>)
                    }
                </div>

                {
                    BuyProduct.length !== 0 ? (<Pagination
                    current= {this.page}
                    defaultPageSize= {this.state.defaultPageSize}
                    showQuickJumper
                    total={this.state.total}
                    onChange={this.getBuyProduct}
                    style={{textAlign:'center',marginTop:20}}
                />) : ''}

                <Modal
                    title="我的求购信息"
                    visible={ShowUpdate}
                    onOk={this.UpdateWantBuy}
                    onCancel={() => {
                        this.setState({
                            ShowUpdate : false
                        })
                        this.form.resetFields()
                    }}
                >
                    <UpdateWantBuy
                        product ={this.state.product}
                        setForm = {(form) => {this.form = form}}
                    />

                </Modal>

                <div>
                    <BackTop />
                </div>
            </div>

        )
    }
}

