import axios from 'axios'

const service = axios.create({
    baseURL:'/api',
    timeout:10000
})
service.interceptors.response.use(res=>{
    return res.data
})
export default service