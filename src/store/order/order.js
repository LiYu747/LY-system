import api from '../../http/api'
import router from '../../router'
import dayjs from 'dayjs'
// import { Message } from 'element-ui'
router.options.routes

export default ({
    namespaced: true, //开启命名空间
    state: {
        gooddata:[] , //商品列表
        kuaididata:[]
    },
    mutations: {
        setgoods(state,data){
            state.gooddata = data
        },
        setkuaidi(state,data){
            state.kuaididata = data
        }
       
    },
    actions: {
        async getorders({commit},{pagenum,pagesize}){
            let res = await api.getorders({pagenum,pagesize})
            if(res.meta.status === 200){
                 res.data.goods.map((item,index)=>{
                     item.idx = index+1
                     item.create_time = dayjs(item.create_time).format('YYYY-MM-DD HH:MM:ss')
                 })
                commit('setgoods', res.data.goods)
                console.log(commit);
                console.log(res)
            }
        },
          
        async getkuaidi({commit},{id}){
            let res =await api.getkuaidi({id})
            if(res.meta.status === 200){
                commit('setkuaidi',res.data)
            }
            console.log(commit);
            console.log(res);
        }
    },
})