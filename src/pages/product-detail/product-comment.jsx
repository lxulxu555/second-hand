import React, {Component} from 'react'
import {Comment, Modal, Form, Button, Input, Avatar, message, Icon} from 'antd';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {SendComment,ReplyComment,LikeComment} from '../../redux/action/product'


class ProductComment extends Component {

    state = {
        visible: false,
        comment: {},
        like: '',
    }

    static propTypes = {
        getProductDetail: PropTypes.func
    }


    getCommentsNodes = (commentList) => {
        return commentList.map(item => {
            return (
                <Comment
                    key={item.leaf === null ? item.commentid : item.id}
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
                    author={item.leaf === null ? <span>{item.user.nickname}</span> :
                        <span>{item.user.nickname} 回复了 {item.parentname}</span>}
                    avatar={<Avatar src={item.user.img} style={{marginLeft: 20}}/>}
                    content={(
                        <p style={{float: 'left', marginTop: 10}}>
                            {item.content}
                        </p>
                    )}
                    datetime={item.createtime}
                >
                    {
                        !item.replyList ? <div/> : this.getCommentsNodes(item.replyList)
                    }
                </Comment>
            )
        })
    }


    ClickReplay = (comment) => {
        this.setState({
            visible: true,
            comment,
        })
    }

    ClickLike = async (item,index) => {
        const {user} = this.props
        if (!user) {
            message.error('请登录，享受更多惊喜')
        } else {
            if (item.state === null) {
                document.getElementById(item.createtime).style.color = '#FF0000'
                document.getElementById(item.leaf === null ? item.commentid : item.id).innerHTML = ++item.number
                item.state = 1
            } else {
                document.getElementById(item.createtime).style.color = ''
                document.getElementById(item.leaf === null ? item.commentid : item.id).innerHTML = --item.number
                item.state = null
            }
            const type = item.leaf === null ? 'comment' + ':' + item.commentid + ':' + user.id : 'reply' + ':' + item.id + ':' + user.id
            const state = item.state === 1 ? '1' : '0'
            this.props.LikeComment(type, state)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const content = values.content
                const userid = this.props.user ? this.props.user.id : null
                const goodsid = this.props.productDetail.detail.id
                this.props.SendComment(content, userid, goodsid,() => {
                    this.props.form.resetFields()
                    this.props.getProductDetail()
                })
            }
        });
    }

    ReplayComment = async () => {
        const {user} = this.props
        const {comment} = this.state
        const content = document.getElementById('replayComment').value
        const userid = user ? user.id : null
        const commentid = comment.commentid
        const goodsid = comment.goodsid
        const nameid = comment.user.id
        const leaf = comment.leaf === null ? '0' : comment.id
        const parentname = comment.user.nickname
        const reply = {content,userid,commentid,goodsid,nameid,leaf,parentname}
        this.props.ReplyComment(reply,() => {
            this.setState({
                visible: false
            })
            this.props.getProductDetail()
        })
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        const {user} = this.props
        const {detail} = this.props.productDetail
        const {commentList} = detail
        const {visible} = this.state
        return (
            <div>
                {this.getCommentsNodes(commentList)}
                <span style={{display: 'flex'}}>
                        <Avatar size='large'
                                src={user.id !== '' ? user.img : 'https://api.youzixy.com/public/uploads/avatar/default1.png'}
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

const mapStateToProps = ({productDetail, user}) => ({
    productDetail, user
})

const mapDispatchToProps = (dispatch) => ({
    SendComment : (content,userid,goodsid,callback) => SendComment(content,userid,goodsid,callback),
    ReplyComment : (reply,callback) => ReplyComment(reply,callback),
    LikeComment : (type,state) => LikeComment(type,state)
})

export default Form.create()(connect(mapStateToProps, mapDispatchToProps)(ProductComment))

