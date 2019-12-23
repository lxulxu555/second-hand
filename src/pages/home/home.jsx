import React, {Component} from 'react'
import {Carousel,Menu,Row,Col} from 'antd'
import {withRouter} from 'react-router-dom'


import './home.less'
import {reqFindOne} from '../../api/index'
import Product from './product'

const { SubMenu } = Menu;

class Home extends Component {

    state = {
        One : [],
        success : false,
        currentKey : ''
    }

    getOne = async ()=> {
        const result = await reqFindOne()
        const One = result
        this.setState({
            One,
            success : true
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

                        <Menu.ItemGroup title="二级分类" >
                                {item.classify2List.map(Citem => {
                                   return  <Menu.Item key={Citem.id}>{Citem.name}</Menu.Item>
                                })}
                        </Menu.ItemGroup>
                    </SubMenu>
                )
            })
    }

    handleClick = ({item,key}) => {
        this.setState({
            currentKey : item.key,
        })
    }



    componentDidMount() {
        this.getOne()
    }

    render() {
        const currentKey = this.state.currentKey
        return (
            <div>
            <span className="ParentFather">
                <Row>
                    <Col xs={24} md={4} xxl={5}>
            <div style={{marginBottom:10}} >
                <Menu
                    onClick={(item,key) => this.handleClick({item,key})}
                    mode="vertical"
                    theme={"dark"}
                    className='menu'
                >
                    {this.getOneList()}
              </Menu>
            </div>
                    </Col>

                    <Col xs={24} md={20} xxl={19} style={{paddingLeft:10}}>
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
                    </Col>
                </Row>
            </span>
                <span>
                    <Product currentKey={currentKey}/>
                </span>
            </div>
        )
    }
}

export default withRouter(Home)