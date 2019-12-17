import React,{Component} from 'react'
import {Input,Form} from "antd";
import PropTypes from 'prop-types'

const {TextArea} = Input
 class UpdateWantBuy extends Component{

    static propTypes = {
        product : PropTypes.object.isRequired,
        setForm : PropTypes.func.isRequired
    }

    componentWillMount(){
        this.props.setForm(this.props.form)
    }

    render () {

        const formItemLayout = {
            labelCol: { span: 6},
            wrapperCol: { span: 10 },
        };

        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <Form  onSubmit={this.handleSubmit}>
                    <Form.Item label='产品名称：' {...formItemLayout} style={{paddingTop:30}}>
                        {getFieldDecorator('title', {
                            initialValue:this.props.product.title,
                            rules: [{ required: true, message: '请输入产品标题' }],
                        })(
                            <Input placeholder='请输入产品标题'/>
                        )}
                    </Form.Item>
                    <Form.Item label='产品介绍：' {...formItemLayout}>
                        {getFieldDecorator('intro', {
                            initialValue:this.props.product.intro,
                            rules: [{ required: true, message: '请输入产品介绍' }],
                        })(
                            <TextArea placeholder='请输入产品介绍'/>
                        )}
                    </Form.Item>
                    <Form.Item label='微信：' {...formItemLayout}>
                        {getFieldDecorator('weixin', {
                            initialValue:this.props.product.weixin,
                            rules: [{ required: true, message: '请输入你的微信' }],
                        })(
                            <Input placeholder='请输入你的微信'/>
                        )}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(UpdateWantBuy)

