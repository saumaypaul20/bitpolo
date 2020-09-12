import React, {useState, useEffect, useRef} from 'react';
import {View, Keyboard, StyleSheet} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Container, Content} from 'native-base';
import BPTitle from '../../common/BPTitle/BPTitle';
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle';
import Toolbar from '../../components/Toolbar/Toolbar';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../theme';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../routes/screenNames/screenNames';
import Storage from '../../utils/storage.utils';

const PINScreen = props => {
  const navigation = useNavigation();
  // let email = useSelector(state => state.authReducer.email);
  // let user_id = useSelector(state => state.authReducer.user_id);
  // let ip = useSelector(state=> state.authReducer.ip)
  const [nextScreen] = useState(
    props?.route?.params?.screen || screenNames.DASHBOARD,
  );
  const [code, setCode] = useState(''); //setting code initial STATE value
  const [localPin, setLocalPin] = useState('111111'); //setting code initial STATE value
  const [, setdisabled] = useState(true); //setting code initial STATE value
  const [isNew, setNew] = useState(props?.route?.params?.type);
  const pinCount = 6;

  const handleCodeFilled = code => {
    setCode(code);
    if (code.length == pinCount) {
      setdisabled(false);
      Keyboard.dismiss();
      verifyOtp(code);
    }
  };

  const verifyOtp = async code => {
    setdisabled(true);
    if (code.length !== pinCount) {
      alert('Fill in the the 6 digit code');
      return;
    }

    switch (isNew) {
      case true:
        await Storage.set('mpin', code);
        navigation.reset({index: 0, routes: [{name: screenNames.DASHBOARD}]});
        break;
      default:
        if (localPin === code) {
          switch (nextScreen) {
            case screenNames.DASHBOARD:
              navigation.reset({index: 0, routes: [{name: nextScreen}]});
              break;
            case screenNames.FORGOT_PASSWORD:
              navigation.pop(1);
              navigation.navigate(nextScreen, {
                type: 'reset-password',
                screen: screenNames.SIGNIN,
              });
              break;
            default:
              navigation.pop(1);
              navigation.navigate(nextScreen);
          }
        } else {
          alert("PIN does't match. Re-enter PIN.");
          setCode('');
        }
    }
  };

  const getSavedPin = async () => {
    let mpin = await Storage.get('mpin');
    if (mpin) {
      setNew(false);
      setLocalPin(mpin);
      handleCodeFilled('111111');
    } else {
      setNew(true);
    }
  };

  useEffect(() => {
    getSavedPin();
    // Keyboard.addListener("keyboardDidHide", )
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
        <Toolbar enableBackButton />
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginHorizontal: 48,
              marginTop: 83,
            }}>
            <BPTitle title={isNew ? 'Set MPIN' : 'Enter MPIN'} />
            <BPSubtitle text={`Please enter the ${pinCount} digit code`} />

            <OTPInputView
              keyboardType="phone-pad"
              //ref={inputref}
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

            {/* <BPButton disabled={disabled} label="Confirm" onPress={()=> verifyOtp()} style={{alignSelf:'stretch'}}/> */}
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

export default PINScreen;
