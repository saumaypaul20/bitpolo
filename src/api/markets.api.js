import * as REST from './constants';
import {fetchApi} from './config.api';
import {encryptValue} from './users.api';
import {getAuthToken, getInfoAuthToken} from '../utils/apiHeaders.utils';

export const getIndexPrice = () => {
  return new Promise(async resolve => {
    let res = await fetchApi(REST.MARKETS.INDEX_PRICE, 'GET', null, 200, null);
    console.log('index price res', res);
    if (!res?.responseBody?.errors) {
      resolve({status: true, data: res.responseBody.data.attributes.result});
    } else {
      reject(new Error('went wrong'));
    }
  });
};
export const getMatchingMarketList = () => {
  return new Promise(async resolve => {
    let headers = {
      authorization: getAuthToken(),
      info: getInfoAuthToken(),
    };

    let res = await fetchApi(REST.MARKETS.MARKET_LIST, 'GET', null, 200);
    console.log('match market list res', res);
    if (!res?.responseBody?.errors) {
      resolve({status: true, data: res.responseBody.data.attributes});
    } else {
      resolve({status: false, data: res.responseBody});
    }
  });
};
