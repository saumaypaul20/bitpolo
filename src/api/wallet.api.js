import * as REST from "./constants";
import { fetchApi } from "./config.api";
import { getDeviceId } from "../utils/apiHeaders.utils";


export const getAsset = (toPassHeaders) => {
    return new Promise ( async (resolve, reject)=>{    
             
        let headers = toPassHeaders

       
        let res = await fetchApi(REST.WALLET.GET_ASSET, "GET", null, 200, headers);
        console.log("encrepyted res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody.data.attributes.data})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}