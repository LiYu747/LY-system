import service from './index'
export default {
    // 登录
    login({username,password}){
        return service.post('/login',{
          username: username,
          password:password
        })
    },
    // 用户菜单
    getMenus(){
      return service.get('/menus')
    },
    //用户数据列表
    users({query,pagenum,pagesize}){
      return service.get(`/users?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加用户
    getuser({username,password,email,mobile}){
      return service.post('/users',{
        username,password,email,mobile
      })
    },
    // 编辑用户提交
    setuser({id,email,mobile}){
      return service.put(`users/${id}`,{
        email,mobile
      })
    },
    //修改用户状态
    settype({uId,type}){
      return service.put(`users/${uId}/state/${type}`)
    },
    //删除单个用户
    deluser({id}){
      return service.delete(`users/${id}`)
    },
    //角色列表
    getroles(){
      return service.get(`roles`)
    },
    // 分配用户角色
    setroleid({id,rid}){
      return service.put(`users/${id}/role`,{
        rid
      })
    },
    // 所有权限列表
    setrights({type}){
      return service.get(`rights/${type}`)
    },
    //商品列表
    getgoods({query,pagenum,pagesize}){
      return service.get(`goods?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //商品分类数据列表
    getcategories({type,pagenum,pagesize}){
      return service.get(`categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //添加分类
    getcgs({cat_pid,cat_name,cat_level}){
      return service.post(`categories`,{
        cat_pid,cat_name,cat_level
      })
    },
    // 删除分类
    cacadel({id}){
      return service.delete(`categories/${id}`)
    },
    //编辑提交分类
   getcate({id,cat_name}){
      return service.put(`categories/${id}`,{
        cat_name
      })
    },
    //删除商品
    delgoods({id}){
      return service.delete(`goods/${id}`)
    },
    //订单数据列表
    getorders({pagenum,pagesize}){
      return service.get(`orders?pagenum=${pagenum}&pagesize=${pagesize}`)
    },
    //查看物流信息
    getkuaidi({id}){
      return service.get(`/kuaidi/${id}`)
    },
    //基于时间统计的折线图
    getreports(){
      return service.get('reports/type/1')
    },
}