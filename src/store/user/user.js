import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
router.options.routes
export default {
    namespaced: true, //开启命名空间
    state: {
        menus: [],
        total:'',//总条数
        arrusers:[]  //用户列表
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        },
        stetotal(state,data){
            state.total = data
        },
        setarrus(state,data){
            state.arrusers = data
        }
    },
    actions: {
        //   菜单数据
        async getMenus({ commit }) {
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                res.data.unshift({ authName: '首页', path: 'homes' })
                // 一级菜单
                res.data.map(item => {
                    item.path = '/' + item.path
                    router.options.routes.map(item1 => {
                        if (item1.children) {
                            item1.children.map(item2 => {
                                if(item.path === item2.path){
                                    item.icon = item2.meta.icon
                                }
                            })
                        }
                    })
                })
                //二级菜单
                res.data.map(item =>{
                if(item.children){
                   item.children.map(itema=>{
                       itema.path = item.path +'/'+ itema.path
                       router.options.routes.map(item1=>{
                           if(item1.children){
                               item1.children.map(item2=>{
                                   if(item2.path === itema.path){
                                       itema.icon = item2.meta.icon
                                   }
                               })
                           }
                       })
                   })
                }
                })
                commit('setMenus', res.data)
                console.log(res);
                console.log(router.options.routes);
            }
        },
        // 用户登录
        async login({ commit }, { username, password }) {
            let res = await api.login({
                username,
                password
            })
            console.log(commit);
            if (res.meta.status === 200) {
                localStorage.setItem('usertoken', res.data.token)
                localStorage.setItem('user', JSON.stringify(res.data))
                router.push('/')
                console.log(res)
                Message.success(res.meta.msg)
            }
            else {
                Message.error(res.meta.msg)
            }
        },
        //用户数据列表
        async users({commit},{query,pagenum,pagesize}) {
            let res = await api.users({
                query,
                pagenum,
                pagesize
            })
            console.log(commit);
            if (res.meta.status === 200) {
                res.data.users.map((item,index)=>{
                     item.ind = index+1
                })
                console.log(res.data.users)
                commit('stetotal', res.data.total)
                commit('setarrus', res.data.users)
            }
        }
    },
} 