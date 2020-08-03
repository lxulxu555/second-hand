import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import './product-detail.less'
import {Avatar, Icon, Modal, Row, Col, BackTop} from 'antd'
import {connect} from 'react-redux'
import LinkButton from "../../components/link-button/link-button";
import ProductComment from './product-comment'
import {GetProductDetail} from '../../redux/action/product'

class ProductDetail extends Component {


    state = {
        BigImageUrl: '',
        visible: false
    }

    getProductDetail = async () => {
        this.props.GetProductDetail(this.props.location.state)
    }

    BigImage = (url) => {
        const BigImageUrl = url
        this.setState({
            BigImageUrl
        })
    }

    imageList = () => {
        const {detail} = this.props.productDetail
        const {images} = detail
        const image = images.split(",")
        if (image && image.length > 0) {
            return image.map(Item => {
                return (
                    <img src={Item}
                         onClick={() => this.BigImage(Item)}
                         style={{width: 100, height: 80, marginLeft: 5}}
                         alt='img'
                         key={Item}
                    />
                )
            })
        }
    }


    componentDidMount() {
        this.getProductDetail()
        document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部
    }


    render() {
        const {BigImageUrl, visible} = this.state

        const {detail} = this.props.productDetail
        const {user, images} = detail
        const image = images.split(",")[0]


        return (
            <div className='small-background'>
                 <span style={{float: 'left'}}>
                    <LinkButton>
                    <Icon
                        type='arrow-left'
                        className='arrow-left'
                        onClick={() => this.props.history.goBack()}
                    />
                    </LinkButton>
                     <span style={{fontSize: 15}}>商品详情</span>
                </span>

                <span className='detail'>
                    <span className='image-wall'>
                        {
                            <span onClick={() => this.setState({
                                visible: true
                            })}
                                  style={{cursor: 'pointer'}}>
                            {BigImageUrl ?
                                <img src={BigImageUrl} style={{width: 300, maxHeight: 500, border: '1px solid'}}
                                     alt='img'/>
                                :
                                <img src={image}
                                     style={{width: 300, maxHeight: 500, border: '1px solid'}}
                                     alt='img'
                                />
                            }
                        </span>
                        }

                        <span className='image-small'>
                    {this.imageList()}
                </span>
                    </span>

                    <div className='right-detail'>
                        <span style={{display: 'flex'}}>
                        <Avatar
                            size={"large"}
                            src={user.img}
                        />
                            <span className='sell-username'>
                                卖家账号：
                                <Link to={{
                                    pathname: '/product-user-detail',
                                    state: user
                                }}>
                                {user.username}
                                </Link>
                                </span>
                        </span>
                        <span className='detail-title'>
                            {detail.name}
                        </span>
                        <span
                            className='detailIntro'
                        >
                          {detail.intro}
                        </span>
                        <span className='a'>
                            <Icon type="dollar-circle" theme="filled" style={{paddingRight: 15}}/>
                            {detail.price1}元
                        </span>
                        <span className='a'>
                            <Icon type="bank" theme="filled" style={{paddingRight: 15}}/>
                            西安欧亚学院
                        </span>
                        <span className='a'>
                           <Icon type="notification" theme="filled" style={{paddingRight: 15}}/>
                            {detail.create_time}
                        </span>
                        <span className='a'>
                            <Icon type="phone" theme="filled" style={{paddingRight: 15}}/>
                            {this.props.user ? user.phone :
                                <LinkButton onClick={() => this.props.history.replace('/login')}>
                                    登录查看联系方式
                                </LinkButton>}
                        </span>
                         <span className='a'>
                            <Icon type="wechat" theme="filled" style={{paddingRight: 15}}/>
                             {this.props.user ? detail.weixin :
                                 <LinkButton onClick={() => this.props.history.replace('/login')}>
                                     登录查看微信
                                 </LinkButton>}
                        </span>
                    </div>
                </span>
                <Row>
                    <Col xs={24} md={24} xxl={24}>
                        <span className='comment-wall'>评论墙</span>
                    </Col>
                </Row>
                <ProductComment  getProductDetail={this.getProductDetail}/>
                <Modal
                    visible={visible}
                    onCancel={() => {
                        this.setState({
                            visible: false
                        })
                    }}
                    footer={null}
                >
                    {BigImageUrl ? <img src={BigImageUrl} alt='img'/> : <img src={image} alt='img'/>}
                </Modal>
                <BackTop/>
            </div>
        )
    }
}

const mapStateToProps = ({productDetail, user}) => ({
    productDetail, user
})

const mapDispatchToProps = (dispatch) => ({
    GetProductDetail: (id) => dispatch(GetProductDetail(id))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail))

