import service from './index'
export default {
    // 登录
    login({nickname,password,verify}){
        return service.post('/login',{
          nickname: nickname,
          password:password,
          verify:verify,
        })
    },
    // 注册
    register({nickname,password,verify}){
      return service.post('/register',{
        nickname,
        password,
        verify,
      })
    },
    // 验证码
    Verification(){
      return service.get('/verify')
    },
    // 搜索
    search(){
        return service.get('/search')
    },
    // 首页
    homeAll(){
      return service.get('/recommend')
    },
    //  获取用户信息
    UserInformation(){
      return service.post('/queryUser')
    },
    // 修改用户信息
    Preservation(gender,year,month,day,id,nickname){
      return service.post('/saveUser',{
          gender,
          year,
          month,
          day,
          id,
          nickname
      })
    },
    // 详情页
    Details(id){
      return service.get(`/goods/one?id=${id}`)
    },
    // 分类查询
    ClassificationQuery(id){
      return service.get(`/classification?mallSubId=${id}`)
    },
    // 加入购物车
    AddToCart(id){
      return service.post('/addShop',{id})
    },
    // 查询获取购物车数据
    GetCard(){
      return service.post('/getCard')
    },
  //  删除
  DeleteShop(idAss){
    return service.post('/deleteShop',idAss)
   },
  //  购物车加减商品
  EditCart({count,id,mallPrice}){
    return service.post('/editCart',{
      count:count,
      id:id,
      mallPrice:mallPrice
    })
  },
  // 查询默认收货地址
  GetDefaultAddress(){
    return service.get('/getDefaultAddress')
   },
  //  设置默认收货地址/
  SetDefaultAddress(id){
 return service.post('/setDefaultAddress',{id})
  },
  //  新增地址
  Address({name,tel,address,isDefault,province,city,county,addressDetail,areaCode,id}){
    return service.post('/address',{
      name:name,tel:tel,address:address,isDefault:isDefault,province:province,city:city,county:county,
      addressDetail:addressDetail,areaCode:areaCode,id:id})
   },
  //  查询用户收货地址
  GetAddress(){
    return service.get('/getAddress')
  },
  // 删除地址
  DeleteAddress({id}){
   return service.post('/deleteAddress',{id:id})
  },
  // 购物车支付
  playder({address,tel,orderId,totalPrice,idDirect,count}){
    return service.post('/order',{address:address,tel:tel,orderId:orderId,totalPrice:totalPrice,
      idDirect:idDirect,count:count})
   },
    // 收藏
    Eollection(goods){
    return service.post('/collection',goods)
   },
  //  取消收藏
  CancelCollection({id}){
    return service.post('/cancelCollection',{id:id})
   },
  //  是否获取
  YYSCollection(id){
    return service.post('/isCollection',{id})
  },
  // 收藏列表
  Collection(){
    return service.get('/collection/list')
  },
  // 退出登录
  LoginOut(){
    return service.post('/loginOut')
  },
  // 全部订单
  getMyOrder(){
    return service.get('/myOrder')
  },
  // 未评价
  TobeEvaluated(){
    return service.get('/tobeEvaluated')
  },
  // 已评价
  AlreadyEvaluated(){
    return service.get('/alreadyEvaluated')
  },
  // 提交评价
  Comment({id,rate,content,anonymous,_id,order_id,image}){
    return service.post('/goodsOne/comment',{
      id:id,
      rate:rate,
      content: content,
      anonymous: anonymous,
      _id: _id,
      order_id: order_id,
      image: image,
    })
  },
  // 查询单条评论
  EvaluateOne({id,_id}){
    return service.post('/evaluateOne',{id:id,_id:_id})
  },
  // 搜索
  Search({value:value}){
    return service.post('/search',{value:value})
  }
  


 
}