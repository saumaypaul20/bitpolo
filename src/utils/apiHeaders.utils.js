import store from '../redux/store'
import publicIP from 'react-native-public-ip';

export const getDeviceId = () =>{
    const reduxState = store.getState()
    return reduxState.deviceReducer.deviceId
}

export const getAuthToken = () =>{
    const reduxState = store.getState()
    return reduxState.authReducer.auth_attributes.attributes.token
}
export const getInfoAuthToken = () =>{
    const reduxState = store.getState()
    return reduxState.authReducer.auth_attributes.attributes.info
}


export const getPublicIP = async() =>{
    let res = await publicIP()
    if(res){
        return res
    }else{
        return false
    }
}