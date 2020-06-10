import store from '../redux/store'

export const getDeviceId = () =>{
    const reduxState = store.getState()
    return reduxState.deviceReducer.deviceId
}