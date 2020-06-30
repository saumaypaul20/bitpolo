import * as REST from "./constants";
import { fetchApi } from "./config.api";
import { getDeviceId } from "../utils/apiHeaders.utils";


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