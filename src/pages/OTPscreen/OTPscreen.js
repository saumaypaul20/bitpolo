import React, {useState, useEffect} from 'react';
import {View, Keyboard, StyleSheet} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Container, Content} from 'native-base';
import BPButton from '../../common/BPButton/BPButton';
import QueryActions from '../../components/QueryActions/QueryActions';
import BPTitle from '../../common/BPTitle/BPTitle';
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle';
import Toolbar from '../../components/Toolbar/Toolbar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../theme';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, StackActions} from '@react-navigation/native';
import {validateOtp, resendOtp, getGeolocation} from '../../api/users.api';
import {
  getPublicIP,
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../utils/apiHeaders.utils';
import {saveAuthAttributesAction} from '../../redux/actions/auth.actions';
import {screenNames} from '../../routes/screenNames/screenNames';
import Storage from '../../utils/storage.utils';
import DeviceInfo from 'react-native-device-info';
import {addBankAccount} from '../../api/payments.api';
import {changeUserPassword} from '../../api/security.api';
import {createWithdrawAddress, withdraw} from '../../api/wallet.api';

const OTPscreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let email = useSelector(state => state.authReducer.email);
  let user_id = useSelector(state => state.authReducer.user_id);
  let ip = useSelector(state => state.authReducer.ip);

  const [code, setCode] = useState(''); //setting code initial STATE value
  const [disabled, setdisabled] = useState(true); //setting code initial STATE value
  const [geo, setgeo] = useState(null); //setting code initial STATE value

  const pinCount = 6;

  const handleCodeFilled = code => {
    setCode(code);
    // alert(code);

    if (code.length == pinCount) {
      setdisabled(false);
      Keyboard.dismiss();
      //verifyOtp()
    }
  };

  const verifyOtp = async () => {
    setdisabled(true);
    if (code.length !== pinCount) {
      alert('Fill up the the 6 digit code');
      return;
    }

    switch (props.route.params.type) {
      case 'login':
        loginVerfivationFlow();
        break;
      case 'bank-details':
        addBankFlow();
        break;
      case 'withdraw address':
        withdrawAddress();
        break;
      case 'withdraw confirmation':
        withdrawConfirmation();
        break;
      default:
        // changeUserPasswordFlow();
        break;
    }
  };

  const loginFlow = async (res, email) => {
    let res_data = res.data.data;
    res_data.email = email;
    dispatch(saveAuthAttributesAction(res_data));
    await Storage.set('login', res_data);
    navigation.navigate(screenNames.PINSCREEN, {
      type: true,
      screen: screenNames.DASHBOARD,
    });
    return;
  };

  const loginVerfivationFlow = async () => {
    if (props.route.params.screen) {
      navigation.dispatch(StackActions.pop(2));
    } else {
      let payload = {
        id: props.route.params.data.id,
        attributes: {
          browser: await DeviceInfo.getModel(),
          ip: await getPublicIP(),
          is_browser: false,
          is_mobile: true,
          is_app: true,
          os: await DeviceInfo.getSystemName(),
          os_byte: await DeviceInfo.getSystemVersion(),

          country: geo.country || 'India',
          city: geo.city,
          region: geo.region,
          otp: `BEL-${code}`,
        },
      };
      try {
        let res = await validateOtp(payload);
        console.log(res);
        if (res.status) {
          let res_data = res.data.data;
          res_data.email = email;
          dispatch(saveAuthAttributesAction(res_data));
          await Storage.set('login', res_data);
          navigation.navigate(screenNames.PINSCREEN, {
            type: true,
            screen: screenNames.DASHBOARD,
          });
          // navigation.reset({index:0, routes: [{name:screenNames.DASHBOARD}]})
        } else {
          // alert('Something went wrong. Please Re-enter the code');
          alert(JSON.stringify(res.data.data.attributes.message));
          setCode('');
        }
      } catch (error) {
        console.log(error);
        setdisabled(false);
        alert('Something went wrong!');
      }
    }
  };

  const withdrawAddress = async () => {
    let payload = {
      id: props.route.params.id,
      attributes: {
        browser: await DeviceInfo.getModel(),
        ip: await getPublicIP(),
        is_browser: false,
        is_mobile: true,
        is_app: true,
        os: await DeviceInfo.getSystemName(),
        os_byte: await DeviceInfo.getSystemVersion(),
        otp: `BEL-${code}`,
        country: geo.country,
        city: geo.city,
        region: geo.region,
      },
    };
    let res = await validateOtp(payload);
    if (res.status) {
      props.route.params.payload.data.attributes.otp = `BEL-${code}`;
      console.log('payload00000', props.route.params.payload);
      let res = await createWithdrawAddress(props.route.params.payload);
      if (res.status) {
        console.log('create withdraw address res----#####2', res);
        //dispatch(addBanks([...banks,props.route.params.body.data.attributes]));
        navigation.dispatch(StackActions.pop(1));
        alert('Success!');
      } else {
        alert('Something went wrong!');
        navigation.dispatch(StackActions.pop(1));
      }
    } else {
      // alert('Something went wrong. Please Re-enter the code');
      alert(JSON.stringify(res.data.data.attributes.message));
      setCode('');
    }
  };

  const withdrawConfirmation = async () => {
    let payload = {
      id: props.route.params.id,
      attributes: {
        browser: await DeviceInfo.getModel(),
        ip: await getPublicIP(),
        is_browser: false,
        is_mobile: true,
        is_app: true,
        os: await DeviceInfo.getSystemName(),
        os_byte: await DeviceInfo.getSystemVersion(),
        otp: `BEL-${code}`,
        country: geo.country,
        city: geo.city,
        region: geo.region,
      },
    };
    let res = await validateOtp(payload);
    if (res.status) {
      props.route.params.payload.data.attributes.otp = `BEL-${code}`;
      console.log('payload00000', props.route.params.payload);
      let res = await withdraw(props.route.params.payload);
      if (res.status) {
        console.log('withdraw res----#####2', res);
        //dispatch(addBanks([...banks,props.route.params.body.data.attributes]));
        navigation.dispatch(StackActions.pop(2));
        alert(JSON.stringify(res.data.data.attributes.message));
      } else {
        alert(JSON.stringify(res.data.data.attributes.message));
        navigation.dispatch(StackActions.pop(2));
      }
    } else {
      // alert('Something went wrong. Please Re-enter the code');
      alert(JSON.stringify(res.data.data.attributes.message));
      setCode('');
    }
  };

  const addBankFlow = async () => {
    let payload = {
      id: props.route.params.body.data.id,
      attributes: {
        browser: await DeviceInfo.getModel(),
        ip: await getPublicIP(),
        is_browser: false,
        is_mobile: true,
        is_app: true,
        os: await DeviceInfo.getSystemName(),
        os_byte: await DeviceInfo.getSystemVersion(),
        otp: `BEL-${code}`,
        country: geo.country,
        city: geo.city,
        region: geo.region,
      },
    };
    let res = await validateOtp(payload);
    if (res.status) {
      props.route.params.body.data.attributes.otp = `BEL-${code}`;
      let res = await addBankAccount(props.route.params.body);
      if (res.status) {
        console.log('added banks to server***********************', res);
        dispatch(addBanks([...banks, props.route.params.body.data.attributes]));
        navigation.dispatch(StackActions.pop(2));
      } else {
        alert('Something went wwrong!');
        navigation.dispatch(StackActions.pop(2));
      }
    } else {
      // alert('Something went wrong. Please Re-enter the code');
      alert(JSON.stringify(res.data.data.attributes.message));
      setCode('');
    }
  };

  const changeUserPasswordFlow = async () => {
    let toPassHeader = {
      Authorization: getAuthToken(),
      info: getInfoAuthToken(),
      device: getDeviceId(),
    };

    let payload1 = {
      data: {
        id: props.route.params.id,
        attributes: {
          otp: `BEL-${code}`,
          old_password: props.route.params.passwords.old_password,
          password: props.route.params.passwords.password,
          password_confirmation: props.route.params.passwords.c_password,
        },
      },
    };
    let ress = await changeUserPassword(payload1, toPassHeader);
    console.log('cahnge pwd', ress);
    if (ress.status) {
      alert('Password has been changed');
      // navigation.navigate(screenNames.SIGNIN)
      navigation.dispatch(StackActions.pop(2));
    } else {
      alert('Something went wrong!');
      return;
    }
  };

  const resendCode = async () => {
    setCode('');
    let attributes = {
      user_id: user_id,
      type: props.route.params.type,
    };
    let res = await resendOtp(attributes);
    if (res.status) {
      alert(JSON.stringify(res.data.data.attributes.message));
    } else {
      alert('Something went worng, Try again!');
    }
  };

  const getGeoInfo = async () => {
    try {
      let res = await getGeolocation();
      if (res) {
        console.log('geo res', res);
        setgeo(res.data);
        setdisabled(false);
      }
    } catch (error) {
      getGeoInfo();
    }
  };

  useEffect(() => {
    setdisabled(true);
    getGeoInfo();
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
        <Toolbar enableBackButton backgroundColor="transparent" />
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginHorizontal: 48,
              marginTop: 83,
            }}>
            <BPTitle title="Verification Code" />
            <BPSubtitle
              text={`Please enter the ${pinCount} digit code sent to ${email}`}
            />

            <OTPInputView
              keyboardType="phone-pad"
              autoFocusOnLoad
              style={{
                height: 64,
                width: 300,
                marginTop: 30,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: Colors.gray,
                overflow: 'hidden',
              }}
              pinCount={pinCount}
              code={code}
              onCodeChanged={code => handleCodeFilled(code)}
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => setCode(code)}
            />

            <QueryActions
              query={"Didn't recieve code yet?"}
              actionName="Resend"
              action={() => resendCode()}
            />

            <BPButton
              disabled={disabled}
              label="Confirm"
              onPress={() => verifyOtp()}
              style={{alignSelf: 'stretch'}}
            />
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: 51,
    height: 64,
    borderWidth: 0,
    overflow: 'hidden',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    marginLeft: -1,
    // borderColor: Colors.gray,
    color: Colors.white,
    backgroundColor: Colors.darkGray,
    borderRadius: 0,
  },

  underlineStyleHighLighted: {
    // borderColor: '#fff',
    // backgroundColor: 'rgba(45, 154, 255,0.1)'
  },
  blueText: {
    // color: primaryColors.blue,
    fontSize: 12,
    fontFamily: 'Asap-Regular',
  },
});

export default OTPscreen;
