import React, {useRef} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Button} from 'native-base';
import BPText from '../../common/BPText/BPText';
import {Colors} from '../../theme';

const InputCounter = ({
  onIncrease,
  onDecrease,
  input,
  onInputChange,
  label,
  disabled,
  onBlurit,
  validate,
}) => {
  const ref = useRef(null);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
      }}>
      {onDecrease && (
        <TouchableOpacity
          style={styles.counterBtns}
          onPress={() => onDecrease()}>
          <BPText>-</BPText>
        </TouchableOpacity>
      )}

      <TextInput
        ref={ref}
        placeholder={label}
        editable={!disabled}
        underlineColorAndroid={'transparent'}
        placeholderTextColor={Colors.white}
        value={input}
        onChangeText={text => onInputChange(text)}
        // onBlur={e => validate(e.nativeEvent.text)}
        // onBlur={(event)=> onBlurit ? onBlurit(event.nativeEvent.text) : false }
        keyboardType="phone-pad"
        style={{
          alignSelf: 'stretch',
          flex: 1,
          backgroundColor: Colors.darkGray3,
          color: Colors.white,
          textAlign: 'center',
          fontSize: 12,
        }}
      />

      {onIncrease && (
        <TouchableOpacity
          style={styles.counterBtns}
          onPress={() => onIncrease()}>
          <BPText>+</BPText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  counterBtns: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGray2,
    // height: '100%',
    height: 48,
    zIndex: 1,
  },
});

export default InputCounter;
