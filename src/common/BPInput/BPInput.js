import React from 'react';
import {View, TextInput} from 'react-native';
import BPText from '../BPText/BPText';
import {Colors, Fonts} from '../../theme';
import {Input} from 'native-base';
import {Platform} from 'react-native';

const BPInput = ({
  label,
  placeholder,
  text,
  setText,
  rightEl,
  labelStyle,
  secureTextEntry = false,
  maxLength,
  autoCapitalize = 'none',
  keyboardType = 'default',
  borderRadius = 6,
  rightborderLeftWidth = 1,
  editable = true,
}) => {
  return (
    <>
      <BPText style={({fontFamily: Fonts.FONT_MEDIUM}, labelStyle)}>
        {label}
      </BPText>
      <View
        style={{
          borderColor: Colors.lightWhite,
          borderWidth: 1,
          marginTop: 8,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: borderRadius,
        }}>
        <TextInput
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          value={text}
          onChangeText={t => setText(t)}
          placeholder={placeholder}
          style={{
            color: Colors.white,
            width: '100%',
            paddingVertical: Platform.OS == 'ios' ? 14 : 10,
          }}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          editable={editable}
        />
        {rightEl && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderLeftWidth: rightborderLeftWidth,
              borderColor: Colors.lightWhite,
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              padding: 14,
            }}>
            {rightEl}
          </View>
        )}
      </View>
    </>
  );
};

export default BPInput;
