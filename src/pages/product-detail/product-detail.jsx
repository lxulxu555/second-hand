import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import './product-detail.less'
import {Avatar,Icon} from 'antd'

import {reqFindIdProduct} from '../../api/index'
import LinkButton from "../../components/link-button/link-button";
import noproduct from '../../utils/8a52be7f15d4576ce96c64703d98abd4.png'

class ProductDetail extends Component{


    state = {
        ProductDetail : '',
        UserInfo : '',
        BigImageUrl : '',
    }

    getProductDetail = async () => {
        const result = await reqFindIdProduct(this.props.location.state)
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
        const {images} = this.state.ProductDetail
        console.log('图片',images)
        if(images && images.length>0){
            return images.map(Item => {
                return (
                    <img src={Item.url}
                         onClick={() => this.BigImage(Item.url)}
                         style={{width:100,height:80,marginLeft:5}}
                         alt='img'
                         key={Item.id}
                    />
                )
            })
        }
    }



    componentDidMount(){
        this.getProductDetail()
    }

    render () {
        const {BigImageUrl,ProductDetail,UserInfo} = this.state



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
                        <span>
                            {BigImageUrl  ?    <img src={BigImageUrl}  style={{width:300,height:300,border:'1px solid'}}  alt='img' />
                                :
                                <img src={ProductDetail.cover}
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
                            <span className={'sell-username'}>
                                卖家账号：
                                <Link to={{
                                    pathname : '/product-user-detail',
                                    state : this.state.UserInfo
                                }}>
                                {UserInfo.username}
                                </Link>
                                </span>
                        </span>
                        <span className='detail-title'>
                            {ProductDetail.name}
                        </span>
                        <span style={{paddingTop:10,color:'#616776',fontSize:15}}>
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
                            {ProductDetail.phone}
                        </span>
                    </span>
                </span>
            </div>
        )
    }
}

export default withRouter(ProductDetail)

