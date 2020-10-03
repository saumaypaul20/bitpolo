import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity as TouchableOpacity2,
} from 'react-native';
import {Picker, Icon} from 'native-base';
import {Colors} from '../../theme';
import BPText from '../../common/BPText/BPText';
import {pick} from 'lodash';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PickerComp = ({
  chevronColor = Colors.lightWhite,
  color = Colors.lightWhite,
  scale,
  width,
  height,
  backgroundColor,
  items,
  marginLeft,
  chevronSize,
  chevronPositionTop,
  chevronPositionRight,
  placement,
  pickerVal,
  setPickerVal,
  verticalOffet = 0,
  horizontalOffet = 0,
  inversetouchable,
}) => {
  // const { } = props
  // alert(JSON.stringify(pickerVal));
  // alert(JSON.stringify(items));
  // const [selectedVal, setVal] = useState(pickerVal);
  const [vis, setvis] = useState(false);
  // alert(pickerVal?.value);
  const handleItemPress = item => {
    // alert('called');
    // alert(JSON.stringify(item));
    setPickerVal(item);
    setvis(false);
  };

  const calculatePositions = () => {
    switch (placement) {
      case 'top':
        return {
          bottom: 30 + verticalOffet,
          right: 10 + horizontalOffet,
        };
      default:
        return {
          top: 30 + verticalOffet,
          right: 10 + horizontalOffet,
        };
    }
  };

  let TouchableOpacity22 = TouchableOpacity;
  if (inversetouchable) {
    TouchableOpacity22 = TouchableOpacity2;
  }
  return (
    <>
      {/* <Picker
        mode="dropdown"
        style={[
          {
            marginLeft: marginLeft || 0,
            width: width || 140,
            height: height || 16,
            // color: color,
            backgroundColor: backgroundColor || 'transparent',
            transform: [{scaleX: scale || 0.9}, {scaleY: scale || 0.9}],
          },
          Platform.OS === 'android' ? {color: color} : null,
        ]}
        selectedValue={pickerVal}
        onValueChange={val => setPickerVal(val)}
        iosHeader="Select"
        itemStyle={{
          backgroundColor: Colors.transparent,
        }}
        itemTextStyle={{
          color: Colors.primeBG,
        }}>
        {items.map((item, index) => {
          return (
            <Picker.Item
              key={index.toString()}
              label={item.label}
              value={item.value}
            />
          );
        })}
      </Picker> */}

      <View style={{position: 'relative', flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity22
          onPress={() => setvis(!vis)}
          style={{
            position: 'relative',
            zIndex: 1,
          }}>
          <BPText style={{color: color}}>{pickerVal?.label}</BPText>
        </TouchableOpacity22>

        {vis && (
          <View
            style={[
              {
                position: 'absolute',
                zIndex: 1,
                flex: 1,
                paddingVertical: 5,
                minWidth: '100%',
                zIndex: 1,
                backgroundColor: Colors.darkGray3,
                opacity: 1,
                borderRadius: 4,
              },
              calculatePositions(),
            ]}>
            {items.map((item, index) => {
              return (
                <TouchableOpacity22
                  onPress={() => handleItemPress(item)}
                  key={index.toString()}>
                  <BPText
                    style={{
                      fontSize: 16,
                      paddingVertical: 8,
                      paddingHorizontal: 8,
                      borderBottomWidth: index !== items.length - 1 ? 1 : 0,
                      borderBottomColor: Colors.gray,
                    }}>
                    {item.label}
                  </BPText>
                </TouchableOpacity22>
              );
            })}
          </View>
        )}
      </View>

      <TouchableOpacity2
        onPress={() => setvis(!vis)}
        style={{
          position: 'absolute',
          top: chevronPositionTop || 5,
          right: chevronPositionRight || 10,
          zIndex: 10,
        }}>
        <Icon
          type="FontAwesome"
          name="chevron-down"
          style={{
            fontSize: chevronSize || 14,
            color: chevronColor,
          }}
        />
      </TouchableOpacity2>
    </>
  );
};

export default PickerComp;
