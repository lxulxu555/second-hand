import {ajax} from './ajax'
import axios from 'axios'
import memoryUtils from "../utils/memoryUtils";
const BASE = '/api'
//登录接口
export const reqLogin = (user) => ajax(BASE+'/user/login',user,'POST')
//注册接口
export const reqRegister = (user) => ajax(BASE+'/user/save',user,'POST')
//更新用户接口
export const reqUpdateUser = (user) => ajax(BASE + '/user/update',user,'PUT')
//获取所有分类接口
export const reqFindOne = () => ajax(BASE + '/classify1/findAll')
//获取所有商品
export const reqAllProduct = (id,page,rows,userid,orderBy) => ajax(BASE + '/goods/findByPage',{id,page,rows,userid,orderBy})
//添加商品
export const reqAddProduct = (product) => ajax(BASE + '/goods/add',product,'POST')
//获取所有一级分类
export const reqGetOneList = () => ajax(BASE + '/classify1/findClassify1')
//根据一级分类ID获取二级分类
export const reqGetTwoList = (id) => ajax(BASE + '/classify1/findChildById',{id})
//根据商品ID查找商品信息
export const reqFindIdProduct = (id) => ajax(BASE + '/goods/findById',{id})
//更新商品
export const reqUpdateProduct = (product) => ajax(BASE + '/goods/update',product,'PUT')
//分页展示所有求购信息
export const reqBuyProduct = (token,page,rows,userid) => ajax( BASE + '/token/buy/findByPage',{token,page,rows,userid})
//添加求购信息
//post请求设置Params请求头
export const reqAddBuyProduct = (buyProduct) =>
    axios.post(BASE + '/token/buy/add', buyProduct, { params: {
            token : memoryUtils.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));
//根据商品id删除商品
export const reqDeleteProduct =(id) => ajax(BASE + '/goods/deleteGoods',{id})
//更新求购信息
export const reqUpdateBuyProduct = (buyProduct) =>
    axios.put( BASE + '/token/buy/update', buyProduct, { params: {
            token : memoryUtils.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));
//根据求购ID删除求购信息
export const reqDeleteBuyProduct = (token,id) => ajax(BASE + '/token/buy/delete',{token,id},'DELETE')
//根据商品名称查询商品
export const reqLookUpProduct = (goodsName,page,rows) => ajax(BASE + '/goods/findByLike',{goodsName})
//删除商品图片
export const reqDeleteProductImage = (name) => ajax(BASE + '/goods/deleteFile',{name},'POST')
//添加留言
export const reqSaveComment = (content,userid,goodsid) =>
    axios.post( BASE + '/token/comment/save', {content,userid,goodsid}, { params: {
            token : memoryUtils.token
        }})
        .then(response => response.data)
        .catch(err => console.warn(err));

