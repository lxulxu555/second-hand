import React, {Component} from 'react'
import {Card, Icon, Modal, message, Pagination, BackTop, Row, Col} from 'antd'

import { reqUpdateProduct} from '../../api/index'
import UpdateProduct from './update-product'
import {connect} from 'react-redux'
import {GetAllProduct, UpdateProductInfo, DeleteProduct} from '../../redux/action/product'


const {Meta} = Card;

class UserDetail extends Component {

    state = {
        ShowUpdate: false,
        ProductInfo: {},
        defaultPageSize: 30,
    }


    getUserAllProduct = async (Page) => {
        const {user} = this.props
        this.page = Page
        const {page, userid} = {page: Page, userid: user.id}
        const condition = {page, userid}
        this.props.GetAllProduct(condition)
    }

    UpperAndLower = async (Item) => {
        const product = {}
        product.id = Item.id
        product.state = Item.state === 0 ? '1' : '0'
        const result = await reqUpdateProduct(product)
        if (result.code === 0) {
            message.success(Item.state === 0 ? '下架成功' : '上架成功')
        } else {
            message.error(Item.state === 1 ? '下架失败' : '上架失败')
        }
        this.getUserAllProduct()
    }

    getUserAllProductList = () => {
        const {productAll} = this.props
        const UserProduct = productAll.allProduct.data || []

        return UserProduct.map(Item => {
                const images = Item.images
                const cover = images.split(",")[0]
                return (
                    <Col xs={12} md={6} xxl={4} style={{height: 350, width: 220, margin: '10px 14px 40px 10px'}}
                         key={Item.id}
                    >
                        <Card
                            hoverable
                            cover={
                                <img alt="img" src={cover}
                                     onClick={() => this.showModal(Item)}
                                     style={{height: 218}}
                                />
                            }
                            actions={[
                                <Icon
                                    type="setting"
                                    key="setting"
                                    onClick={() => this.showModal(Item)}
                                />,
                                <span onClick={() => this.UpperAndLower(Item)}>
                        {
                            Item.state === 0 ? '下架' : '上架'
                        }
                    </span>,
                                <Icon
                                    type="delete"
                                    key="delete"
                                    onClick={() => this.deleteProduct(Item)}
                                />
                            ]}
                        >
                            <Meta
                                title={Item.name}
                                description={Item.intro}
                                style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
                            />
                        </Card>
                    </Col>
                )
            }
        )
    }

    showModal = (Item) => {
        this.setState({
            ShowUpdate: true,
            ProductInfo: Item
        })
    }

    Updateproduct = () => {
        const filelist = this.props.productImage.imageList
        const image = filelist.reduce((pre, Item) => {
            pre.push(
                Item.url
            )
            return pre
        }, [])
        this.form.validateFields(async (err, values) => {
            const images = image.toString()
            if (!err) {
                this.setState({
                    ShowUpdate: false
                })
                this.form.resetFields()
                const product = values
                product.id = this.state.ProductInfo.id
                product.images = images
                this.props.UpdateProductInfo(product, () => {
                    this.getUserAllProduct(1)
                })
            }
        })

    }


    deleteProduct = async (Item) => {
        Modal.confirm({
            title: `确认删除${Item.name}吗`,
            onOk: async () => {
                this.props.DeleteProduct(Item.id, () => {
                    this.getUserAllProduct(1)
                })
            },
        })
    }

    componentDidMount() {
        this.getUserAllProduct(1)
    }

    render() {
        const {ShowUpdate,  ProductInfo} = this.state
        const {productAll} = this.props
        const {allProduct} = productAll
        const {data, total} = allProduct

        return (
            <div>

                <Row>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {data ? this.getUserAllProductList() : (<span style={{display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: 20}}>
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>)}
                    </div>
                </Row>
                <Modal
                    /*隐藏Modal时销毁Modal,让其重新渲染*/
                    destroyOnClose
                    keyboard={true}
                    title="更新商品信息"
                    visible={ShowUpdate}
                    onOk={this.Updateproduct}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({
                            ShowUpdate: false
                        })
                    }}
                >
                    <UpdateProduct
                        setForm={(form) => {
                            this.form = form
                        }}
                        ProductInfo={ProductInfo}
                    />
                </Modal>
                {data ? (<Pagination
                    current={this.page}
                    defaultPageSize={this.state.defaultPageSize}
                    showQuickJumper
                    total={total}
                    onChange={this.getUserAllProduct}
                    style={{textAlign: 'center', marginTop: 20}}
                />) : ''}
                <div>
                    <BackTop/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user, productAll, productImage}) => ({
    user, productAll, productImage
})

const mapDispatchToProps = (dispatch) => ({
    GetAllProduct: (condition) => dispatch(GetAllProduct(condition)),
    UpdateProductInfo: (condition, callback) => dispatch(UpdateProductInfo(condition, callback)),
    DeleteProduct: (id, callback) => dispatch(DeleteProduct(id, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)

