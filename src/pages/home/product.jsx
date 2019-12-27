import React, {Component} from 'react'
import {Card, Pagination, Row, Col, BackTop} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {reqAllProduct, reqLookUpProduct} from '../../api/index'


const {Meta} = Card;

class Product extends Component {

    static propTypes = {
        currentKey: PropTypes.string.isRequired,
        searchname: PropTypes.string,
        cleanSearchName: PropTypes.func
    }

    state = {
        total: 0,
        AllProduct: [],
        currentKey: '',
        searchnames: false,
        defaultPageSize: 30,
    }


    //获取指定页码数据显示
    getAllProduct = async (page) => {
        let key = this.state.currentKey
        this.page = page
        let result
            if (this.props.searchname) {
                result = await reqLookUpProduct(this.props.searchname, page, this.state.defaultPageSize)
            } else {
                result = await reqAllProduct(key, page, this.state.defaultPageSize, '', 'create_time desc')
            }
            const AllProduct = result.data
            const total = result.total
            this.setState({
                total,
                AllProduct
            })
    }


    getAllProductList = () => {
        const AllProduct = this.state.AllProduct
        console.log(AllProduct)
        if (AllProduct) {
            return AllProduct.map(product => {
                const images = product.images
                const cover = images.split(",")[0]

                return (
                    <Col xs={12} md={6} xxl={4} style={{height: 350, width: 220, margin: '10px 14px 40px 10px'}}
                         key={product.id}
                    >
                        <Link to={{
                            pathname: '/product-detail',
                            state: product.id,
                        }}

                        >
                            <Card
                                hoverable={true}

                                cover={<img alt={product.name} src={cover} style={{height: 218}}/>}
                            >
                                <Meta title={product.name} description={"￥" + product.price1} style={{fontSize: 20}}/>
                                <Meta description={"于" + product.create_time + "发布"}/>
                            </Card>
                        </Link>
                    </Col>
                )
            })
        } else if (!AllProduct) {
            return <span style={{margin: "5% 5% 0 30%"}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>
        }

    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            currentKey: nextProps.currentKey,
            searchnames: true
        }, () => {
            this.getAllProduct(1)
        })
    }

    render() {

        const AllProduct = this.state.AllProduct
        return (
            <div>
                {
                    <Row>
                        {
                            this.getAllProductList()
                        }
                    </Row>
                }
                {
                    AllProduct ? (<Pagination
                        current={this.page}
                        defaultPageSize={this.state.defaultPageSize}
                        showQuickJumper
                        total={this.state.total}
                        onChange={this.getAllProduct}
                        style={{textAlign: 'center', marginTop: 20}}
                    />) : ''
                }
                <div>
                    <BackTop/>
                </div>
            </div>
        )
    }
}

export default withRouter(Product)

