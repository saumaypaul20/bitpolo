import * as REST from "./constants";
import { fetchApi } from "./config.api";
import { encryptValue } from "./users.api";
import { getAuthToken, getInfoAuthToken, getDeviceId } from "../utils/apiHeaders.utils";



export const orderPut = (payload, api) => {
    return new Promise(async (resolve) => {
        if(!payload){reject({status:false, data:'no payload'})}
        let headers = {
            authorization: getAuthToken(),
            info: getInfoAuthToken(),
        }
        let res = await fetchApi(REST.ORDERS.ORDER_PUT + api, "POST", payload, 200, headers);
        //console.log("match market list res", res)
        if (!res?.responseBody?.errors) {
            resolve({ status: true, data: res.responseBody })
        } else {
            resolve({ status: false, data: res.responseBody })
        }
    })
}

export const getPendingOrders = (payload) => {
    return new Promise(async (resolve,reject) => {
        if(!payload){reject({status:false, data:'no payload'})}
        let headers = {
            authorization: getAuthToken(),
            info: getInfoAuthToken(),
        }
        let res = await fetchApi(REST.ORDERS.GET_PENDING_ORDERS, "POST", payload, 200, headers);
        console.log("getPendingOrders res", res)
        if (!res?.responseBody?.errors) {
            resolve({ status: true, data: res.responseBody })
        } else {
            resolve({ status: false, data: res.responseBody })
        }
    })
}
export const cancelOrder = (payload) => {
    return new Promise(async (resolve,reject) => {
        if(!payload){reject({status:false, data:'no payload'})}
        let headers = {
            authorization: getAuthToken(),
            info: getInfoAuthToken(),
        }
        let res = await fetchApi(REST.ORDERS.CANCEL_ORDER, "POST", payload, 200, headers);
        console.log("cancelOrder res", res)
        if (!res?.responseBody?.errors) {
            resolve({ status: true, data: res.responseBody })
        } else {
            resolve({ status: false, data: res.responseBody })
        }
    })
}
export const cancelAllOrders = (payload) => {
    return new Promise(async (resolve,reject) => {
        if(!payload){reject({status:false, data:'no payload'})}
        let headers = {
            authorization: getAuthToken(),
            info: getInfoAuthToken(),
        }
        let res = await fetchApi(REST.ORDERS.CANCEL_ALL, "POST", payload, 200, headers);
        console.log("cancelAllOrders res", res)
        if (!res?.responseBody?.errors) {
            resolve({ status: true, data: res.responseBody })
        } else {
            resolve({ status: false, data: res.responseBody })
        }
    })
}
