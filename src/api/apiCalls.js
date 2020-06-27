import * as REST from "./constants";
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
       
        let res = await fetchApi(REST.ENCRYPT, "POST", payload, 200, headers);
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

        console.log("new paykoad",payload)
        console.log(headers)
        
        let payloadToSend = {
            lang: LANG,
            data:{
                attributes: payload
            }
        }
        
        let res = await fetchApi(REST.REGISTER, "POST", payloadToSend, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}

export const loginUser = async (payload)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(payload)   
        if(!payload) reject({msg: "No payload"})
        let dev = getDeviceId()
        console.log(dev)
        if(!dev){return}
        let headers = {device: dev}

        let toEncrypt = payload.password

        let encrypt_res = await encryptValue(toEncrypt);
        if(!encrypt_res.status){
            resolve({status: false, data: encrypt_res})
        }

        payload.password = encrypt_res.data,

        // console.log(payload)
        console.log("new paykoad",payload)
        console.log(headers)

        let payloadToSend = {
            lang: LANG,
            data:{
                attributes: payload
            }
        }
        
        let res = await fetchApi(REST.LOGIN, "POST", payloadToSend, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
 
export const validateOtp = async (payload)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(payload)   
        if(!payload) reject({msg: "No payload"})
         
        let headers = {device: DEVICE_ID}

        console.log(payload)

        let body = {
            lang: LANG,
            data:{
                id: payload.id,
                attributes: payload.attributes
            }
        }
        
        let res = await fetchApi(REST.VALIDATE_OTP, "POST", body, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const resendOtp = async (attributes)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(attributes)   
        if(!attributes) reject({msg: "No attributes"})
         
        let headers = {device: DEVICE_ID}

        // console.log(payload)

        let payloadToSend = {
            data:{
                attributes: attributes
            }
        }
        
        let res = await fetchApi(REST.RESEND_OTP, "POST", payloadToSend, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
 
export const forgetPassword = async (attributes)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(attributes)   
        if(!attributes) reject({msg: "No attributes"})
         
        let headers = {
            device: DEVICE_ID,
        }

        let body={
                data : {
                    attributes : attributes
                }
            }
 
        let res = await fetchApi(REST.FORGET_PASSWORD, "POST", body, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}


export const resetPasswordHashValidation = async (hash)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(hash)   
        if(!hash) reject({msg: "No hash"})
         
        let headers = {
            device: DEVICE_ID,
        }
 
        let res = await fetchApi(`${REST.RESET_PASSWORD}/${hash}`, "GET", null, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}

export const generateOtp = async (payload,passedHeaders)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(payload)   
        console.log('pasedHeaders',passedHeaders)   
        if(!payload) reject({msg: "No payload"})
        
        let headers = {
            device: DEVICE_ID,
        }

        if(passedHeaders){
            headers =passedHeaders
        }

        let res = await fetchApi(REST.GENERATE_OTP, "POST", payload, 200, headers);
        console.log("geneateotp",res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
export const logoutUser = async (passedHeaders)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log('pasedHeaders',passedHeaders)   

        let headers = passedHeaders

        let res = await fetchApi(REST.LOGOUT, "POST", null, 200, headers);
        console.log("logoutuser",res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}

export const resetPassword = async (payload, toPassHeader)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(payload)   
        if(!payload) reject({msg: "No payload"})
         
        let headers = toPassHeader
        let password = await encryptValue(payload.data.attributes.password)
        let password_confirmation = await encryptValue(payload.data.attributes.password_confirmation)

        payload.data.attributes.password = password.data;
        payload.data.attributes.password_confirmation = password_confirmation.data

        console.log("resetpayloadfinal",payload)

        let res = await fetchApi(REST.RESET_PASSWORD, "PATCH", payload, 200, headers);
        console.log("resretpaswww",res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}








export const getMarketList = async (attributes)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log("getmarketlist attr",attributes)   
        if(!attributes) reject({msg: "No attributes"})
         
        let headers = {
            device: DEVICE_ID,
            info: attributes.info,
            Authorization: attributes.Authorization
        }
 
        let res = await fetchApi(REST.GET_MARKET_LIST, "GET", null, 200, headers);
        console.log("getMarketList api rs",res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
 


export const getMarketByPair = async (pair, toPassHeader)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log("getmarketlist attr",pair, toPassHeader)   
        if(!pair) reject({msg: "No pair"})
         
        let headers = toPassHeader
 
        let res = await fetchApi(`${REST.GET_MARKET_BY_PAIR}/${pair}`, "GET", null, 200, headers);
        console.log("getMarketList api rs",res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
 

export const getTradeVolume = async (headers)=>{
    return new Promise ( async (resolve, reject)=>{ 
        console.log(headers)   
        if(!headers) reject({msg: "No headers"})
         
        let headers = {
            device: DEVICE_ID,
            info: headers.info,
            Authorization: headers.Authorization
        }
 
        let res = await fetchApi(REST.TRADE_VOLUME, "GET", null, 200, headers);
        console.log(res)
        if(!res?.responseBody?.errors){
            resolve({status: true , data:res.responseBody})
        }else{
            resolve({status: false, data:res.responseBody})
        }
    })
}
 
