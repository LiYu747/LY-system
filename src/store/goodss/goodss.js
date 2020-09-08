import api from '../../http/api'
import router from '../../router'
import dayjs from 'dayjs'
import { Message } from 'element-ui'
router.options.routes

export default ({
    namespaced: true, //开启命名空间
    state: {
        goodsdata:[] , //商品列表
        categoriesdata:[],
        tatol:null
    },
    mutations: {
        setgoods(state,data){
            state.goodsdata = data
        },
        setcategories(state,data){
            state.categoriesdata = data
        } ,
        settotal(state,data){
            state.tatol = data
        }
    },
    actions: {
        async getgoods({commit},{query,pagenum,pagesize}){
            let res = await api.getgoods({query,pagenum,pagesize})
            if(res.meta.status === 200){
                 res.data.goods.map((item,index)=>{
                     item.idx = index+1
                     item.add_time = dayjs(item.add_time).format('YYYY-MM-DD HH:MM:ss')
                 })
                commit('setgoods', res.data.goods)
                console.log(commit);
                console.log(res)
            }
        },

        async getcategories({commit},{type,pagenum,pagesize}){
            let res = await api.getcategories({type,pagenum,pagesize})
            res.data.result.map((item,index)=>{
                item.idx = index+1
            })
            localStorage.setItem('categories',JSON.stringify(res.data.result))
            commit('setcategories',res.data.result)
            commit('settotal',res.data.total)
            console.log(commit);
            console.log(res);
        },
             
        //添加分类
        async getcgs({commit},{cat_pid,cat_name,cat_level}){
            let res = await api.getcgs({cat_pid,cat_name,cat_level})
            console.log(commit);
            console.log(res);
            if(res.meta.status===201){
                Message.success(res.meta.msg)
            }
        },

        //删除分类
        async cacadel({dispatch},{id, type,pagenum,pagesize}){
            let res = await api.cacadel({id})
            if(res.meta.status === 200){
                dispatch('getcategories',{
                    type,pagenum,pagesize
                })
                console.log(res);
                Message.success(res.meta.msg)
            }
        },

        //编辑提交
        async getcate({dispatch},{id,cat_name,type,pagenum,pagesize}){
            let res = await api.getcate({id,cat_name})
            if(res.meta.status === 200){
                console.log(res);
                dispatch('getcategories',{
                    type,pagenum,pagesize
                })
                Message.success('更改成功')
            }
        },

        //删除商品
        async delgoods({dispatch},{id,query,pagenum,pagesize}){
            let res = await api.delgoods({id})
            if(res.meta.status === 200){
                console.log(res);
                dispatch('getgoods',{
                    query,pagenum,pagesize
                })
            }
        }
    },
})