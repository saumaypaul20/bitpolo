import * as REST from "./constants";
import { fetchApi } from "./config.api";
import { encryptValue } from "./users.api";
import { getAuthToken, getInfoAuthToken, getDeviceId } from "../utils/apiHeaders.utils";


export const addBankAccount = (body) => {
    return new Promise ( async (resolve)=>{    
        console.log("addbanks body %%%%%%%",body);
        
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }
        let res = await fetchApi(REST.PAYMENT.ADD_BANK_ACCOUNT, "POST", body, 200, headers);
        console.log("addbank acc res *************", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody.data.attributes.result})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const getBankAccounts = () => {
    return new Promise ( async (resolve)=>{    
         
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }
        let res = await fetchApi(REST.PAYMENT.ADD_BANK_ACCOUNT + '/all', "GET", null, 200, headers);
        console.log("getbank acc res *************", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody.data.attributes.result})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const deleteBankAccount = (id) => {
    return new Promise ( async (resolve)=>{    
         
        let headers = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }
        let res = await fetchApi(REST.PAYMENT.ADD_BANK_ACCOUNT + '/' + id, "DELETE", null, 200, headers);
        console.log("delete bank acc res *************", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}