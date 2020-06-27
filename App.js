import React, { useEffect, useState } from 'react';
import Signin from './src/pages/Signin/Signin';
import Routes from './src/routes/Routes';
import Storage from './src/utils/storage.utils';
import DeviceInfo  from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { addDeviceId } from './src/redux/actions/device.actions';
import publicIP from 'react-native-public-ip';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
import { saveIpAction, inputAction, saveAuthAttributesAction } from './src/redux/actions/auth.actions';
import { getPublicIP } from './src/utils/apiHeaders.utils';
import { TYPES } from './src/redux/types';
const App= () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState(null)

  //get User LOGIN State
  const getUser = async ()=>{
    let user = await Storage.get("login")
    if(user){
      console.log(user)
      dispatch(inputAction(TYPES.EMAIL_INPUT, user.email))
      dispatch(saveAuthAttributesAction(user))
      setLogin(true)
    } 
      setLogin(false)
  }

  // getDeviceId for headers
  const deviceAccess =async()=>{
    // let deviceId = DeviceInfo.getUniqueId();
    let device_name = await DeviceInfo.getModel();
    let os = await DeviceInfo.getSystemName()
    let deviceVer = await DeviceInfo.getSystemVersion()
    let device = {
      os: os,
      os_byte: deviceVer,
      browser: device_name
    }
    dispatch(addDeviceId(device))
  }

  const storeIP = async() =>{
      let ip = await getPublicIP()
      if(ip){
        dispatch(saveIpAction(ip))
      }
  }

  useEffect(() => {
    // requestLocationPermission()
     getUser()
     storeIP()
     deviceAccess()
  }, [])

  return (
    login !== null ? <Routes login={login}/> : null
  );

};

export default App;
