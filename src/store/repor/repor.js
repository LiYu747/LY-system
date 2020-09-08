import api from '../../http/api'
import router from '../../router'
// import dayjs from 'dayjs'
// import { Message } from 'element-ui'
router.options.routes

export default ({
    namespaced: true, //开启命名空间
    state: {
        datas:[] , //折线图
        xAxis:[] ,
        series:[] 
    },
    mutations: {
        datas(state,data){
            state.datas = data
        },
        xAxis(state,data){
            state.xAxis = data
        },
        series(state,data){
          state.series = data
        }
    },
    actions: {
        async getreports({commit}){
            let res = await api.getreports()
            if(res.meta.status === 200){
                commit('datas', res.data)
                console.log(commit);
                console.log(res)
            }
        },
          
    },
})