import axios from 'axios'
import {message} from 'antd'
//axios返回promise对象，异步请求
export default function ajax(url, data = {}, type='GET' ) {
    return new Promise((resolve,reject)=>{
        let promise
        if(type === 'Get') {
            promise=axios.get(url,{
                params: {//请求参数
                    data
                }
            })
        } else {
            promise=axios.post(url, data)
        }
        promise.then(response=>{resolve(response.data)}).catch(error=>{message.error('请求出错啦'+error.message)})
    })
    
}