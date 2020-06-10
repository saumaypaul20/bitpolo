import { LOGIN, GETUSERORDERS, CREATORDER, GETSCHEMES, FINDSCHEME, REGISTER, ENCRYPT } from "./constants";
import { fetchApi } from "./api";
import { getDeviceId } from "../utils/apiHeaders.utils";

const DEVICE_ID= getDeviceId();
const LANG = "en"

export const encryptValue = (value) => {
    return new Promise ( async (resolve, reject)=>{    
        if(!value) reject({msg: "No value"})
       
        let headers ={device: DEVICE_ID}

        let payload = {
            lang: LANG,
            data:{
                attributes:{
                    value: value,
                }
            }
        }
        console.log(payload)
       
        let res = await fetchApi(ENCRYPT, "POST", payload, 200, headers);
        console.log("encrepyted res", res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody.data.attributes.data})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}

export const registerUser = async (payload)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(payload)   
        if(!payload) reject({msg: "No payload"})
         
        let headers = {device: DEVICE_ID}

        let toEncrypt = payload.password

        let encrypt_res = await encryptValue(toEncrypt);
        if(!encrypt_res.status){
            resolve({status: false, data: encrypt_res})
        }

        payload.password = encrypt_res.data,
        payload.password_confirmation = encrypt_res.data

        console.log(payload)

        let payloadToSend = {
            lang: LANG,
            data:{
                attributes: payload
            }
        }
        
        let res = await fetchApi(REGISTER, "POST", payloadToSend, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
 
