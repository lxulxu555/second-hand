import {ajax} from './ajax'
import axios from 'axios'
import memoryUtils from "../utils/memoryUtils";
const BASE = '/api'
//const url = 'http://localhost:4000/api'
//登录接口
export const reqLogin = (user) => ajax(BASE+'/user/login',user,'POST')
//注册接口
export const reqRegister = (user) => ajax(BASE+'/user/save',user,'POST')
//更新用户接口
export const reqUpdateUser = (user) => ajax(BASE + '/user/update',user,'PUT')
//获取所有分类接口
export const reqFindClassAll = () => ajax(BASE + '/classify1/findAll')
//获取所有商品
export const reqAllProduct = (id,page,rows,userid,orderBy,goodsName) => ajax(BASE + '/goods/findByPage',{id,page,rows,userid,orderBy,goodsName})
//添加商品
export const reqAddProduct = (product) => ajax(BASE + '/goods/add',product,'POST')
//获取所有一级分类
export const reqGetOneList = () => ajax(BASE + '/classify1/findClassify1')
//根据一级分类ID获取二级分类
export const reqGetTwoList = (id) => ajax(BASE + '/classify1/findChildById',{id})
//根据商品ID查找商品信息
export const reqFindIdProduct = (id,userid) => ajax(BASE + '/goods/findById',{id,userid})
//更新商品
export const reqUpdateProduct = (product) => ajax(BASE + '/goods/update',product,'PUT')
//分页展示所有求购信息
export const reqBuyProduct = (token,page,rows,userid) => ajax( BASE + '/token/buy/findByPage',{token,page,rows,userid})
//添加求购信息
//post请求设置Params请求头
export const reqAddBuyProduct = (buyProduct) =>
    axios.post(BASE + '/token/buy/add', buyProduct, { params: {
            token : memoryUtils.user.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));
//根据商品id删除商品
export const reqDeleteProduct =(id) => ajax(BASE + '/goods/deleteGoods',{id})
//更新求购信息
export const reqUpdateBuyProduct = (buyProduct) =>
    axios.put( BASE + '/token/buy/update', buyProduct, { params: {
            token : memoryUtils.user.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));
//根据求购ID删除求购信息
export const reqDeleteBuyProduct = (token,id) => ajax(BASE + '/token/buy/delete',{token,id},'DELETE')
//根据商品名称查询商品
export const reqLookUpProduct = (goodsName) => ajax(BASE + '/goods/findByLike',{goodsName})
//删除商品图片
export const reqDeleteProductImage = (name) => ajax(BASE + '/goods/deleteFile',{name},'POST')
//添加留言
export const reqSaveComment = (content,userid,goodsid) =>
    axios.post( BASE + '/token/comment/save', {content,userid,goodsid}, { params: {
            token : memoryUtils.user.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));
//回复一条留言
export const reqReplayComment = (content,userid,commentid,goodsid,nameid,leaf,parentname) =>
    axios.post( BASE + '/token/reply/save', {content,userid,commentid,goodsid,nameid,leaf,parentname}, { params: {
            token : memoryUtils.user.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));
//查看所有与自己相关的回复
export const reqFindReplayByMe = (token,nameId) => ajax(BASE + '/token/reply/findAllByUser',{token,nameId})
//查看用户未读信息数
export const reqLookUserReplay = (id) => ajax(BASE + '/user/getMessage',{id})
//根据名字搜索求购页面商品
export const reqLookUpWantBuy = (token,title) => ajax(BASE + '/token/buy/findByLike',{token,title})
//当前用户点赞留言回复
export const reqLikeComment = (type,state) =>
    axios.post(BASE + '/token/like/save',{type,state},{params:{
            token : memoryUtils.user.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));
//发送邮箱验证码
export const reqSendVerification = (email,flag) => ajax(BASE + '/user/getEmailCode',{email,flag})
//修改密码
export const reqChangePassword = (user) => ajax(BASE + '/user/changePassword',user,'POST')
//根据username查询email
export const reqFindEmailByName = (username) => ajax(BASE + '/user/findEmailByName',{username})
//使用邮箱快速登录
export const reqEmailLogin = (emailUser) => ajax(BASE + '/user/registerAndLogin',emailUser)
//验证token是否过期
export const reqInit = (token) => ajax(BASE + '/user/init',{token},'POST')