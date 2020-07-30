import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Picker, Icon } from 'native-base'
import { Colors } from '../../theme'

 
    const PickerComp = ({chevronColor= Colors.lightWhite , color=Colors.lightWhite, scale, width, height, backgroundColor, items, marginLeft, chevronSize, chevronPositionTop,chevronPositionRight, pickerVal, setPickerVal}) => {
    // const { } = props

    return (
        <>
            <Picker 
                mode="dropdown"
                style={{ 
                    marginLeft: marginLeft || 0,
                    width: width || 140 , 
                    height: height || 16, 
                    color: color, 
                    backgroundColor: backgroundColor || "transparent", 
                    transform: [
                        { scaleX: scale || 0.9 }, 
                        { scaleY: scale || 0.9 },
                        ]
                }}
                selectedValue={pickerVal}
                onValueChange={(val)=> setPickerVal(val)}
                itemStyle={{
                    backgroundColor: Colors.transparent,
                }}
                itemTextStyle={{ 
                    color: color
                }}
                >
            {items.map((item, index)=>{
                return  <Picker.Item key={index.toString()} label={item.label} value= {item.value} />
            })}
                {/* <Picker.Item label="INR/USDT" value="key1" /> */}
                    
            </Picker>

            <Icon type="FontAwesome" name="chevron-down" style={{position:'absolute', top: chevronPositionTop || 5, right: chevronPositionRight || 10, fontSize: chevronSize || 14, color: chevronColor}} />
         </>
    )
}

export default PickerComp
