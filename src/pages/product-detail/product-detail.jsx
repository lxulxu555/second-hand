import React,{Component} from 'react'
import {withRouter,Link} from 'react-router-dom'
import './product-detail.less'
import {Avatar,Icon} from 'antd'

import {reqFindIdProduct} from '../../api/index'

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
        if(images){
            return images.map(Item => {
                return (
                    <img src={Item.url}
                         onClick={() => this.BigImage(Item.url)}
                         style={{paddingRight:20,width:100,height:80}}
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
                <span className='detail'>
                    <span className='image-wall'>
                        <span>
                            {BigImageUrl
                                ?    <img src={BigImageUrl}  style={{width:300,height:300,border:'1px solid'}}/>
                                :    <img src={ProductDetail.cover}  style={{width:300,height:300,border:'1px solid'}}/>
                            }
                        </span>
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
                                    state : this.state.UserInfo.id
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

