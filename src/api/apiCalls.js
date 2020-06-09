import { LOGIN, GETUSERORDERS, CREATORDER, GETSCHEMES, FINDSCHEME, REGISTER } from "./constants";
import { fetchApi } from "./api";

export const registerUser = async (payload, passedHeaders)=>{
    return new Promise ( async (resolve, reject)=>{    
        if(!payload) reject({msg: "No payload"})

        let headers ={}
        if(passedHeaders){
            headers=passedHeaders
        }
        let res = await fetchApi(REGISTER, "POST", payload, 200, headers);

        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}

// export const createOrderCall = async (payload)=>{
//     return new Promise ( async (resolve, reject)=>{    
//         if(!payload) reject({msg: "No payload"})

//         let res = await fetchApi(CREATORDER, "POST", payload, 200);
//         console.log(res)
//         if(res?.responseBody?.status){
//             resolve({status: true , data:res.responseBody.data})
//         }else{
//             resolve({status: false})
//         }
//     })
// }

// export const getUserOrders = async (payload)=>{
//     return new Promise ( async (resolve, reject)=>{
        
//         if(!payload) reject({msg: "No payload"})
        
//         let res = await fetchApi(GETUSERORDERS, "POST", payload, 200);
//         console.log(res)
//         if(res?.responseBody?.status){
//             resolve({status: true , data:res.responseBody.data})
//         }else{
//             resolve({status: false})
//         }
//     })
// }
// export const findScheme = async (payload)=>{
//     return new Promise ( async (resolve, reject)=>{
        
//         if(!payload) reject({msg: "No payload"})
        
//         let res = await fetchApi(FINDSCHEME, "POST", payload, 200);
//         console.log(res)
//         if(res?.responseBody?.status){
//             resolve({status: true , data:res.responseBody.data})
//         }else{
//             resolve({status: false})
//         }
//     })
// }

// export const getSchemes = async ()=>{
//     return new Promise ( async (resolve, reject)=>{
        
//         let res = await fetchApi(GETSCHEMES, "GET");
//         console.log(res)
//         if(res?.responseBody?.status){
//             resolve({status: true , data:res.responseBody.data})
//         }else{
//             resolve({status: false})
//         }
//     })
// }
