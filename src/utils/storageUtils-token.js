import store from 'store'

const TOKEN_KEY = 'token_key'
export default {

    //保存user
    SaveToken(token){
        store.set(TOKEN_KEY,token)
    },
    //读取user
    GetToken(){
        return store.get(TOKEN_KEY || {})
    },
    //删除user
    RemoveToken(){
        store.remove(TOKEN_KEY)
    }
}