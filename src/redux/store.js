//1、createStore是用来创建store的
//2、applyMiddleware 是用来处理中间件的
//3、compose是用来组合createStore当中的多个函数
import {createStore,applyMiddleware,compose} from 'redux'
//处理redux的异步任务的中间件
import thunk from 'redux-thunk'
//导入的reducer （就是执行规则）
import reducer from './reducer'

const store = createStore(reducer,compose(
//处理redux的异步任务的中间件thunk使用applyMiddleware来管理thuk
    applyMiddleware(thunk),
//判断是否有插件 ，有就执行一下，，没有就是一个空函数
    window.devToolsExtension?window.devToolsExtension() : f => f
))

export default store

