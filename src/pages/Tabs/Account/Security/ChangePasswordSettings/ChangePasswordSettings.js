import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {screenNames} from '../../../../../routes/screenNames/screenNames';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Container, Content} from 'native-base';
import Toolbar from '../../../../../components/Toolbar/Toolbar';
import {Colors} from '../../../../../theme';
import LabelInput from '../../../../../components/LabelInput/LabelInput';
import {useDispatch, useSelector} from 'react-redux';
import {TYPES} from '../../../../../redux/types';
import {inputAction} from '../../../../../redux/actions/auth.actions';
import BPButton from '../../../../../common/BPButton/BPButton';
import {useNavigation} from '@react-navigation/native';
import {
  getAuthToken,
  getInfoAuthToken,
  getDeviceId,
} from '../../../../../utils/apiHeaders.utils';
import {
  generateOtp,
  resetPasswordHashValidation,
} from '../../../../../api/users.api';

const ChangePasswordSettings = props => {
  console.log(props);
  const user = useSelector(state => state.authReducer.auth_attributes);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setloading] = useState(false);

  const onSubmit = async () => {
    if (!newPwd || newPwd.trim().length == 0) {
      alert('Enter the new password');
      return;
    }
    if (!oldPwd || oldPwd.trim().length == 0) {
      alert('Enter the old password');
      return;
    }
    if (!confirm || confirm.trim().length == 0) {
      alert('Re-Enter the  new password');
      return;
    }
    if (confirm.trim() !== newPwd.trim()) {
      alert("New Password doesn't match!");
      return;
    }
    setloading(true);
    switch (props.route.params.google_auth) {
      case true:
        navigation.navigate(screenNames.GOOGLE_VERIFICATION_CODE, {
          id: user.id,
          passwords: {
            old_password: oldPwd,
            password: newPwd,
            c_password: confirm,
          },
          type: props.route.params.type,
        });
        setloading(false);
        break;
      default:
        let res = await resetPasswordHashValidation(
          props.route.params.data.attributes.hash,
        );

        if (res.status) {
          setloading(false);
          console.log('cahnge pwd', res);
          let body = {
            lang: 'en',
            data: {
              id: res.data.data.id,
              attributes: {type: props.route.params.type},
            },
          };
          let toPassHeader = {
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId(),
          };
          let ress = await generateOtp(body, toPassHeader);
          if (ress.status) {
            navigation.navigate(screenNames.VERIFY_EMAIL, {
              validated_data: res.data.data,
              passwords: {
                old_password: oldPwd,
                password: newPwd,
                c_password: confirm,
                type: props.route.params.type,
              },
            });
          } else {
            alert('Something went wrong! Please try again.');
          }
        } else {
          setloading(false);
          alert('Something went wrong! Please try again.');
        }
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
        <Toolbar
          enableBackButton
          title={screenNames.CHANGE_PASSWORD_SETTINGS}
        />
        <Content contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, marginHorizontal: 20, marginTop: 10}}>
            <LabelInput
              secureTextEntry
              label="Enter Old Password"
              onChangeText={text => setOldPwd(text)}
              value={oldPwd} /*iconPath={iconLabel1} */
            />

            <LabelInput
              secureTextEntry
              label="Enter New Password"
              onChangeText={text => setNewPwd(text)}
              value={newPwd} /*iconPath={iconLabel1} */
            />

            <LabelInput
              secureTextEntry
              label="Re-Enter New Password"
              onChangeText={text => setConfirm(text)}
              value={confirm} /*iconPath={iconLabel1} */
            />

            <View style={{marginTop: 30, marginHorizontal: 20}}>
              <BPButton
                disabled={loading}
                label="Submit"
                onPress={() => onSubmit()}
              />
            </View>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default ChangePasswordSettings;
