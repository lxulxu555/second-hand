import store from 'store'

const PAGE_KEY = 'page_key'
export default {

    //保存page
    SavePage(page){
        store.set(PAGE_KEY,page)
    },
    //读取page
    GetPage(){
        return store.get(PAGE_KEY)
    },
    //删除page
    RemovePage(){
        store.remove(PAGE_KEY)
    }
}