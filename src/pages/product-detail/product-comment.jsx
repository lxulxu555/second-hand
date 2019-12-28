import React, {Component} from 'react'
import {Comment, Tooltip, List} from 'antd';
import PropTypes from 'prop-types'
import moment from 'moment';

export default class App extends Component {

    state = {
        ProductDetail: {},
        data: []
    }

    static propTypes = {
        ProductDetail: PropTypes.object.isRequired
    }

    getCommentList = () => {
        const CommentList = this.state.ProductDetail.commentList
        const data = CommentList.reduce((pre, comment) => {
            pre.push(
                {
                    actions: [<span key="comment-list-reply-to-0">Reply to</span>],
                    author: comment.user.username,
                    avatar: comment.user.img,
                    content: (
                        <p>
                            {comment.content}
                        </p>
                    ),
                    datetime: (
                        <Tooltip
                            title={moment()
                                .subtract(1, 'days')
                                .format('YYYY-MM-DD HH:mm:ss')}
                        >
                             <span>
                              {moment()
                                  .subtract(1, 'days')
                                  .fromNow()}
                              </span>
                        </Tooltip>
                    ),
                }
            )
            return pre
        }, [])
        this.setState({
            data
        })

    }


    componentWillReceiveProps(nextProps) {
        const ProductDetail = nextProps.ProductDetail
        this.setState({
            ProductDetail
        }, () => {
            this.getCommentList()
        })
    }

    render() {
        const data = this.state.data

        return (
            <List
                className="comment-list"
                header={`${data.length} 条评论`}
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <li>
                        <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                        />
                    </li>
                )}
            />
        )
    }
}

