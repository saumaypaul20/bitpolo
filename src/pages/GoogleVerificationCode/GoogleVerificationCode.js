import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, Keyboard} from 'react-native';
import {primaryColors} from '../../theme/colors';
import {Container, Content} from 'native-base';
import BPButton from '../../common/BPButton/BPButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '../../components/Toolbar/Toolbar';
import BPText from '../../common/BPText/BPText';
import {Fonts, Colors} from '../../theme';
import {screenNames} from '../../routes/screenNames/screenNames';
import {useNavigation, StackActions} from '@react-navigation/native';
import {g2fVerify, getGeolocation} from '../../api/users.api';
import {
  getPublicIP,
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../utils/apiHeaders.utils';
import DeviceInfo from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {saveAuthAttributesAction} from '../../redux/actions/auth.actions';
import Storage from '../../utils/storage.utils';
import {changeUserPassword} from '../../api/security.api';
import {addBankAccount} from '../../api/payments.api';
import {addBanks} from '../../redux/actions/payments.action';
import {withdraw, createWithdrawAddress} from '../../api/wallet.api';

const GoogleVerificationCode = props => {
  const navigation = useNavigation();
  let email = useSelector(state => state.authReducer.email);
  let banks = useSelector(state => state.payments.banks);
  const inputref = useRef(null);
  const [code, setCode] = useState(''); //setting code initial STATE value
  const [geo, setgeo] = useState(null); //setting code initial STATE value
  const [disabled, setdisabled] = useState(true); //setting code initial STATE value
  const dispatch = useDispatch();

  const onSubmit = async () => {
    setdisabled(true);
    if (props.route.params.type === 'login') {
      loginVerfivationFlow();
    } else if (props.route.params.type === 'bank-details') {
      // let res = await addBankAccount(props.route.params.body)
      // if(res.status){
      //     console.log(res)
      //     navigation.dispatch(StackActions.pop(2))
      // }
      addBankFlow();
    } else if (props.route.params.type === 'withdraw confirmation') {
      withdrawConfirmation();
    } else if (props.route.params.type === 'withdraw address') {
      withdrawAddress();
    } else {
      changeUserPasswordFlow();
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
        g2f_code: code,
        country: geo.country,
        city: geo.city,
        region: geo.region,
      },
    };
    let res = await g2fVerify(payload);
    if (res.status) {
      props.route.params.payload.data.attributes.g2f_code = code;
      console.log('payload00000', props.route.params.payload);
      let res = await withdraw(props.route.params.payload);
      if (res.status) {
        console.log('withdraw res----#####2', res);
        //dispatch(addBanks([...banks,props.route.params.body.data.attributes]));
        navigation.dispatch(StackActions.pop(2));
        alert(res.data.data.attributes.message);
      } else {
        alert(res.data.data.attributes.message);
        navigation.dispatch(StackActions.pop(2));
      }
    } else {
      alert('Something went wrong. Please Re-enter the code');
      setCode('');
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
        g2f_code: code,
        country: geo.country,
        city: geo.city,
        region: geo.region,
      },
    };
    let res = await g2fVerify(payload);
    if (res.status) {
      props.route.params.payload.data.attributes.g2f_code = code;
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
      alert('Something went wrong. Please Re-enter the code');
      setCode('');
    }
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
          g2f_code: code,
          country: geo.country,
          city: geo.city,
          region: geo.region,
        },
      };
      try {
        let res = await g2fVerify(payload);
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
          alert('Something went wrong. Please Re-enter the code');
          setCode('');
        }
      } catch (error) {
        console.log(error);
        alert('Something went wrong!');
      }
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
        g2f_code: code,
        country: geo.country,
        city: geo.city,
        region: geo.region,
      },
    };
    let res = await g2fVerify(payload);
    if (res.status) {
      props.route.params.body.data.attributes.g2f_code = code;
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
      alert('Something went wrong. Please Re-enter the code');
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
          g2f_code: code,
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

  const getGeoInfo = async () => {
    try {
      let res = await getGeolocation();
      if (res) {
        console.log('geo res', res);
        setgeo(res.data);
      }
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getGeoInfo();
    // Keyboard
    setTimeout(() => {
      inputref.current.focus();
    }, 500);
  }, []);

  const onkeypress = code => {
    setCode(code);
    if (code.length == 6) {
      setdisabled(false);
      Keyboard.dismiss();
      //onSubmit()
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
        <Toolbar enableBackButton />

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginHorizontal: 48,
            marginTop: 83,
          }}>
          <BPText style={{fontSize: 24, fontFamily: Fonts.FONT_BOLD}}>
            Enter the Verification code
          </BPText>
          <BPText
            style={{
              fontSize: 16,
              textAlign: 'center',
              paddingVertical: 20,
              lineHeight: 23,
            }}>
            {`Get a verification code from the\n`}
            <BPText style={{fontFamily: Fonts.FONT_BOLD}}>
              Google Authenticator app
            </BPText>
          </BPText>

          <TextInput
            keyboardType="number-pad"
            ref={inputref}
            autoFocus={true}
            placeholder="Enter 6-digit code"
            placeholderTextColor={Colors.gray}
            style={styles.inputStyle}
            value={code}
            onChangeText={code => onkeypress(code)}
            maxLength={6}
          />

          <BPButton
            disabled={disabled}
            label="Confirm"
            style={{alignSelf: 'stretch'}}
            onPress={() => onSubmit()}
          />
        </View>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    marginTop: 40,
    marginBottom: 68,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.gray,
    padding: 20,
    color: '#fff',
  },
});

export default GoogleVerificationCode;
