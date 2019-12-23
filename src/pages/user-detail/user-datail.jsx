import React,{Component} from 'react'
import {Card, Icon, Modal, message, Pagination, BackTop,Row,Col} from 'antd'

import {reqAllProduct, reqUpdateProduct, reqDeleteProduct} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import UpdateProduct from './update-product'
import noProduct from '../../utils/8a52be7f15d4576ce96c64703d98abd4.png'

const { Meta } = Card;

export default class UserDetail extends Component{

    state = {
        UserProduct : [],
        ShowUpdate : false,
        ImageUrl : '',
        FileUrl : [],
        ProductId : '',
        product : {},
        sendProduct : {},
        defaultPageSize: 16,
        total : 0,
    }




    getUserAllProduct = async (page) => {
        this.page = page
        const result = await reqAllProduct('',page,this.state.defaultPageSize,memoryUtils.user.id,'create_time desc')
        const total = result.total
        this.setState({
            UserProduct : result.data,
            total
        })
    }

    UpperAndLower = async (Item) => {
        const product = this.state.product
        product.id = Item.id
        product.state = Item.state === 0 ? '1' : '0'
        const result = await reqUpdateProduct(product)
        if(result.code===0){
            message.success(Item.state === 0 ? '下架成功' : '上架成功')
        }else{
            message.error(Item.state === 1 ? '下架失败' : '上架失败')
        }
        this.getUserAllProduct()
    }


    getUserAllProductList = () => {
        const UserProduct = this.state.UserProduct
        return UserProduct.map(Item => {
            return (
                <Col  xs={12} md={6}  xxl={4} style={{height:350,width:240,margin:'0 30px 40px 30px'}}    key={Item.id}
                >
            <Card
                    hoverable
                cover = {Item.cover ? <img alt="img" src={Item.cover} /> :<img alt="img" src={noProduct} />}
                actions={[
                    <Icon
                        type="setting"
                        key="setting"
                        onClick = {() => this.setState({
                            ShowUpdate : true,
                            ProductId : Item.id,
                            sendProduct : Item
                        })}
                    />,
                    <span onClick={() => this.UpperAndLower(Item)}>
                        {
                            Item.state === 0 ? '下架' : '上架'
                        }
                    </span>,
                    <Icon
                        type="delete"
                        key="delete"
                        onClick = {() => this.deleteProduct(Item)}
                    />
                ]}
            >
                <Meta
                    title={Item.name}
                    description={Item.intro}
                />
            </Card>
                </Col>
            )
        }
        )
    }

    Updateproduct = () => {

        this.form.validateFields(async (err,values) => {
            if(!err){
                this.setState({
                    ShowUpdate : false
                })
                this.form.resetFields()
                const product = this.state.product
                product.id = this.state.ProductId
                product.name = values.name
                product.intro = values.intro
                product.price1 = values.price1
                product.phone = values.phone
                product.cover = this.state.ImageUrl
                product.image = this.state.FileUrl
                const result = await reqUpdateProduct(product)
                if(result.code===0){
                    if(!product.cover){
                        message.error('请上传封面图片')
                    }
                    message.success('更新成功')
                    this.getUserAllProduct(1)
                }else{
                    message.error('更新失败')
                }
            }
        })

    }

    getFileList = (fileList) => {
        const filelist = fileList.reduce((pre,Item) => {
            pre.push(
                Item.url
            )
            return pre
        },[])
        this.setState({
            FileUrl : filelist
        })
    }

    getImageUrl = (url) => {
        this.setState({
            ImageUrl : url
        })
    }

    deleteProduct = async (Item) => {

        Modal.confirm ({
            title: `确认删除${Item.name}吗`,
            onOk :async () => {
                const result = await reqDeleteProduct(Item.id)
                if(result.code === -1){
                    message.success('删除成功')
                }else{
                    message.error('删除失败')
                }
                this.getUserAllProduct(1)
            },
        })
    }

    componentDidMount(){
        this.getUserAllProduct(1)
    }

    render () {
        const {ShowUpdate,UserProduct,sendProduct} = this.state

        return (
            <div>

                <Row>
             <div style={{display:'flex', flexWrap:'wrap'}}>
                { UserProduct ? this.getUserAllProductList() : (<span style={{margin:"5% 5% 0 30%"}}    >
               <img src='https://www.youzixy.com/img/noGoods.cc45e087.png' alt='img'/>
           </span>)}
            </div>
                </Row>
                <Modal
                    title="更新商品信息"
                    visible={ShowUpdate}
                    onOk={this.Updateproduct}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({
                            ShowUpdate : false
                        })
                        window.location.reload()
                    }}
                >
                    <UpdateProduct
                        UserProduct={UserProduct}
                        setForm = {(form) => {this.form = form}}
                        PictureWall = {(fileList) => this.getFileList(fileList)}
                        UpLoadImage = {(url) => this.getImageUrl(url)}
                        sendProduct = {sendProduct}
                    />
                </Modal>
                {UserProduct ? (<Pagination
                    current= {this.page}
                    defaultPageSize= {this.state.defaultPageSize}
                    showQuickJumper
                    total={this.state.total}
                    onChange={this.getUserAllProduct}
                    style={{textAlign:'center',marginTop:20}}
                />) : ''}
                <div>
                    <BackTop />
                </div>
            </div>
        )
    }
}



