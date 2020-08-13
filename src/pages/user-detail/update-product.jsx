import React,{Component} from 'react'
import PropTypes from 'prop-types'
import { Form, Input} from 'antd'
import {connect} from 'react-redux'
import UpdateImage from '../../utils/upload-image'

const {TextArea} = Input

class UpdateProduct extends Component{

    state = {
        images : [],
    }

    static propTypes = {
        setForm : PropTypes.func.isRequired,
        ProductInfo : PropTypes.object.isRequired
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
        const {ProductInfo} = this.props
        const {name,intro,price1,weixin,images} = ProductInfo


        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Item label='产品名称：' {...formItemLayout} style={{paddingTop:30}}>
                    {getFieldDecorator('name', {
                        initialValue : name,
                        rules: [{ required: true, message: '请输入产品名称' }],
                    })(
                        <Input placeholder='请输入产品名称'/>
                    )}
                </Form.Item>
                <Form.Item label='产品介绍：' {...formItemLayout}>
                    {getFieldDecorator('intro', {
                        initialValue : intro,
                        rules: [{ required: true, message: '请输入产品介绍' }],
                    })(
                        <TextArea placeholder='请输入产品介绍'/>
                    )}
                </Form.Item>
                <Form.Item label='价格：' {...formItemLayout}>
                    {getFieldDecorator('price1', {
                        initialValue : price1,
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
                        initialValue : weixin,
                        rules: [{ required: true, message: '请输入卖家微信号' }],
                    })(
                        <Input placeholder='请输入微信号'/>
                    )}
                </Form.Item>
                <Form.Item label='产品图片：' {...formItemLayout}>
                    <UpdateImage
                        images = {images}
                    />
                </Form.Item>
            </Form>
        )
    }
}

const mapStateToProps = ({productAll}) => ({
    productAll
})

const mapDispatchToProps = (dispatch) => ({

})

const WrapLogin = Form.create()(UpdateProduct)
export default connect(mapStateToProps,mapDispatchToProps)(WrapLogin)

