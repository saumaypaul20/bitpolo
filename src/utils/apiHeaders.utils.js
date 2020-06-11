import store from '../redux/store'
import publicIP from 'react-native-public-ip';

export const getDeviceId = () =>{
    const reduxState = store.getState()
    return reduxState.deviceReducer.deviceId
}

export const getPublicIP = async() =>{
    let res = await publicIP()
    if(res){
        return res
    }else{
        return false
    }
}