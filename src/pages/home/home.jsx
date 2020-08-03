import React, {Component} from 'react'
import {Carousel, Menu, Row, Col, Input, Icon, Button} from 'antd'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'


import './home.less'
import Product from './product'
import {GetAllClass,SaveScroll} from '../../redux/action/product'

const {SubMenu} = Menu;

class Home extends Component {


    state = {
        One: [],
        success: false,
        currentKey: '',
        searchname: '',
        create_time : 'create_time desc',
        money :'price1 desc'
    }


    getOneList = () => {

        const One = this.props.productAllClass.allClass
        One.length = 9
        return One.map(item => {
            return (
                <SubMenu
                    key={item.id}
                    title={
                        <span>
                          <span>{item.name}</span>
                        </span>}
                >
                    <Menu.ItemGroup title="二级分类">
                        {item.classify2List.map(Citem => {
                            return <Menu.Item key={Citem.id}>{Citem.name}</Menu.Item>
                        })}
                    </Menu.ItemGroup>
                </SubMenu>
            )
        })
    }

    handleClick = ({item, key}) => {
        this.setState({
            currentKey: item.key,
            searchname: ''
        }, () => {
            if (document.getElementById('input').value !== '') {
                document.getElementById('input').value = ''
            }
        })
    }

    SearchName = () => {
        const searchname = this.textInput.state.value
        this.setState({
            searchname,
        })
    }



    ClickOrderBy = (type) => {
        const {money,create_time} = this.state
        if(type === 'price'){
            this.setState({
                money : money === 'price1' ? 'price1 desc' : 'price1'
            })
        }else{
            this.setState({
                create_time: create_time === 'create_time' ? 'create_time desc' : 'create_time'
            })
        }
    }



    scroll = () => {
        const y = this.props.productScroll.scroll
        const x = window.scrollX
        setTimeout(() => {
            window.scrollTo(x, y)
        }, 500)
    }

    handleScroll = () => {
        const scroll = document.scrollingElement.scrollTop
        this.props.SaveScroll(scroll)
    }

    componentDidMount() {
        this.scroll()
        this.props.getAllClass()
    }

    componentWillUnmount() {
        this.handleScroll()
    }


    render() {
        const {create_time,money, currentKey, searchname} = this.state
        const condition = {create_time,money, currentKey, searchname}

        return (
            <div>
            <span className="ParentFather">
                <Row>
                    <Col xs={24} md={4} xxl={5}>
            <div style={{marginBottom: 10}}>
                <Menu
                    onClick={(item, key) => this.handleClick({item, key})}
                    mode="vertical"
                    theme={"dark"}
                    className='menu'
                >
                    {this.getOneList()}
              </Menu>
            </div>
                    </Col>

                    <Col xs={24} md={20} xxl={19}>
            <Carousel autoplay className='Carousel-image'>
                <p>
                    <img data-v-7bfb6d44
                         src="https://api.youzixy.com/public/uploads/attach/2019/09/16/5d7f9df01b29f.jpg"
                         alt='img'
                         className='s'
                    />
                </p>
                <p>
                    <img data-v-7bfb6d44
                         src="https://api.youzixy.com/public/uploads/attach/2019/09/16/5d7f9df9c8ffd.jpg"
                         alt='img'
                         className='s'
                    />
                </p>
                <p>
                    <img data-v-7bfb6d44
                         src="https://api.youzixy.com/public/uploads/attach/2019/09/16/5d7f9de20f273.jpg"
                         alt='img'
                         className='s'
                    />
                </p>
            </Carousel>
                        <div>
                           <Input
                               id='input'
                               placeholder='请输入关键字'
                               className='search'
                               addonBefore={<Icon type='search'/>}
                               ref={(input) => this.textInput = input}
                               onPressEnter={() => this.SearchName()}
                           />

                        <Button
                            type='primary'
                            className='button'
                            onClick={() => this.SearchName()}
                        >
                            搜索
                        </Button>
                        <span style={{float: 'right', marginTop: 15, marginRight: 20}}>
                            <Button onClick={() => this.ClickOrderBy('price')}>
                                {
                                    money === 'price1' ? <Icon type="up"/> : <Icon type="down"/>
                                }
                                价格
                            </Button>
                            <Button onClick={() => this.ClickOrderBy('time')}>
                                 {
                                     create_time === 'create_time' ? <Icon type="up"/> : <Icon type="down"/>
                                 }
                                时间
                            </Button>
                        </span>
                        </div>
                    </Col>
                </Row>
            </span>
                <span>
                    <Product
                        condition = {condition}
                    />
                </span>
            </div>
        )
    }
}

const mapStateToProps = ({user, productAllClass,productScroll}) => ({
    user, productAllClass,productScroll
})

const mapDispatchToProps = (dispatch) => ({
    getAllClass: () => dispatch(GetAllClass()),
    SaveScroll : (scroll) => dispatch(SaveScroll(scroll))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
