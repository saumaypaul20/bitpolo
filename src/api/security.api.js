import * as REST from "./constants";
import { fetchApi } from "./config.api";


export const getDeviceHistory = (toPassHeaders) => {
    return new Promise ( async (resolve)=>{    
        let headers = toPassHeaders

        let res = await fetchApi(REST.SECURITY.DEVICE_HISTORY, "GET", null, 200, headers);
        console.log("createAssetAddress res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}