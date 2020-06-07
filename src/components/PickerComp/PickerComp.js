import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Picker, Icon } from 'native-base'
import { Colors } from '../../theme'

const PickerComp = (props) => {
    const {color, scale, width, height, backgroundColor, items, marginLeft, chevronSize } = props

    return (
        <>
            <Picker 
                mode="dropdown"
                style={{ 
                    marginLeft: marginLeft || 0,
                    width: width || 140 , 
                    height: height || 16, 
                    color: color ||Colors.lightWhite, 
                    backgroundColor: backgroundColor || "transparent", 
                    transform: [
                        { scaleX: scale || 0.9 }, 
                        { scaleY: scale || 0.9 },
                        ]
                }}
                selectedValue={props.pickerVal}
                onValueChange={(val)=> props.setPickerVal(val)}
                itemStyle={{
                    backgroundColor: Colors.transparent,
                }}
                itemTextStyle={{ 
                    color: Colors.white
                }}
                >
            {items.map((item, index)=>{
                return  <Picker.Item key={index.toString()} label={item.label} value= {item.value} />
            })}
                {/* <Picker.Item label="INR/USDT" value="key1" /> */}
                    
            </Picker>

            <Icon type="FontAwesome" name="chevron-down" style={{position:'absolute', top: props.chevronPositionTop || 5, right: props.chevronPositionRight || 10, fontSize: chevronSize || 14, color: Colors.lightWhite}} />
         </>
    )
}

export default PickerComp
