import React, {Component} from 'react'
import {Comment, Modal, Form, Button, Input, Avatar, message, Icon} from 'antd';
import PropTypes from 'prop-types'
import {reqSaveComment, reqReplayComment, reqLikeComment} from '../../api/index'
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";
import storageUtilsToken from '../../utils/storageUtils-token'


class ProductComment extends Component {

    state = {
        CommentAllList: [],
        visible: false,
        comment: {},
        like: '',
    }

    static propTypes = {
        ProductDetail: PropTypes.object.isRequired,
        getProductDetail: PropTypes.func
    }


    getCommentsNodes = (CommentAllList) => {
        return CommentAllList.map(item => {
            //如果没有children
            if (!item.replyList) {
                return (
                    <Comment
                        key={item.commentid}
                        actions={item.state === null ?
                            [
                                <span
                                    onClick={() => this.ClickReplay(item)}
                                    style={{marginRight: 15}}>回复
                                </span>,
                                <Icon
                                    id={item.createtime}
                                    type="like"
                                    style={{marginRight: 15, cursor: 'pointer'}}
                                    onClick={() => this.ClickLike(item)}
                                />,
                                <p id={item.leaf === null ? item.commentid : item.id}>{item.number}</p>
                            ] : [
                                <span onClick={() => this.ClickReplay(item)} style={{marginRight: 15}}>回复</span>,
                                <Icon
                                    id={item.createtime}
                                    type="like"
                                    style={{marginRight: 15, color: '#FF0000', cursor: 'pointer'}}
                                    onClick={() => this.ClickLike(item)}
                                />,
                                <p id={item.leaf === null ? item.commentid : item.id}>{item.number}</p>
                            ]}
                        author={item.leaf === null ? <span>{item.user.username}</span> :
                            <span>{item.user.username} 回复了 {item.parentname}</span>}
                        avatar={<Avatar src={item.user.img} style={{marginLeft: 20}}/>}
                        content={(
                            <p style={{float: 'left', marginTop: 10}}>
                                {item.content}
                            </p>
                        )}
                        datetime={item.createtime}
                    />
                )
            } else {
                return (
                    <Comment
                        key={item.leaf === null ? item.commentid : item.id}
                        actions={item.state === null ?
                            [
                                <span onClick={() => this.ClickReplay(item)} style={{marginRight: 15}}>回复</span>,
                                <Icon
                                    id={item.createtime}
                                    type="like"
                                    style={{marginRight: 15, cursor: 'pointer'}}
                                    onClick={() => this.ClickLike(item)}
                                />,
                                <p id={item.leaf === null ? item.commentid : item.id}>{item.number}</p>
                            ] : [
                                <span onClick={() => this.ClickReplay(item)} style={{marginRight: 15}}>回复</span>,
                                <Icon
                                    id={item.createtime}
                                    type="like"
                                    style={{marginRight: 15, color: '#FF0000', cursor: 'pointer'}}
                                    onClick={() => this.ClickLike(item)}
                                />,
                                <p id={item.leaf === null ? item.commentid : item.id}>{item.number}</p>
                            ]}
                        author={item.leaf === null ? <span>{item.user.username}</span> :
                            <span>{item.user.username} 回复了 {item.parentname}</span>}
                        avatar={<Avatar src={item.user.img} style={{marginLeft: 20}}/>}
                        content={(
                            <p style={{float: 'left', marginTop: 10}}>
                                {item.content}
                            </p>
                        )}
                        datetime={item.createtime}
                    >
                        {
                            this.getCommentsNodes(item.replyList)
                        }
                    </Comment>
                )
            }
        })
    }

    ClickReplay = (comment) => {
        this.setState({
            visible: true,
            comment,
        })
    }

    ClickLike = async (item) => {
        if (item.state === null) {
            document.getElementById(item.createtime).style.color = '#FF0000'
            document.getElementById(item.leaf === null ? item.commentid : item.id).innerHTML = ++item.number
            item.state = 1
        } else {
            document.getElementById(item.createtime).style.color = ''
            document.getElementById(item.leaf === null ? item.commentid : item.id).innerHTML= --item.number
            item.state = null
        }
        if(!memoryUtils.user){
            message.error('请登录，享受更多惊喜')
        }else{
            const type = item.leaf === null ? 'comment' + ':' + item.commentid + ':' + memoryUtils.user.id : 'reply' + ':' + item.id + ':' + memoryUtils.user.id
            const state = item.state === 1 ? '1' : '0'
            await reqLikeComment(type,state)
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const content = values.content
                const userid = memoryUtils.user ? memoryUtils.user.id : null
                const goodsid = this.props.ProductDetail.id
                const result = await reqSaveComment(content, userid, goodsid)
                if (result.code === 0) {
                    message.success('评论成功')
                } else {
                    message.error(result.msg)
                    if (result.msg === '请登录') {
                        memoryUtils.user = ''
                        memoryUtils.token = ''
                        storageUtils.RemoveUser()
                        storageUtilsToken.RemoveToken()
                        this.props.history.replace('/home')
                    }
                }
                this.props.form.resetFields()
                this.props.getProductDetail()
            }
        });
    }

    ReplayComment = async () => {
        const comment = this.state.comment
        const content = document.getElementById('replayComment').value
        const userid = memoryUtils.user ? memoryUtils.user.id : null
        const commentid = comment.commentid
        const goodsid = comment.goodsid
        const nameid = comment.user.id
        const leaf = comment.leaf === null ? '0' : comment.id
        const parentname = comment.user.username
        const result = await reqReplayComment(content, userid, commentid, goodsid, nameid, leaf, parentname)
        if (result.code === 0) {
            message.success('回复成功')
        } else {
            message.error(result.msg)
        }
        this.setState({
            visible: false
        })
        this.props.getProductDetail()
    }



    componentWillReceiveProps(nextProps) {
        const CommentAllList = nextProps.ProductDetail.commentList
        if (nextProps.ProductDetail !== this.state.ProductDetail) {
            this.setState({
                CommentAllList
           })
        }
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {CommentAllList, visible} = this.state
        return (
            <div>
                {this.getCommentsNodes(CommentAllList)}
                <span style={{display: 'flex'}}>
                        <Avatar size='large'
                                src={memoryUtils.user ? memoryUtils.user.img : 'https://api.youzixy.com/public/uploads/avatar/default1.png'}
                                style={{margin: 20}}/>
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
                <Modal
                    destroyOnClose
                    title="回复"
                    visible={visible}
                    onOk={this.ReplayComment}
                    onCancel={() => this.setState({visible: false})}
                >
                    <Input id='replayComment' onPressEnter={this.ReplayComment}/>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(ProductComment)

