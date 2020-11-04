import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import BPText from '../../common/BPText/BPText';
import {Images, Colors} from '../../theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import {convertDate} from '../../utils/converters';

const BPDatePicker = ({
  label,
  date,
  setDate,
  disabled,
  maxDate = new Date(),
  minDate,
}) => {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <TouchableOpacity
      onPress={showDatepicker}
      disabled={disabled}
      style={{opacity: disabled ? 0.5 : 1}}>
      <View
        style={{
          opacity: 0.8,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 12,
        }}>
        <Image
          source={Images.calendar_icon}
          style={{width: 12.6, height: 14, marginRight: 8.4}}
          resizeMode="contain"
        />
        <BPText>{label}</BPText>
      </View>

      <View
        style={{
          padding: 12,
          borderWidth: 1,
          borderColor: Colors.gray,
          borderRadius: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          opacity: 0.7,
        }}>
        <BPText>{convertDate(date)}</BPText>
        <Icon
          type="FontAwesome"
          name="chevron-down"
          style={{fontSize: 12, color: Colors.lightWhite, marginLeft: 10}}
        />
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={maxDate}
          minimumDate={minDate ? minDate : null}
        />
      )}
    </TouchableOpacity>
  );
};

export default BPDatePicker;
