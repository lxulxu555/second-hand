import React,{Component} from 'react'
import {Card, Icon, Modal, message, Pagination} from 'antd'

import {reqAllProduct,reqUpdateProduct,reqDeleteProduct} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import UpdateProduct from './update-product'

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
        const result = await reqAllProduct('',page,this.state.defaultPageSize,memoryUtils.user.id)
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
           // console.log(result)
        }
        this.getUserAllProduct()
    }

    getUserAllProductList = () => {
        const UserProduct = this.state.UserProduct
        return UserProduct.map(Item => {
            return (
            <Card
                key={Item.id}
                hoverable
                style={{ width: 240 ,marginRight : 30,marginBottom:20,marginLeft:30}}
                cover={<img alt="img" src={Item.cover} />}
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
                        onClick = {() => this.deleteProduct(Item.id)}
                    />
                ]}
            >
                <Meta
                    title={Item.name}
                    description={Item.intro}
                />
            </Card>
            )
        }
        )
    }

    Updateproduct = () => {
        this.setState({
            ShowUpdate : false
        })
        this.form.validateFields(async (err,values) => {
            if(!err){
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

    deleteProduct = async (id) => {
        const result = await reqDeleteProduct(id)
        if(result.code === -1){
            message.success('删除成功')
        }else{
            message.error('删除失败')
        }
        this.getUserAllProduct(1)
    }

    componentDidMount(){
        this.getUserAllProduct(1)
    }

    render () {
        const {ShowUpdate,UserProduct,sendProduct} = this.state

        return (
            <div>

             <div style={{display:'flex', flexWrap:'wrap'}}>
                {this.getUserAllProductList()}
            </div>
                <Modal
                    title="更新商品信息"
                    visible={ShowUpdate}
                    onOk={this.Updateproduct}
                    onCancel={() => {
                        this.form.resetFields()
                        this.setState({
                            ShowUpdate : false
                        })
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



