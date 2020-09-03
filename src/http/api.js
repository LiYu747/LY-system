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
    }
}