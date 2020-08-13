import React, {Component} from 'react'
import {Form, Input,Button,Cascader,Icon} from "antd";

import './put-product.less'
import PictureWall from "../../utils/upload-image";
import {connect} from 'react-redux'
import {PutNewProduct} from '../../redux/action/product'

const {TextArea} = Input

class PutProduct extends Component{


    state = {
        options : [],
        valueId : ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            values.classify2_id = this.state.valueId
            this.props.PutNewProduct(values,() => {
                this.props.history.replace('/home')
            })
        });
    };



    loadData = async () => {
        const {allClass} = this.props.productAllClass
        allClass.length = 9
        const allclass = allClass.map(Item => ({
            value : Item.id,
            label : Item.name,
            children : Item.classify2List.map(Item1 => ({
                value : Item1.id,
                label : Item1.name,
            }))
        }))
        this.setState({
            options : allclass
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
                        {getFieldDecorator('price1', {
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

const mapStateToProps = ({user,productImage,productAllClass}) => ({
    user,productImage,productAllClass
})

const mapDispatchToProps = (dispatch) => ({
    PutNewProduct : (values,callback) => dispatch(PutNewProduct(values,callback))
})

export default Form.create()(connect(mapStateToProps,mapDispatchToProps)(PutProduct))
