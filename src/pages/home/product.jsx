import React,{Component} from 'react'
import {Card, Pagination} from 'antd'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {reqAllProduct} from '../../api/index'


const { Meta } = Card;

class Product extends Component{

    static propTypes = {
        currentKey : PropTypes.string.isRequired
    }

    state = {
        total : 0,
        AllProduct : [],
        currentKey : '',
        defaultPageSize: 15,
    }

    //获取指定页码数据显示
    getAllProduct = async (page) => {
        //debugger
        this.page = page
        if(this.state.currentKey){
            const result = await reqAllProduct(this.state.currentKey,page,this.state.defaultPageSize)
            const AllProduct = result.data
            const total = result.total
           // alert(total)
            this.setState({
                total,
                AllProduct
            })
        }
        else {
            const result = await reqAllProduct('',page,this.state.defaultPageSize)
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
                    <Link to={{
                        pathname : '/product-detail',
                        state : product.id
                    }}>
                    <Card
                        hoverable = {true}
                        style={{ width: 220,margin:'0 13px 10px 10px'}}
                        cover={<img alt={product.name} src={product.cover} />}
                    >
                        <Meta title={product.name} description={"￥" + product.price1} style={{fontSize:20}}/>
                        <Meta  description={"于" + product.create_time + "发布"} />
                    </Card>
                    </Link>
                )
            })
        }else{
           return <span style={{margin:"auto auto"}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png'/>
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
        return (
            <div>
                {
                   <div style={{display:'flex',flexWrap:'wrap'}}>
                        {
                            this.getAllProductList()
                        }
                    </div>
                }

                <Pagination
                    current= {this.page}
                    defaultPageSize= {this.state.defaultPageSize}
                    showQuickJumper
                    total={this.state.total}
                    onChange={this.getAllProduct}
                    style={{textAlign:'center',marginTop:20}}
            />
            </div>
        )
    }
}

export default withRouter(Product)

