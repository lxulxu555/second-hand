import React,{Component} from 'react'
import {Button, Form, Input} from 'antd'


import './put-buy.less'
import {PutNewBuy} from '../../redux/action/buy'
import {connect} from 'react-redux'
const {TextArea} = Input

class PutBuy extends Component{

    state = {
        buyProduct : {}
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields( async (err, values) => {
            if (!err) {
                values.userid = this.props.user.id
                this.props.PutNewBuy(values,() => {
                    this.props.history.replace('/wantbuy')
                })
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

const mapStateToProps = ({user}) => ({
    user
})

const mapDispatchToProps = (dispatch) => ({
    PutNewBuy : (condition,callback) => dispatch(PutNewBuy(condition,callback))
})

export default Form.create()(connect(mapDispatchToProps,mapStateToProps)(PutBuy))


