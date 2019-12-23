import React,{Component} from 'react'
import {Card, Pagination,Row,Col,BackTop} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {reqAllProduct} from '../../api/index'
import noproduct from '../../utils/8a52be7f15d4576ce96c64703d98abd4.png'


const { Meta } = Card;

class Product extends Component{

    static propTypes = {
        currentKey : PropTypes.string.isRequired
    }

    state = {
        total : 0,
        AllProduct : [],
        currentKey : '',
        defaultPageSize: 30,
    }

    //获取指定页码数据显示
    getAllProduct = async (page) => {
        //debugger
        this.page = page
        if(this.state.currentKey){
            const result = await reqAllProduct(this.state.currentKey,page,this.state.defaultPageSize,'','create_time desc')
            const AllProduct = result.data
            const total = result.total
           // alert(total)
            this.setState({
                total,
                AllProduct
            })
        }
        else {
            const result = await reqAllProduct('',page,this.state.defaultPageSize,'','create_time desc')
            const AllProduct = result.data
            const total = result.total
            this.setState({
                total,
                AllProduct
            })
        }
        }



    getAllProductList = () => {
        const AllProduct = this.state.AllProduct
        if(AllProduct){
            return AllProduct.map(product => {
                return (
                    <Col  xs={12} md={6}  xxl={4} style={{height:350,width:220,margin:'0 14px 40px 10px'}}                     key={product.id}
                    >
                    <Link  to={{
                        pathname : '/product-detail',
                        state : product.id,
                    }}

                    >
                    <Card
                        hoverable = {true}

                        cover = {product.cover ? <img alt={product.name} src={product.cover} style={{height:218}}/> :   <img src={noproduct} alt='img'/>}
                    >
                        <Meta title={product.name} description={"￥" + product.price1} style={{fontSize:20}}/>
                        <Meta  description={"于" + product.create_time + "发布"} />
                    </Card>
                    </Link>
                    </Col>
                )
            })
        }else{
           return <span style={{margin:"5% 5% 0 30%"}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>
        }

    }




    componentWillReceiveProps(nextProps){
        this.setState({
            currentKey : nextProps.currentKey
        },() => {
            this.getAllProduct(1)
        })
    }





    render () {
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
                    AllProduct ? ( <Pagination
                        current= {this.page}
                        defaultPageSize= {this.state.defaultPageSize}
                        showQuickJumper
                        total={this.state.total}
                        onChange={this.getAllProduct}
                        style={{textAlign:'center',marginTop:20}}
                    />) : ''
                }
                <div>
                    <BackTop />
                </div>
            </div>
        )
    }
}

export default withRouter(Product)

