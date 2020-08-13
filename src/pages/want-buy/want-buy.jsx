import React, {Component} from 'react'
import {Card, Pagination, Icon, Avatar,BackTop, Input, Button} from 'antd'

import {connect} from 'react-redux'
import {AllBuy} from '../../redux/action/buy'

class WantBuy extends Component {

    state = {
        rows: 10,
        title: ''
    }

    getBuyProduct = async (page) => {
        this.page = page
        let {title, rows} = this.state
        const condition = {title, rows, page}
        this.props.AllBuy(condition)
    }

    getBuyProductList = () => {
        const BuyProduct = this.props.buyAll.data
        if (BuyProduct.length !== 0) {
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
                </span>
                )
                return (
                    <Card title={title} bordered={false} style={{margin: '1% 10% 3% 10%'}}
                          key={Item.id}
                    >
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
    }

    SearchName = async (title) => {
        this.setState({
            title
        })
    }

    componentDidMount() {
        this.getBuyProduct(1)
    }


    componentDidUpdate() {
        window.scrollTo(0, 0)
        const title = this.state.title
        if (title !== '') {
            this.getBuyProduct(1)
            this.setState({
                title: ''
            })
        }
    }


    render() {
        const BuyProduct = this.props.buyAll.data || []
        return (
            <div>
                <span style={{marginLeft: '30%'}}>
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
                        BuyProduct.length !== 0 ? this.getBuyProductList() :
                            (<span style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    margin: 20
                                }}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
                             </span>)
                    }
                </div>
                {
                    BuyProduct.length !== 0 ? <Pagination
                        current={this.page}
                        defaultPageSize={this.state.rows}
                        showQuickJumper
                        total={this.props.buyAll.total}
                        onChange={this.getBuyProduct}
                        style={{textAlign: 'center', marginTop: 20}}
                    /> : ''
                }

                <BackTop/>
            </div>
        )
    }
}

const mapStateToProps = ({user, buyAll}) => ({
    user, buyAll
})

const mapDispatchToProps = (dispatch) => ({
    AllBuy: (condition) => dispatch(AllBuy(condition))
})

export default connect(mapStateToProps, mapDispatchToProps)(WantBuy)