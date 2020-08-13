import React, {Component} from 'react'
import {BackTop, Card, Col, Pagination, Row} from 'antd'
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {GetAllProduct, SaveProductPage} from '../../redux/action/product'

const {Meta} = Card;

class Product extends Component {

    state = {
        condition: {}
    }


    //获取指定页码数据显示
    getAllProduct = async (page) => {
        const {condition} = this.state
        window.scrollTo(0, 0)
        this.props.saveProductPage(page)
        condition.page = page
        this.props.getAllProduct(condition)

    }


    getAllProductList = () => {
        const {allProduct} = this.props.productAll
        const {data} = allProduct
        if (data) {
            return data.map(product => {
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
                                <Meta title={product.name}
                                      description={<span style={{color: '#FF0000'}}>￥{product.price1}</span>}
                                      style={{fontSize: 20}}/>
                                <Meta description={"于" + product.create_time + "发布"}/>
                            </Card>
                        </Link>
                    </Col>
                )
            })
        } else {
            return <span  className='NoProduct'>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>
        }
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        //该方法内禁止访问this
        if (nextProps.condition !== prevState.condition) {
            //通过对比nextProps和prevState，返回一个用于更新状态的对象
            return {
                condition: nextProps.condition
            }
        }
        //不需要更新状态，返回null
        return null
    }



    componentDidMount() {
        const {page} = this.props.productPage
        const curentPage = isNaN(page) ? 1 : page
        this.getAllProduct(curentPage)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.condition.currentKey !== '' || this.props.condition.searchname !== ''){
            if (this.props.condition !== prevState.condition) {
                const {page} = this.props.productPage
                const curentPage = isNaN(page) || page > 1 ? 1 : page
                this.getAllProduct(curentPage)
            }
        }
    }




    render() {
        const {allProduct} = this.props.productAll
        const {total} = allProduct
        const {page} = this.props.productPage
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
                    allProduct ? (<Pagination
                        current={page}
                        defaultPageSize={30}
                        showQuickJumper
                        total={total}
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

const mapStateToProps = ({productAll, productPage}) => ({
    productPage, productAll
})

const mapDispatchToProps = (dispatch) => ({
    getAllProduct: (condition) => dispatch(GetAllProduct(condition)),
    saveProductPage: (page) => dispatch(SaveProductPage(page)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Product))

