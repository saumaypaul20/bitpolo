import React, {useState} from 'react';
import {View, StatusBar, Image, TouchableOpacity} from 'react-native';
import {Container, Content, Icon} from 'native-base';
import BPTitle from '../../common/BPTitle/BPTitle';
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle';
import BPButton from '../../common/BPButton/BPButton';
import LabelInput from '../../components/LabelInput/LabelInput';
import {useNavigation} from '@react-navigation/native';
import BPText from '../../common/BPText/BPText';
import {Colors, Images} from '../../theme';
import {screenNames} from '../../routes/screenNames/screenNames';
import {resetPasswordHashValidation, generateOtp} from '../../api/users.api';
import {
  getDeviceId,
  getAuthToken,
  getInfoAuthToken,
} from '../../utils/apiHeaders.utils';

const ChangePassword = props => {
  console.log(props.route.params.data);
  const navigation = useNavigation();
  const [pwd, setPwd] = useState(null);
  const [cpwd, setCpwd] = useState(null);
  const [loading, setloading] = useState(false);

  const onSubmit = async () => {
    if (!pwd || pwd.trim().length == 0) {
      alert('Enter the password');
      return;
    }
    if (!cpwd || cpwd.trim().length == 0) {
      alert('Re-Enter the password');
      return;
    }
    if (cpwd.trim() !== pwd.trim()) {
      alert("Passwords doesn't match!");
      return;
    }
    setloading(true);
    let res = await resetPasswordHashValidation(
      props.route.params.data.attributes.hash,
    );

    if (res.status) {
      console.log('restpwd', res);
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
        setloading(false);
        navigation.navigate(screenNames.VERIFY_EMAIL, {
          validated_data: res.data.data,
          passwords: {
            password: pwd,
            c_password: cpwd,
            type: props.route.params.type,
          },
        });
      } else {
        setloading(false);
        alert('Something went wrong! Please try again.');
      }
    } else {
      setloading(false);
      alert('Something went wrong! Please try again.');
    }
  };
  return (
    <Container style={{flex: 1, backgroundColor: Colors.primeBG}}>
      <StatusBar
        translucent
        barStyle={Colors.barStyle}
        backgroundColor={Colors.primeBG}
      />
      <Content contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            flex: 3,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 110,
          }}>
          <View style={{padding: 28}}>
            <Image
              source={Images.change_your_password_icon}
              style={{width: 140, height: 140}}
              resizeMode="contain"
            />
          </View>

          <BPTitle title="Change Your Password" />

          <BPSubtitle text={`This will be your new password`} />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 43,
          }}>
          <LabelInput
            label="Password"
            onChangeText={t => setPwd(t)}
            value={pwd}
            secureTextEntry
          />
          <LabelInput
            label="Re-Enter Password"
            onChangeText={t => setCpwd(t)}
            value={cpwd}
            secureTextEntry
          />

          <View style={{paddingTop: 20, alignSelf: 'stretch'}}>
            <BPButton
              label="Change Password"
              onPress={() => onSubmit()}
              loading={loading}
            />
          </View>

          <View style={{paddingVertical: 50}}>
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon
                type="FontAwesome"
                name="chevron-left"
                style={{color: '#fff', paddingHorizontal: 10, fontSize: 10}}
              />
              <BPText>Go Back</BPText>
            </TouchableOpacity>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default ChangePassword;
