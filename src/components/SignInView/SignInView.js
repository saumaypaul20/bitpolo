import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import BPButton from '../../common/BPButton/BPButton';
import BPText from '../../common/BPText/BPText';
import {screenNames} from '../../routes/screenNames/screenNames';

export default function SignInView() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: 16,
        alignItems: 'center',
      }}>
      <BPText>Please Sign in to see your Wallet</BPText>
      <View style={{alignSelf: 'stretch', paddingVertical: 12}}>
        <BPButton
          // image={Images.withdraw_icon}
          label="Sign In"
          // image_size={20}
          onPress={() => navigation.navigate(screenNames.SIGNIN)}
          // disabled={assets.length === 0}
        />
      </View>
    </View>
  );
}
