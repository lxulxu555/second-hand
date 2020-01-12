import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import './product-detail.less'
import {Avatar,Icon,Modal,Row,Col, BackTop} from 'antd'

import {reqFindIdProduct} from '../../api/index'
import LinkButton from "../../components/link-button/link-button";
import memoryUtils from "../../utils/memoryUtils";
import ProductComment from './product-comment'

class ProductDetail extends Component{


    state = {
        ProductDetail : '',
        UserInfo : '',
        BigImageUrl : '',
        visible : false
    }

    getProductDetail = async () => {
        const userid = memoryUtils.user ? memoryUtils.user.id : ''
        const result = await reqFindIdProduct(this.props.location.state,userid)
        const UserInfo = result.user
        this.setState({
            ProductDetail : result,
            UserInfo,
        })
    }

    BigImage = (url) => {
        const BigImageUrl = url
        this.setState({
            BigImageUrl
        })
    }

    imageList = () => {
        const images = this.state.ProductDetail.images || ''
        const image = images.split(",")
            if(image && image.length>0){
                return image.map(Item => {
                    return (
                        <img src={Item}
                             onClick={() => this.BigImage(Item)}
                             style={{width:100,height:80,marginLeft:5}}
                             alt='img'
                             key={Item}
                        />
                    )
                })
            }
    }


    componentDidMount(){
        this.getProductDetail()
        document.getElementById('root').scrollIntoView(true);//为ture返回顶部，false为底部
    }





    render () {
        const {BigImageUrl,UserInfo,visible} = this.state
        const ProductDetail = this.state.ProductDetail || {}
        const user = ProductDetail.user || {}
        const images = this.state.ProductDetail.images || ''
        const image = images.split(",")[0]

        return (
            <div className='small-background'>

                 <span style={{float:'left'}}>
                    <LinkButton>
                    <Icon
                        type='arrow-left'
                        style={{fontSize: 25, marginRight: 10,marginLeft:10}}
                        onClick={() => this.props.history.goBack()}
                    />
                    </LinkButton>
                     <span style={{fontSize:15}}>商品详情</span>
                </span>

                <span className='detail'>
                    <span className='image-wall'>
                        {
                        <span onClick={() => this.setState({
                            visible : true
                        })}
                        style={{cursor: 'pointer'}}>
                            {BigImageUrl  ?    <img src={BigImageUrl}  style={{width:300,height:300,border:'1px solid'}}  alt='img' />
                                :
                                <img src={image}
                                     style={{width:300,height:300,border:'1px solid'}}
                                     alt='img'
                                />
                            }
                        </span>
                        }

                <span className='image-small'>
                    {this.imageList()}
                </span>
                    </span>
                    <span className='right-detail'>
                        <span style={{display: 'flex'}}>
                        <Avatar
                            size={"large"}
                            src={UserInfo.img}
                        />
                            <span className='sell-username'>
                                卖家账号：
                                <Link to={{
                                    pathname : '/product-user-detail',
                                    state : this.state.UserInfo.id
                                }}>
                                {UserInfo.username}
                                </Link>
                                </span>
                        </span>
                        <span className='detail-title'>
                            {ProductDetail.name}
                        </span>
                        <span
                            style={{paddingTop:10,
                                color:'#616776',
                                fontSize:15,
                                textAlign:'left'
                            }}>
                            {ProductDetail.intro}
                        </span>
                        <span className='a'>
                            <Icon type="dollar-circle" theme="filled" style={{paddingRight: 15}}/>
                            {ProductDetail.price1}元
                        </span>
                        <span className='a'>
                            <Icon type="bank" theme="filled" style={{paddingRight: 15}}/>
                            西安欧亚学院
                        </span>
                        <span className='a'>
                           <Icon type="notification" theme="filled" style={{paddingRight: 15}}/>
                            {ProductDetail.create_time}
                        </span>
                        <span className='a'>
                            <Icon type="phone" theme="filled" style={{paddingRight: 15}}/>
                            {memoryUtils.user ? user.phone : <LinkButton onClick={() => this.props.history.replace('/login')}>
                                登录查看联系方式
                            </LinkButton>}
                        </span>
                         <span className='a'>
                            <Icon type="wechat" theme="filled" style={{paddingRight: 15}}/>
                             {memoryUtils.user ? ProductDetail.weixin : <LinkButton onClick={() => this.props.history.replace('/login')}>
                                 登录查看微信
                             </LinkButton>}
                        </span>
                    </span>
                </span>
                <Row>
                <Col xs={24} md={24} xxl={24}>
                <span style={{float:'left',marginTop:'10%',fontWeight:'bold',fontSize:25,marginLeft:20}}>评论墙</span>
                </Col>
                </Row>
                <ProductComment ProductDetail={ProductDetail} getProductDetail={this.getProductDetail}/>
                <Modal
                    visible={visible}
                    onCancel={() => {
                        this.setState({
                            visible : false
                        })
                    }}
                    footer = {null}
                >
                    {BigImageUrl ?   <img src={BigImageUrl} alt='img'/> : <img src={image}  alt='img'/>}
                </Modal>
                <BackTop/>
            </div>
        )
    }
}

export default withRouter(ProductDetail)

