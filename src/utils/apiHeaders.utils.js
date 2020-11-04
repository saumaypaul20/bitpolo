import store from '../redux/store';
import publicIP from 'react-native-public-ip';

export const getDeviceId = () => {
  const reduxState = store.getState();
  const res = reduxState.deviceReducer.deviceId;
  console.log('device id', res);
  return res;
};

export const getAuthToken = () => {
  const reduxState = store.getState();
  return reduxState?.authReducer?.auth_attributes?.attributes?.token || null;
};
export const getInfoAuthToken = () => {
  const reduxState = store.getState();
  return reduxState?.authReducer?.auth_attributes?.attributes?.info || null;
};

export const getPublicIP = async () => {
  let res = await publicIP();
  if (res) {
    return res;
  } else {
    return false;
  }
};
