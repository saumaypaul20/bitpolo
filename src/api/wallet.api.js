import * as REST from "./constants";
import { fetchApi } from "./config.api";
import { getDeviceId, getAuthToken, getInfoAuthToken } from "../utils/apiHeaders.utils";


export const getAsset = (toPassHeaders) => {
    return new Promise ( async (resolve, reject)=>{    
             
        let headers = toPassHeaders

       
        let res = await fetchApi(REST.WALLET.GET_ASSET, "GET", null, 200, headers);
        console.log("getAsset res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody.data.attributes.data})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const getWalletBalance = (toPassHeaders) => {
    return new Promise ( async (resolve, reject)=>{    
             
        let headers = toPassHeaders

        let res = await fetchApi(REST.WALLET.GET_BALANCE, "GET", null, 200, headers);
        console.log("getWalletBalance res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody.data.attributes})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const createAssetAddress = (body, toPassHeaders) => {
    return new Promise ( async (resolve, reject)=>{    
        let headers = toPassHeaders

        let res = await fetchApi(REST.WALLET.CREATE_ASSET_ADDRESS, "POST", body, 200, headers);
        console.log("createAssetAddress res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody.data.attributes.address})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const createWithdrawAddress = (body) => {
    return new Promise ( async (resolve, reject)=>{    
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }

        let res = await fetchApi(REST.WALLET.CREATE_WITHDRAW_ADDRESS, "POST", body, 200, headers);
        console.log("createWithdrawAddress res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}

export const withdraw = (body) => {
    return new Promise ( async (resolve, reject)=>{    
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }

        let res = await fetchApi(REST.WALLET.WITHDRAW, "POST", body, 200, headers);
        console.log("withdraw res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}

export const deposit = (body) => {
    return new Promise ( async (resolve, reject)=>{    
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }

        let res = await fetchApi(REST.WALLET.DEPOSIT, "POST", body, 200, headers);
        console.log("deposit res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const getWithdrawAddresses = () => {
    return new Promise ( async (resolve, reject)=>{ 
        
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }
 
        let res = await fetchApi(`${REST.WALLET.GET_WITHDRAW_ADDRESSES}`, "GET", null, 200, headers);
        console.log("getWithdrawAddresses res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const updateWithdrawAddresses = (body) => {
    return new Promise ( async (resolve, reject)=>{    
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }

        let res = await fetchApi(REST.WALLET.CREATE_WITHDRAW_ADDRESS, "PATCH", body, 200, headers);
        console.log("updateWithdrawAddresses res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const deleteWithdrawAddresses = (id) => {
    return new Promise ( async (resolve, reject)=>{    
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }

        let res = await fetchApi(`${REST.WALLET.CREATE_WITHDRAW_ADDRESS}/${id}`, "DELETE", null, 200, headers);
        console.log("deleteWithdrawAddresses res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}