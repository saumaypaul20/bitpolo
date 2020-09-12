import * as REST from './constants';
import {fetchApi} from './config.api';
import {encryptValue} from './users.api';

export const getDeviceHistory = toPassHeaders => {
  return new Promise(async resolve => {
    let headers = toPassHeaders;

    let res = await fetchApi(
      REST.SECURITY.DEVICE_HISTORY,
      'GET',
      null,
      200,
      headers,
    );
    console.log('createAssetAddress res', res);
    if (!res?.responseBody?.errors) {
      resolve({status: true, data: res.responseBody});
    } else {
      resolve({status: false, data: res.responseBody});
    }
  });
};

export const g2fCreate = toPassHeaders => {
  return new Promise(async resolve => {
    let headers = toPassHeaders;

    let res = await fetchApi(
      REST.SECURITY.G2F_CREATE,
      'GET',
      null,
      200,
      headers,
    );
    console.log('g2fCreate res', res);
    if (!res?.responseBody?.errors) {
      resolve({status: true, data: res.responseBody.data.attributes});
    } else {
      resolve({status: false, data: res.responseBody});
    }
  });
};

export const g2fSettings = (payload, toPassHeaders) => {
  return new Promise(async resolve => {
    if (!payload) {
      console.log('no payload');
      return;
    }

    let headers = toPassHeaders;

    let toEncrypt = payload.data.attributes.password;

    let encrypt_res = await encryptValue(toEncrypt);
    if (!encrypt_res.status) {
      resolve({status: false, data: encrypt_res});
    }
    if (payload.data.attributes.google_secrete_key) {
      let toEncrypt2 = payload.data.attributes.google_secrete_key;

      let encrypt_res2 = await encryptValue(toEncrypt2);
      if (!encrypt_res2.status) {
        resolve({status: false, data: encrypt_res2});
      }
      payload.data.attributes.google_secrete_key = encrypt_res2.data;
    }
    payload.data.attributes.password = encrypt_res.data;
    console.log(payload);
    console.log(toPassHeaders);

    let res = await fetchApi(
      REST.SECURITY.G2F_SETTINGS,
      'PATCH',
      payload,
      200,
      headers,
    );
    console.log('g2fsettings res', res);
    if (!res?.success) {
      resolve({status: true, data: res.responseBody});
    } else {
      resolve({status: false, data: res.responseBody});
    }
  });
};

// export const g2fCreate = (toPassHeaders) => {
//     return new Promise ( async (resolve)=>{
//         let headers = toPassHeaders

//         let res = await fetchApi(REST.SECURITY.G2F_CREATE, "GET", null, 200, headers);
//         console.log("g2fCreate res", res)
//         if(!res?.responseBody?.errors){
//             resolve({status: true , data:res.responseBody.data.attributes})
//         }else{
//             resolve({status: false, data:res.responseBody})
//         }
//     })
// }

export const changeUserPassword = (payload, toPassHeaders) => {
  return new Promise(async resolve => {
    if (!payload) {
      console.log('no payload');
      return;
    }

    let headers = toPassHeaders;

    let toEncrypt = payload.data.attributes.password;

    let encrypt_res = await encryptValue(toEncrypt);
    if (!encrypt_res.status) {
      resolve({status: false, data: encrypt_res});
    }
    let toEncrypt2 = payload.data.attributes.old_password;

    let encrypt_res2 = await encryptValue(toEncrypt2);
    if (!encrypt_res2.status) {
      resolve({status: false, data: encrypt_res2});
    }
    payload.data.attributes.password = encrypt_res.data;
    payload.data.attributes.password_confirmation = encrypt_res.data;
    payload.data.attributes.old_password = encrypt_res2.data;

    console.log(payload);
    console.log(toPassHeaders);

    let res = await fetchApi(
      REST.SECURITY.CHANGE_PASSWORD,
      'PATCH',
      payload,
      200,
      headers,
    );
    console.log('g2fsettings res', res);
    if (!res?.responseBody?.errors) {
      resolve({status: true, data: res.responseBody});
    } else {
      resolve({status: false, data: res.responseBody});
    }
  });
};
