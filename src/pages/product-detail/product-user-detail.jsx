import React,{Component} from 'react'
import {BackTop, Card, Icon, Pagination,Col,Row} from "antd";
import {withRouter,Link} from 'react-router-dom'

import {reqAllProduct} from '../../api/index'
import LinkButton from "../../components/link-button/link-button";

const { Meta } = Card;

class ProductUserDetail extends Component{

    state = {
        UserProduct: [],
        defaultPageSize: 16,
        total : 0,
    }

    getUserAllProduct = async (page) => {
        this.page = page
        const id = this.props.location.state.id
        const result = await reqAllProduct('',page,this.state.defaultPageSize,id,'create_time desc')
        const total = result.total
        this.setState({
            UserProduct : result.data,
            total
        })
    }


    getUserAllProductList = () => {
        const UserProduct = this.state.UserProduct || []
            return UserProduct.map(Item => {
                    const img = Item.images
                    const cover = img.split(",")[0]
                    return (
                        <Col xs={12} md={6} xxl={4} style={{height: 350, width: 220, margin: '10px 14px 40px 10px'}}>
                            <Link to={{
                                pathname: '/product-detail',
                                state: Item.id
                            }}>
                                <Card
                                    hoverable
                                    cover={<img alt="img" src={cover} style={{height: 218}}/>}
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
                                        style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
                                    />
                                </Card>
                            </Link>
                        </Col>
                    )
                }
            )
    }

    componentDidMount(){
        this.getUserAllProduct(1)
    }

    render () {
        return (
            <div style={{paddingTop: '40px'}}>
                <Row>

                  <span style={{float:'left'}}>
                    <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{fontSize: 25, marginRight: 10,marginLeft:10,zIndex:'2'}}
                        onClick={() => this.props.history.goBack()}
                    />
                    </LinkButton>
                     <span style={{fontSize:15}}>
                         {this.props.location.state.username}的商品列表
                     </span>
                </span>

            <div style={{display:'flex', flexWrap:'wrap',marginTop:50}}>
                {this.getUserAllProductList()}
            </div>
                </Row>
                <Pagination
                    current= {this.page}
                    defaultPageSize= {this.state.defaultPageSize}
                    showQuickJumper
                    total={this.state.total}
                    onChange={this.getUserAllProduct}
                    style={{textAlign:'center',marginTop:20}}
                />

                <div>
                    <BackTop />
                </div>
            </div>
        )
    }
}

export default withRouter(ProductUserDetail)

