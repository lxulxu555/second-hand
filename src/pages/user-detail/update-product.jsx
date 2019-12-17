import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input} from 'antd'
import {PictureWall} from "./PictureWall";
import UpLoadImage from "./UpLoadImage";

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

    getImageUrl = (url) => {
        this.props.UpLoadImage(url)
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
            <Form>
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
                        rules: [{ required: true, message: '请输入产品价格' }],
                    })(
                        <Input placeholder='请输入商品价格'/>
                    )}
                </Form.Item>
                <Form.Item label='手机号：' {...formItemLayout}>
                    {getFieldDecorator('phone', {
                        initialValue : this.props.sendProduct.phone,
                        rules: [{ required: true, message: '请输入卖家手机号' }],
                    })(
                        <Input placeholder='请输入联系手机号'/>
                    )}
                </Form.Item>
                <Form.Item label='产品图片：' {...formItemLayout}>
                    <PictureWall
                        PictureWall = {(fileList) => this.getFileList(fileList)}
                        sendProduct = {this.props.sendProduct}
                    />
                </Form.Item>
                <Form.Item label='背景图片：' {...formItemLayout}>
                    <UpLoadImage
                        UpLoadImage = {(url) => this.getImageUrl(url)}
                    />
                </Form.Item>
            </Form>
        )
    }
}

const WrapLogin = Form.create()(UpdateProduct)
export default WrapLogin

