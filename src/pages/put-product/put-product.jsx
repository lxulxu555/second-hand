import React, {Component} from 'react'
import {Form, Input,Button,message,Cascader,Icon} from "antd";

import './put-product.less'
import {reqAddProduct,reqFindClassAll} from '../../api/index'
import {PictureWall} from "./picture-wall";
import memoryUtils from "../../utils/memoryUtils";

const {TextArea} = Input

class PutProduct extends Component{


    state = {
        product : {},
        cover : '',
        options : [],
        valueId : ''
    }

    constructor(props){
        super(props)
        this.pw = React.createRef()
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            let image = this.pw.current.GetImgs()
            const a = image.toString()
            if (!err) {
                const product = this.state.product
                product.name = values.name
                product.userid = memoryUtils.user.user.id
                product.intro = values.intro
                product.price1 = values.price
                product.weixin = values.weixin
                product.images = a
                if(this.state.valueId){
                    product.classify2_id = this.state.valueId
                    const result = await reqAddProduct(product)
                    if(result.code===0){
                        message.success('添加成功')
                        this.props.history.replace('/home')
                    }else{
                        message.error(result.msg)
                    }
                }else{
                   if(!this.state.valueId){
                        message.error('请选择二级分类')
                    }
                }
            }
        });
    };

    getImageUrl = (url) =>  {
        this.setState({
            cover : url
        })
    }



    loadData = async (selectedOptions) => {
        const result = await reqFindClassAll()
        result.length = 9
        //alert(JSON.stringify(result))
        const a = result.map(Item => ({
            value : Item.id,
            label : Item.name,
            children : Item.classify2List.map(Item1 => ({
                value : Item1.id,
                label : Item1.name,
            }))
        }))
        this.setState({
            options : a
        })
    }

    componentDidMount() {
        this.loadData()
    }

    onChange = (value, selectedOptions) => {
        const value1 = value.toString()
        const value2 =  value1.substring(2)
        const value3 = parseInt(value2)
        this.setState({
            valueId : value3
        })
    }

    render () {

        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span: 10 },
        };

        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form className='small-background' onSubmit={this.handleSubmit}>
                    <span className='title'>发布商品</span>
                    <Form.Item label='产品名称：' {...formItemLayout} style={{paddingTop:30}}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入产品名称' }],
                        })(
                            <Input placeholder='请输入产品名称'/>
                        )}
                    </Form.Item>
                    <Form.Item label='产品介绍：' {...formItemLayout}>
                        {getFieldDecorator('intro', {
                            rules: [{ required: true, message: '请输入产品介绍' }],
                        })(
                            <TextArea placeholder='请输入产品介绍'/>
                        )}
                    </Form.Item>
                    <Form.Item label='价格：' {...formItemLayout}>
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: '请输入产品价格' },
                                {pattern:/^\+?((0|([1-9]+\d*))|((0\.\d+)|([1-9]+\d*\.\d+)))$/,message:'价格必须为数字,且不能为负数'}
                            ],
                        })(
                            <Input placeholder='请输入商品价格' addonAfter='元'/>
                        )}
                    </Form.Item>
                    <Form.Item label='微信号：' {...formItemLayout}>
                        {getFieldDecorator('weixin', {
                            rules: [ {required: true,whiteSpace: true,message:'微信号必须输入'},
                                ],
                        })(
                            <Input placeholder='请输入微信号' addonBefore= {<Icon type='wechat'/>}/>
                        )}
                    </Form.Item>
                    <Form.Item label='产品分类' {...formItemLayout}>
                        <Cascader
                            options={this.state.options}
                            loadData={this.loadData}
                            onChange={this.onChange}
                            changeOnSelect
                        />
                    </Form.Item>
                    <Form.Item label='产品图片：' {...formItemLayout}>
                        <PictureWall
                            ref={this.pw}
                        />
                    </Form.Item>
                    <Button type='primary' htmlType='submit' style={{marginBottom:10}}>提交</Button>
                </Form>
            </div>
        )
    }
}

export default Form.create()(PutProduct)
