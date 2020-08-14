import * as REST from "./constants";
import { fetchApi } from "./config.api";
import { encryptValue } from "./users.api";
import { getAuthToken, getInfoAuthToken, getDeviceId } from "../utils/apiHeaders.utils";

export const orderPut = (payload, api) => {
    return new Promise(async (resolve) => {
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
