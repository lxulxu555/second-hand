import React, {Component} from 'react'
import { Layout} from 'antd';
import {Switch,Route,Redirect} from 'react-router-dom'

import TopNav from '../../components/top-nav/top-nav'
import Home from '../../pages/home/home'
import WantBuy from '../../pages/want-buy/want-buy'
import PutProduct from '../../pages/put-product/put-product'
import PutBuy from '../../pages/put-buy/put-buy'
import UpdateUser from "../update-user/update-user";
import ProductDetail from '../../pages/product-detail/product-detail'
import UserDetail from '../../pages/user-detail/user-datail'
import ProductUserDetail from "../product-detail/product-user-detail";
import UserBuyDetail from '../user-buy-detail/user-buy-detail'


const { Header, Content, Footer } = Layout;


export default class HomePage extends Component {






    render() {
        return (
            <Layout className="layout"  style={{minHeight:'100%'}}>
                <Header>
                    <TopNav/>
                </Header>
                <Content style={{margin : 20}}>
                    <Switch>
                        <Route path='/home' component={Home}  />
                        <Route path='/wantbuy' component={WantBuy}/>
                        <Route path='/product' component={PutProduct}/>
                        <Route path='/putbuy' component={PutBuy}/>
                        <Route path='/updateuser' component={UpdateUser}/>
                        <Route path = '/product-detail' component={ProductDetail}/>
                        <Route path = '/user-detail' component={UserDetail}/>
                        <Route path = '/product-user-detail' component={ProductUserDetail}/>
                        <Route path = '/user-buy-detail' component={UserBuyDetail}/>
                        <Redirect to='/home'/>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

