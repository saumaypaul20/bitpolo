import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {screenNames} from '../../../../routes/screenNames/screenNames';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container, Content} from 'native-base';
import Toolbar from '../../../../components/Toolbar/Toolbar';
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem';
import BPSwitch from '../../../../common/BPSwitch/BPSwitch';
import {Colors} from '../../../../theme';
import ChevronRight from '../../../../common/ChevronRight/ChevronRight';
import {useNavigation, StackActions} from '@react-navigation/native';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import BPText from '../../../../common/BPText/BPText';
import Spacer from '../../../../common/Spacer/Spacer';
import BPButton from '../../../../common/BPButton/BPButton';
import {g2fSettings} from '../../../../api/security.api';
import {saveAuthAttributesAction} from '../../../../redux/actions/auth.actions';
import {
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../../../utils/apiHeaders.utils';
const Security = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(
    state => state.authReducer.auth_attributes,
    shallowEqual,
  );
  //   alert(JSON.stringify(user));
  const [isEnabled, toggleSwitch] = useState(false);
  const [showmodal, setmodal] = useState(false);
  const [g2fenabled, setg2fenabled] = useState(user.attributes.google_auth);
  const [password, setpassword] = useState('');
  const [code, setcode] = useState('');
  const [load, setload] = useState(false);
  //   const [g2fenabled, setg2fenabled] = useState(true);

  const onG2Ftoggle = () => {
    if (!g2fenabled) {
      navigation.navigate(screenNames.GOOGLE_AUTHENTICATOR);
    } else {
      setmodal(true);
      //setg2fenabled(true);
    }
  };

  const onChangePasswordPress = () => {
    switch (g2fenabled) {
      case true:
        navigation.navigate(screenNames.CHANGE_PASSWORD_SETTINGS, {
          google_auth: g2fenabled,
        });
        break;
      default:
        navigation.navigate(screenNames.FORGOT_PASSWORD, {
          type: 'change password',
          screen: screenNames.SECURITY,
        });
    }
  };

  const addG2F = async () => {
    setload(true);
    let toPassHeader = {
      Authorization: getAuthToken(),
      info: getInfoAuthToken(),
      device: getDeviceId(),
    };

    let payload = {
      data: {
        id: user.id,
        attributes: {
          password: password,
          g2f_code: code,

          google_auth: false,
        },
      },
    };

    console.log(toPassHeader);
    console.log('**********************');
    console.log(payload);
    console.log('**********************');
    let res = await g2fSettings(payload, toPassHeader);
    if (res.status) {
      setload(false);
      let newUser = user;
      newUser.attributes.google_auth = false;
      setmodal(false);
      setg2fenabled(!g2fenabled);
      dispatch(saveAuthAttributesAction(newUser));
      await Storage.set('login', newUser);
    } else {
      alert(JSON.stringify(res.data.data.message));
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        <Toolbar enableBackButton title={screenNames.SECURITY} />
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, alignSelf: 'stretch'}}>
            <SettingsListItem
              label="Change Password"
              paddingHorizontal={20}
              borderBottom
              rightElement={<ChevronRight />}
              onPress={() => onChangePasswordPress()}
            />

            <SettingsListItem
              label="Device Management"
              paddingHorizontal={20}
              borderBottom
              rightElement={<ChevronRight />}
              onPress={() => navigation.navigate(screenNames.DEVICE_MANAGEMENT)}
            />

            <SettingsListItem
              label="Touch ID"
              paddingHorizontal={20}
              borderBottom
              rightElement={
                <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch} />
              }
            />

            <SettingsListItem
              label="Security Key"
              paddingHorizontal={20}
              borderBottom
              rightElement={
                <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch} />
              }
            />

            <SettingsListItem
              label="Google Authenticator"
              paddingHorizontal={20}
              borderBottom
              rightElement={
                <BPSwitch isEnabled={g2fenabled} onToggleSwitch={onG2Ftoggle} />
              }
              // onPress={()=> navigation.navigate(screenNames.GOOGLE_AUTHENTICATOR)}
            />

            <SettingsListItem
              label="SMS Authenticator"
              paddingHorizontal={20}
              borderBottom
              rightElement={<ChevronRight />}
            />

            <SettingsListItem
              label="Anti-Spoofing Code"
              paddingHorizontal={20}
              borderBottom
              rightElement={
                <BPSwitch
                  isEnabled={isEnabled}
                  onToggleSwitch={setg2fenabled}
                />
              }
              onPress={() => navigation.navigate(screenNames.SET_ANTI_SPOOF)}
            />
          </View>

          <Modal
            isVisible={showmodal}
            onBackdropPress={() => setmodal(false)}
            onBackButtonPress={() => setmodal(false)}
            style={{
              flex: 1,
              margin: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                padding: 16,
                margin: 16,
                backgroundColor: Colors.white,
                alignSelf: 'stretch',
                alignItems: 'center',
              }}>
              <View style={{marginBottom: 5}}>
                <BPText style={{color: Colors.primeBG, fontSize: 18}}>
                  Verify Google Authentication
                </BPText>
              </View>

              <View style={{marginVertical: 5, alignSelf: 'stretch'}}>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor={Colors.gray}
                  value={password}
                  onChangeText={t => setpassword(t)}
                  style={{
                    color: Colors.gray,
                    borderWidth: 1,
                    borderColor: Colors.gray,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  }}
                  secureTextEntry
                />
                <Spacer />
                <TextInput
                  maxLength={6}
                  underlineColorAndroid="transparent"
                  placeholder="Google Authentication Code"
                  placeholderTextColor={Colors.gray}
                  value={code}
                  onChangeText={t => setcode(t)}
                  style={{
                    color: Colors.gray,
                    borderWidth: 1,
                    borderColor: Colors.gray,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                  }}
                />

                <Spacer />
                <BPButton
                  backgroundColor={Colors.primeBG}
                  textColor={Colors.white}
                  label="Submit"
                  onPress={() => addG2F()}
                  disabled={password.length === 0 || code.length !== 6}
                  loading={load}
                />
              </View>
            </View>
          </Modal>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default Security;
