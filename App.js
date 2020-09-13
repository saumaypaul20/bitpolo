import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef} from 'react';
import {StatusBar, Text, TextInput, View, AppState} from 'react-native';
import {Root} from 'native-base';
import SplashScreen from 'react-native-splash-screen';

import Routes from './src/routes/Routes';
import Storage from './src/utils/storage.utils';
import DeviceInfo from 'react-native-device-info';
import {useDispatch} from 'react-redux';
import {addDeviceId} from './src/redux/actions/device.actions';
import {
  saveIpAction,
  inputAction,
  saveAuthAttributesAction,
} from './src/redux/actions/auth.actions';
import {getPublicIP} from './src/utils/apiHeaders.utils';
import {TYPES} from './src/redux/types';
import {Colors} from './src/theme';
import {startSocket} from './src/api/config.ws';
import {getIndexPrice} from './src/api/markets.api';
import {storeIndexPrice} from './src/redux/actions/markets.action';
import {SafeAreaView} from 'react-native-safe-area-context';
const App = () => {
  Text.defaultProps = {};
  Text.defaultProps.maxFontSizeMultiplier = 1;

  TextInput.defaultProps = {};
  TextInput.defaultProps.maxFontSizeMultiplier = 1;
  const dispatch = useDispatch();
  const [login, setLogin] = useState(null);

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = nextAppState => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      // startSocket();
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log('AppState', appState.current);
  };

  //get User LOGIN State
  const getUser = async () => {
    let user = await Storage.get('login');
    if (user) {
      console.log(user);
      dispatch(inputAction(TYPES.EMAIL_INPUT, user.email));
      dispatch(saveAuthAttributesAction(user));
      getmyindexprice();
    } else {
      setLogin(false);
    }
  };

  const getmyindexprice = async () => {
    let resIndexPrice = await getIndexPrice();
    if (resIndexPrice.status) {
      dispatch(storeIndexPrice(resIndexPrice.data));
      setLogin(true);
    } else {
      getmyindexprice();
    }
  };
  // getDeviceId for headers
  const deviceAccess = async () => {
    // let deviceId = DeviceInfo.getUniqueId();
    let device_name = await DeviceInfo.getModel();
    console.log('device name', device_name);
    let os = await DeviceInfo.getSystemName();
    let deviceVer = await DeviceInfo.getSystemVersion();
    let device = {
      os: os,
      os_byte: deviceVer,
      browser: device_name,
    };

    console.log(device);
    dispatch(addDeviceId(device));
  };

  const storeIP = async () => {
    let ip = await getPublicIP();
    if (ip) {
      dispatch(saveIpAction(ip));
    }
  };
  // console.log('app reloads');
  useEffect(() => {
    // requestLocationPermission()
    SplashScreen.hide();
    //uncomment the below to hide all console.log
    console.log = function() {};
    getUser();
    storeIP();
    deviceAccess();
    startSocket();
  }, []);

  return login !== null ? (
    <Root>
      <StatusBar
        translucent
        barStyle={Colors.barStyle}
        backgroundColor={Colors.primeBG}
      />
      <Routes login={login} />
    </Root>
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}} />
  );
};

export default App;
