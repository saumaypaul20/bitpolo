import React, { useEffect, useState } from 'react';
import Signin from './src/pages/Signin/Signin';
import Routes from './src/Routes/Routes';
import Storage from './src/utils/storage.utils';
import DeviceInfo  from 'react-native-device-info';

const App= () => {
  const [login, setLogin] = useState(null)

  const getUser = async ()=>{
    let user = await Storage.get("login")
    if(user){
      setLogin(true)
  }else{
    setLogin(false)
  }
  }

  const deviceAccess =async()=>{
    let deviceId = DeviceInfo.getDeviceId();
    console.log(deviceId)
  }
  useEffect(() => {
     getUser()
     deviceAccess()
  }, [])

  return (
    login !== null ? <Routes login={login}/> : null
  );

};

export default App;
