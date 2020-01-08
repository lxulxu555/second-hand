import React, {Component} from 'react'
import {Carousel, Menu, Row, Col, Input, Icon, Button} from 'antd'
import {withRouter} from 'react-router-dom'


import './home.less'
import {reqFindOne} from '../../api/index'
import Product from './product'
import memoryUtils from "../../utils/memoryUtils";
import Scroll1 from '../../utils/scroll'

const {SubMenu} = Menu;

class Home extends Component {


    state = {
        One: [],
        success: false,
        currentKey: '',
        searchname: '',
        money : 'price1',
        time : 'create_time desc',
    }

    getOne = async () => {
        const result = await reqFindOne()
        const One = result
        this.setState({
            One,
            success: true
        })
    }

    getOneList = () => {
        const One = this.state.One
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

    SearchName = (searchname) => {
        this.setState({
            searchname,
        }, () => {
            if (searchname) {
                document.getElementById('input').value = ''
            }
        })
    }

    CleanOrderBy = () => {
        this.setState({
            money : '',
        })
    }


    componentDidMount() {
        this.getOne()
        this.scroll()
    }

    scroll = () => {
        const y = Scroll1.GetScroll()
        const x = window.scrollX
        setTimeout(() => {
            window.scrollTo(x,y)
        },500)
        Scroll1.RemoveScroll(y)
    }

    handleScroll = () =>{
        const scroll = document.scrollingElement.scrollTop
        memoryUtils.scroll = scroll
        Scroll1.SaveScroll(scroll)
    }


    componentWillUnmount(){
        this.handleScroll()
    }

    render() {

        const {currentKey,searchname,money,time} = this.state
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

                    <Col xs={24} md={20} xxl={19} style={{paddingLeft: 10, display: 'flex', flexDirection: 'column'}}>
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
                               style={{width: 400, height: 40, marginTop: 12, marginLeft: '20%'}}
                               addonBefore={<Icon type='search'/>}
                               onPressEnter={() => this.SearchName(document.getElementById('input').value)}
                           />

                        <Button
                            type='primary'
                            style={{
                                width: 63,
                                marginTop: 13,
                                height: 30,
                                textAlign: 'center',
                                borderRadius: 0,
                                borderBottomRightRadius: '5px',
                                borderTopRightRadius: '5px'
                            }}
                            onClick={() => this.SearchName(document.getElementById('input').value)}
                        >
                            搜索
                        </Button>
                        <span style={{float:'right',marginTop:15,marginRight:20}}>
                            <Button onClick={() => this.setState({
                                money : money === 'price1' ? 'price1 desc' : 'price1',
                                time : ''
                            })}>
                                {
                                    money === 'price1' ?   <Icon type="up" /> :  <Icon type="down" />
                                }
                                价格
                            </Button>
                            <Button onClick={() => this.setState({
                                time : time === 'create_time desc' ? 'create_time' : 'create_time desc',
                                money : ''
                            })}>
                                 {
                                     time === 'create_time desc' ?   <Icon type="down" /> :  <Icon type="up" />
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
                        currentKey={currentKey}
                        searchname={searchname}
                        money={money}
                        time={time}
                        CleanOrderBy={this.CleanOrderBy}
                    />
                </span>
            </div>
        )
    }
}

export default withRouter(Home)