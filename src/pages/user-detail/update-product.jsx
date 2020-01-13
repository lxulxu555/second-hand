import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input} from 'antd'
import {PictureWall} from "./PictureWall";

const {TextArea} = Input

class UpdateProduct extends Component{

    state = {
        images : [],
    }

    static propTypes = {
        setForm : PropTypes.func.isRequired,
        sendProduct : PropTypes.object.isRequired
    }



    getFileList = (fileList) => {
        this.props.PictureWall(fileList)
    }



    componentWillMount () {
        this.props.setForm(this.props.form)
    }

    render () {


        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span: 10 },
        };

        const { getFieldDecorator } = this.props.form;



        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label='产品名称：' {...formItemLayout} style={{paddingTop:30}}>
                    {getFieldDecorator('name', {
                        initialValue : this.props.sendProduct.name,
                        rules: [{ required: true, message: '请输入产品名称' }],
                    })(
                        <Input placeholder='请输入产品名称'/>
                    )}
                </Form.Item>
                <Form.Item label='产品介绍：' {...formItemLayout}>
                    {getFieldDecorator('intro', {
                        initialValue : this.props.sendProduct.intro,
                        rules: [{ required: true, message: '请输入产品介绍' }],
                    })(
                        <TextArea placeholder='请输入产品介绍'/>
                    )}
                </Form.Item>
                <Form.Item label='价格：' {...formItemLayout}>
                    {getFieldDecorator('price1', {
                        initialValue : this.props.sendProduct.price1,
                        rules: [
                            { required: true, message: '请输入产品价格' },
                            {pattern:/^\+?((0|([1-9]+\d*))|((0\.\d+)|([1-9]+\d*\.\d+)))$/,message:'价格必须为数字,且不能为负数'}
                        ],
                    })(
                        <Input placeholder='请输入商品价格'/>
                    )}
                </Form.Item>
                <Form.Item label='微信：' {...formItemLayout}>
                    {getFieldDecorator('weixin', {
                        initialValue : this.props.sendProduct.weixin,
                        rules: [{ required: true, message: '请输入卖家微信号' }],
                    })(
                        <Input placeholder='请输入微信号'/>
                    )}
                </Form.Item>
                <Form.Item label='产品图片：' {...formItemLayout}>
                    <PictureWall
                        PictureWall = {(fileList) => this.getFileList(fileList)}
                        images = {this.props.sendProduct.images}
                    />
                </Form.Item>
            </Form>
        )
    }
}

const WrapLogin = Form.create()(UpdateProduct)
export default WrapLogin

