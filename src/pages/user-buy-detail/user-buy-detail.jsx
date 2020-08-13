import React, {Component} from 'react'
import {Avatar, Card, Icon,  Pagination, Button, Modal, BackTop} from "antd";
import UpdateWantBuy from './update-want-buy'
import {connect} from 'react-redux'
import {AllBuy, DeleteBuy, UpdateBuy} from '../../redux/action/buy'


class UserBuyDetail extends Component {

    state = {
        defaultPageSize: 10,
        ShowUpdate: false,
        product: {},
    }

    getBuyProduct = async (page) => {
        this.page = page
        const {user} = this.props
        const rows = this.state.defaultPageSize
        const userid = user.id
        const title = ''
        const condition = {page, rows, userid,title}
        this.props.AllBuy(condition)
    }

    getBuyProductList = () => {
        const BuyProduct = this.props.buyAll.data
        return BuyProduct.map(Item => {
            const title = (
                <span>
                <Avatar
                    size="large"
                    src={Item.user.img}
                    style={{marginRight: 20}}
                />
                    <span style={{marginRight: 20}}>
                        {Item.user.username}
                    </span>
                    <span>发布于{Item.create_time}</span>
                    <Button
                        type='primary'
                        style={{float: 'right'}}
                        onClick={() => this.setState({
                            ShowUpdate: true,
                            product: Item
                        })}
                    >
                        更新求购信息
                    </Button>
                    <Button
                        type='danger'
                        style={{float: 'right', marginRight: 20}}
                        onClick={() => this.deleteBuy(Item)}
                    >
                        删除
                    </Button>
                </span>
            )


            return (
                <Card title={title} bordered={false} style={{margin: '1% 10% 3% 10%'}} key={Item.id}>
                    <p style={{fontWeight: 'bold', fontSize: '20px'}}>{Item.title}</p>
                    <p>{Item.intro}</p>
                    <p>
                        <Icon type="wechat" theme="filled" style={{fontSize: 25, paddingRight: 10}}/>
                        微信&nbsp;:&nbsp;&nbsp;&nbsp;{Item.weixin}
                    </p>
                </Card>
            )
        })
    }

    deleteBuy = (Item) => {
        Modal.confirm({
            title: `确认删除${Item.title}吗`,
            onOk: async () => {
                const id = Item.id
                this.props.DeleteBuy(id, () => {
                    this.getBuyProduct(1)
                })
            },
        })
    }

    UpdateWantBuy = () => {
        this.form.validateFields(async (err, values) => {
            const {user} = this.props
            if (!err) {
                this.setState({
                    ShowUpdate: false
                })
                const condition = values
                condition.id = this.state.product.id
                condition.userid = user.id
                this.props.UpdateBuy(condition, () => {
                    this.getBuyProduct(1)
                })
                this.form.resetFields()
            }
        })
    }


    componentDidMount() {
        this.getBuyProduct(1)
    }

    render() {
        const {ShowUpdate} = this.state
        const buyAll = this.props.buyAll || []
        const data = buyAll.data || []
        const total = buyAll.total

        return (
            <div>
                <div>
                    {
                        data.length !== 0 ? this.getBuyProductList() :
                            (
                                <span style={{display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    margin: 20}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
                                </span>
                            )
                    }
                </div>

                {
                    data.length !== 0 ? (<Pagination
                        current={this.page}
                        defaultPageSize={this.state.defaultPageSize}
                        showQuickJumper
                        total={total}
                        onChange={this.getBuyProduct}
                        style={{textAlign: 'center', marginTop: 20}}
                    />) : ''}

                <Modal
                    title="我的求购信息"
                    visible={ShowUpdate}
                    onOk={this.UpdateWantBuy}
                    onCancel={() => {
                        this.setState({
                            ShowUpdate: false
                        })
                        this.form.resetFields()
                    }}
                >
                    <UpdateWantBuy
                        product={this.state.product}
                        setForm={(form) => {
                            this.form = form
                        }}
                    />

                </Modal>

                <div>
                    <BackTop/>
                </div>
            </div>

        )
    }
}

const mapStateToProps = ({user, buyAll}) => ({
    user, buyAll
})

const mapDispatchToProps = (dispatch) => ({
    AllBuy: (condition) => dispatch(AllBuy(condition)),
    DeleteBuy: (condition, callback) => dispatch(DeleteBuy(condition, callback)),
    UpdateBuy: (condition, callback) => dispatch(UpdateBuy(condition, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBuyDetail)