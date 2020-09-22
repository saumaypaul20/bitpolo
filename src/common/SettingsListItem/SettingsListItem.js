import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {primaryColors} from '../../theme/colors';
import BPText from '../BPText/BPText';

const SettingsListItem = ({
  rightElement,
  label,
  image,
  onPress,
  paddingHorizontal = 40,
  borderBottom,
  noBorder,
  borderTop,
  imageType,
  backgroundColor = 'transparent',
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => (onPress ? onPress() : console.log('uo'))}
      activeOpacity={0.8}
      style={{
        ...styles.button,
        borderTopWidth: borderBottom ? (borderTop ? 1 : 0) : noBorder ? 0 : 1,
        borderBottomWidth: noBorder ? 0 : borderBottom ? 1 : 0,
        paddingHorizontal: paddingHorizontal,
        backgroundColor: backgroundColor,
        opacity: disabled ? 0.5 : 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignSelf: 'flex-start',
          alignItems: 'center',
        }}>
        {image && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 14,
              marginRight: 20,
            }}>
            <Image
              source={image}
              style={{width: 18, height: 18}}
              resizeMode="contain"
            />
          </View>
        )}
        <BPText style={{fontSize: 18}}>{label}</BPText>
      </View>
      {rightElement && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {rightElement}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: primaryColors.gray,
    opacity: 0.8,
    paddingVertical: 18,
  },
});
export default SettingsListItem;
