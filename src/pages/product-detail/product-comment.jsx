import React, {Component} from 'react'
import {Comment, Tooltip, List, Form, Button, Input, Avatar, message} from 'antd';
import PropTypes from 'prop-types'
import moment from 'moment';
import {reqSaveComment} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";


class ProductComment extends Component {

    state = {
        ProductDetail: {},
        CommentAllList: [],
        children: {}
    }

    static propTypes = {
        ProductDetail: PropTypes.object.isRequired
    }


    getCommentList = () => {
        const CommentList = this.state.ProductDetail.commentList || {}
        const CommentAllList = CommentList.map(comment => ({
                actions: [<span>回复</span>],
                author: comment.user.username,
                avatar: comment.user.img,
                content: (
                    <p style={{float: 'left', marginTop: 10}}>
                        {comment.content}
                    </p>
                ),
                datetime: comment.createtime,
                children: comment.replyList.map(childrenComment => ({
                    actions: [<span>回复</span>],
                    author: childrenComment.user.username,
                    avatar: childrenComment.user.img,
                    content: (
                        <p style={{float: 'left', marginTop: 10}}>
                            {childrenComment.content}
                        </p>
                    ),
                }))
            }))
            this.setState({
                CommentAllList
            })
    }


    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const content = values.content
                const userid = memoryUtils.user.id
                const goodsid = this.state.ProductDetail.id
                const result = await reqSaveComment(content, userid, goodsid)
                if (result.code === 0) {
                    message.success('评论成功')
                } else {
                    message.error(result.msg)
                }
                this.props.form.resetFields()
                this.getCommentList()
            }
        });
    }

    getCommentsNodes = (CommentAllList) => {
        return CommentAllList.map(item => {
            //如果没有children
            if(!item.children){
                return (
                    <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                    />
                )
            } else {
                return (
                    <Comment
                        actions={item.actions}
                        author={item.author}
                        avatar={item.avatar}
                        content={item.content}
                        datetime={item.datetime}
                    >
                        {
                            this.getCommentsNodes(item.children)
                        }
                    </Comment>
                )
            }

        })
    }


    componentWillReceiveProps(nextProps) {
        const ProductDetail = nextProps.ProductDetail
        if (nextProps.ProductDetail !== this.state.ProductDetail) {
            this.setState({
                ProductDetail
            }, () => {
                this.getCommentList()
            })
        }
    }


    render() {
        console.log(this.state.CommentAllList)
        const {getFieldDecorator} = this.props.form;
        const {CommentAllList} = this.state
        return (
            <div>
                {this.getCommentsNodes(CommentAllList)}
                <span style={{display: 'flex'}}>
                        <Avatar size='large' src={memoryUtils.user.img} style={{margin: 20}}/>
                <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    {
                        getFieldDecorator('content', {
                            rules: [
                                {required: true, whiteSpace: true, message: '评论不能为空'},
                            ]
                        })(
                            <Input.TextArea rows={4} placeholder='请输入您的评论' style={{width: 800, marginTop: 20}}/>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        发表评论
                    </Button>
                </Form.Item>
                </Form>
                </span>
            </div>
        )
    }
}

export default Form.create()(ProductComment)

