import React,{Component} from 'react'
import {Button, Form, Input, message} from 'antd'

import {reqAddBuyProduct} from '../../api/index'

import './put-buy.less'
import memoryUtils from "../../utils/memoryUtils";

const {TextArea} = Input

class PutBuy extends Component{

    state = {
        buyProduct : {}
    }

    handleSubmit = (e) => {
        //debugger
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                const buyProduct = this.state.buyProduct
                buyProduct.title = values.title
                buyProduct.intro = values.intro
                buyProduct.weixin = values.weixin
                buyProduct.userid = memoryUtils.user.user.id
                buyProduct.token = memoryUtils.user.token
                const result = await reqAddBuyProduct(buyProduct)
                if(result.code === 0){
                    message.success('添加成功')
                    this.props.history.replace('/wantbuy')
                }else{
                    message.error('添加失败')
                }
            }
        });
    };

    render () {
        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span: 10 },
        };

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form className='small-background' onSubmit={this.handleSubmit}>
                    <span className='title'>发布求购信息</span>
                    <Form.Item label='产品名称：' {...formItemLayout} style={{paddingTop:30}}>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入产品标题' }],
                        })(
                            <Input placeholder='请输入产品标题'/>
                        )}
                    </Form.Item>
                    <Form.Item label='产品介绍：' {...formItemLayout}>
                        {getFieldDecorator('intro', {
                            rules: [{ required: true, message: '请输入产品介绍' }],
                        })(
                            <TextArea placeholder='请输入产品介绍'/>
                        )}
                    </Form.Item>
                    <Form.Item label='微信：' {...formItemLayout}>
                        {getFieldDecorator('weixin', {
                            rules: [{ required: true, message: '请输入你的微信' }],
                        })(
                            <Input placeholder='请输入你的微信'/>
                        )}
                    </Form.Item>
                    <Button type='primary' htmlType='submit' style={{marginBottom:10}}>提交</Button>
                </Form>
            </div>
        )
    }
}


export default   Form.create()(PutBuy)


