import { LOGIN, GETUSERORDERS, CREATORDER, GETSCHEMES, FINDSCHEME } from "./constants";
import { fetchApi } from "./api";

export const loginCall = async (payload)=>{
    return new Promise ( async (resolve, reject)=>{    
        if(!payload) reject({msg: "No payload"})

        let res = await fetchApi(LOGIN, "POST", payload, 200);

        if(res?.responseBody?.status){
            resolve({status: true , data:res.responseBody.data[0]})
        }else{
            resolve({status: false})
        }
    })
}

export const createOrderCall = async (payload)=>{
    return new Promise ( async (resolve, reject)=>{    
        if(!payload) reject({msg: "No payload"})

        let res = await fetchApi(CREATORDER, "POST", payload, 200);
        console.log(res)
        if(res?.responseBody?.status){
            resolve({status: true , data:res.responseBody.data})
        }else{
            resolve({status: false})
        }
    })
}

export const getUserOrders = async (payload)=>{
    return new Promise ( async (resolve, reject)=>{
        
        if(!payload) reject({msg: "No payload"})
        
        let res = await fetchApi(GETUSERORDERS, "POST", payload, 200);
        console.log(res)
        if(res?.responseBody?.status){
            resolve({status: true , data:res.responseBody.data})
        }else{
            resolve({status: false})
        }
    })
}
export const findScheme = async (payload)=>{
    return new Promise ( async (resolve, reject)=>{
        
        if(!payload) reject({msg: "No payload"})
        
        let res = await fetchApi(FINDSCHEME, "POST", payload, 200);
        console.log(res)
        if(res?.responseBody?.status){
            resolve({status: true , data:res.responseBody.data})
        }else{
            resolve({status: false})
        }
    })
}

export const getSchemes = async ()=>{
    return new Promise ( async (resolve, reject)=>{
        
        let res = await fetchApi(GETSCHEMES, "GET");
        console.log(res)
        if(res?.responseBody?.status){
            resolve({status: true , data:res.responseBody.data})
        }else{
            resolve({status: false})
        }
    })
}
