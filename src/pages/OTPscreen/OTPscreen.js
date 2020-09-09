import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import {validateOtp, resendOtp} from '../../api/users.api';
import {getPublicIP} from '../../utils/apiHeaders.utils';
import {saveAuthAttributesAction} from '../../redux/actions/auth.actions';
import {screenNames} from '../../routes/screenNames/screenNames';
import Storage from '../../utils/storage.utils';

const OTPscreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let email = useSelector(state => state.authReducer.email);
  let user_id = useSelector(state => state.authReducer.user_id);
  let ip = useSelector(state => state.authReducer.ip);

  const [code, setCode] = useState(''); //setting code initial STATE value
  const [disabled, setdisabled] = useState(true); //setting code initial STATE value

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

    let payload = {
      id: user_id || props.data.data.id,
      attributes: {
        is_browser: false,
        is_mobile: true,
        ip: ip,
        country: 'India',
        otp: `BEL-${code}`,
      },
    };
    // alert(JSON.stringify(payload));
    let res = await validateOtp(payload);
    console.log(res);
    // alert(JSON.stringify(res));

    if (res.status) {
      loginFlow(res, email);
      setdisabled(false);
    } else {
      // alert("PIN code doesn't match");
      alert(res.data.data.attributes.message);
      setCode('');
      setdisabled(false);
      return;
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

  const resendCode = async () => {
    setCode('');
    let attributes = {
      user_id: user_id,
      type: 'login',
    };
    let res = await resendOtp(attributes);
    if (res.status) {
      alert(res.data.data.attributes.message);
    } else {
      alert('Something went worng, Try again!');
    }
  };

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
