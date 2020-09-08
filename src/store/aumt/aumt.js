import api from '../../http/api'
import router from '../../router'
// import { Message } from 'element-ui'
router.options.routes

export default ({
    namespaced: true, //开启命名空间
    state: {
        arrsetroles:[] , //角色列表
        rightsdata:[]
    },
    mutations: {
        setroles(state,data){
            state.arrsetroles = data
        },
        datarights(state,data){
            state.rightsdata = data
        }
    },
    actions: {
        async getroles({commit}){
            let res = await api.getroles()
            if(res.meta.status === 200){
                 res.data.map((item,inex)=>{
                     item.idx = inex+1
                 })
                commit('setroles', res.data)
                console.log(commit);
                console.log(res)
            }
        },

        async setrights({commit},{type}){
            let res = await api.setrights({
                type
            })
            if(res.meta.status === 200){
                res.data.map((item,inex)=>{
                    item.idx = inex+1
                })
                commit('datarights',res.data)
                console.log(commit);
                console.log(res);
            }
        }
    },
})