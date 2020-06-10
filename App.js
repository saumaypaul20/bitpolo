import React, { useEffect, useState } from 'react';
import Signin from './src/pages/Signin/Signin';
import Routes from './src/Routes/Routes';
import Storage from './src/utils/storage.utils';
import DeviceInfo  from 'react-native-device-info';
import { useDispatch } from 'react-redux';
import { addDeviceId } from './src/redux/actions/device.actions';
import publicIP from 'react-native-public-ip';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';
const App= () => {
  const dispatch = useDispatch()
  const [login, setLogin] = useState(null)

  //get User LOGIN State
  const getUser = async ()=>{
    let user = await Storage.get("login")
    if(user){
      setLogin(true)
    } 
      setLogin(false)
    
  }

  // getDeviceId for headers
  const deviceAccess =async()=>{
    let deviceId = DeviceInfo.getUniqueId();
    dispatch(addDeviceId(deviceId))
    console.log(deviceId)

    publicIP()
  .then(ip => {
    console.log(ip);
    // '47.122.71.234'
  })
  .catch(error => {
    console.log(error);
    // 'Unable to get IP address.'
  });

  
  }

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        Geolocation.getCurrentPosition(info => console.log(info));
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    // requestLocationPermission()
     getUser()
     deviceAccess()
  }, [])

  return (
    login !== null ? <Routes login={login}/> : null
  );

};

export default App;
