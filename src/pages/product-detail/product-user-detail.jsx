import React,{Component} from 'react'
import {Card, Icon, Pagination} from "antd";
import {withRouter,Link} from 'react-router-dom'

import {reqAllProduct} from '../../api/index'

const { Meta } = Card;

class ProductUserDetail extends Component{

    state = {
        UserProduct: [],
        defaultPageSize: 16,
        total : 0,
    }

    getUserAllProduct = async (page) => {
        this.page = page
        const result = await reqAllProduct('',page,this.state.defaultPageSize,this.props.location.state)
        const total = result.total
        this.setState({
            UserProduct : result.data,
            total
        })
    }


    getUserAllProductList = () => {
        const UserProduct = this.state.UserProduct

        return UserProduct.map(Item => {
                return (
                    <Link to={{
                        pathname : '/product-detail',
                        state : Item.id
                    }}>
                    <Card
                        hoverable
                        style={{ width: 240 ,marginRight : 30,marginBottom:20,marginLeft:30}}
                        cover={<img alt="picture" src={Item.cover} />}
                        actions={[
                    <span>
                        {
                            Item.state === 0 ? '正在出售' : '已被购买'
                        }
                    </span>
                        ]}
                    >
                        <Meta
                            title={Item.name}
                            description={Item.intro}
                        />
                    </Card>
                    </Link>
                )
            }
        )
    }

    componentDidMount(){
        this.getUserAllProduct(1)
    }

    render () {
        return (
            <div>
            <div style={{display:'flex', flexWrap:'wrap'}}>
                {this.getUserAllProductList()}
            </div>
                <Pagination
                    current= {this.page}
                    defaultPageSize= {this.state.defaultPageSize}
                    showQuickJumper
                    total={this.state.total}
                    onChange={this.getUserAllProduct}
                    style={{textAlign:'center',marginTop:20}}
                />
            </div>
        )
    }
}

export default withRouter(ProductUserDetail)

