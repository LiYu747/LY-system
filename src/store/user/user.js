import api from '../../http/api'
import router from '../../router'
import { Message } from 'element-ui'
router.options.routes
export default {
    namespaced: true, //开启命名空间
    state: {
        menus: [],
        total:'',//总条数
        arrusers:[],  //用户列表
        arrsetroles:[] //角色列表
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
        },
        setroles(state,data){
            state.arrsetroles = data
        }
    },
    actions: {
        //   菜单数据
        async getMenus({ commit }) {
            let res = await api.getMenus()
            if (res.meta.status === 200) {
                res.data.unshift({ authName: '首页', path: '' })
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
        },
        //添加用户
        async getuser({commit},{username,password,email,mobile}){
            let res = await api.getuser({
                username,password,email,mobile
            })
            console.log(commit);
            console.log(res);
            if(res.meta.status === 201){
                Message.success(res.meta.msg)
            }else{
                Message.error(res.meta.msg)
            }
        },
        //编辑用户
        async setuser({commit},{id,email,mobile}){
            let res = await api.setuser({
                id,email,mobile
            })
            console.log(commit);
            console.log(res);
            if(res.meta.status === 200){
                Message.success(res.meta.msg)
            }
        },
        //改变用户状态
        async settype({commit},{uId,type}){
            let res = await api.settype({
                uId,type
            })
            console.log(commit);
            console.log(res);
        },
        //删除用户
        async deluser({commit},{id}){
            let res = await api.deluser({
                id
            })
            console.log(commit);
            console.log(res);
        },
        //角色列表
        async getroles({commit}){
            let res = await api.getroles()
            if(res.meta.status === 200){
                commit('setroles', res.data)
                console.log(commit);
                console.log(res)
            }
        },
       //分配角色
       async setroleid({commit},{id,rid}){
           let res = await api.setroleid({
               id,rid
           })
           console.log(commit);
           console.log(res);
       }
    },
} 