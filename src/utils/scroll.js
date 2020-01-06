import store from 'store'

const SCROLL_KEY = 'scroll_key'
export default {

    //保存scroll
    SaveScroll(scroll){
        store.set(SCROLL_KEY,scroll)
    },
    //读取scroll
    GetScroll(){
        return store.get(SCROLL_KEY)
    },
    //删除scroll
    RemoveScroll(){
        store.remove(SCROLL_KEY)
    }
}