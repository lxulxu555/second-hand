import {get, post, put, DELETE} from './ajax'
//const url = 'http://localhost:4000/api'
//登录接口
export const reqLogin = (user) => post('/user/login', user)
//注册接口
export const reqRegister = (user) => post('/user/save', user)
//更新用户接口
export const reqUpdateUser = (user) => put('/user/update', user)
//获取所有分类接口
export const reqFindClassAll = () => get('/classify1/findAll')
//获取所有商品
export const reqAllProduct = (id, page, rows, userid, orderBy, goodsName) => get('/goods/findByPage', {
    id,
    page,
    rows,
    userid,
    orderBy,
    goodsName
})
//添加商品
export const reqAddProduct = (product) => post('/goods/add', product)
//获取所有一级分类
export const reqGetOneList = () => get('/classify1/findClassify1')
//根据一级分类ID获取二级分类
export const reqGetTwoList = (id) => get('/classify1/findChildById', {id})
//根据商品ID查找商品信息
export const reqFindIdProduct = (id, userid) => get('/goods/findById', {id, userid})//更新商品
//更新商品
export const reqUpdateProduct = (product) => put('/goods/update', product,)
//分页展示所有求购信息
export const reqBuyProduct = (token, page, rows, userid) => get('/token/buy/findByPage', {token, page, rows, userid})
//添加求购信息
//post请求设置Params请求头
export const reqAddBuyProduct = (buyProduct) => post('/token/buy/add', buyProduct)
//根据商品id删除商品
export const reqDeleteProduct = (id) => get('/goods/deleteGoods', {id})
//更新求购信息
export const reqUpdateBuyProduct = (buyProduct) => put('/token/buy/update', buyProduct)
//根据求购ID删除求购信息
export const reqDeleteBuyProduct = (token, id) => DELETE('/token/buy/delete', {token, id})
//根据商品名称查询商品
export const reqLookUpProduct = (goodsName) => get('/goods/findByLike', {goodsName})
//删除商品图片
export const reqDeleteProductImage = (name) => post('/goods/deleteFile', {name})
//添加留言
export const reqSaveComment = (content, userid, goodsid) => post('/token/comment/save', {content, userid, goodsid})
//回复一条留言
export const reqReplayComment = (reply) => post('/token/reply/save', reply)
//查看所有与自己相关的回复
export const reqFindReplayByMe = (token, nameId) => get('/token/reply/findAllByUser', {token, nameId})
//查看用户未读信息数
export const reqLookUserReplay = (id) => get('/user/getMessage', {id})
//根据名字搜索求购页面商品
export const reqLookUpWantBuy = (token, title) => get('/token/buy/findByLike', {token, title})
//当前用户点赞留言回复
export const reqLikeComment = (type, state) => post('/token/like/save', {type, state})
//发送邮箱验证码
export const reqSendVerification = (email, flag) => get('/user/getEmailCode', {email, flag})
//修改密码
export const reqChangePassword = (user) => post('/user/changePassword', user)
//根据username查询email
export const reqFindEmailByName = (username) => get('/user/findEmailByName', {username})
//使用邮箱快速登录
export const reqEmailLogin = (emailUser) => get('/user/registerAndLogin', emailUser)
//验证token是否过期
export const reqInit = (token) => post('/user/init', {token})