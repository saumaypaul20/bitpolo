import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { primaryColors } from '../../theme/colors'

const SettingsListItem = (props) => {
    return (
        <TouchableOpacity onPress={()=>props.onPress ? props.onPress() : console.log("uo")}
         activeOpacity={0.8} 
         style={{flexDirection:'row', alignItems:'center', alignSelf:'stretch', borderTopWidth:1, borderColor: primaryColors.gray, paddingHorizontal:40, paddingVertical:18}}>
            <Image source={props.image} style={{width:18, marginRight:20, height:18}} resizeMode="contain"/>
            <Text style={{color: primaryColors.white, fontSize:18, fontFamily:'Inter-Regular'}}>{props.label}</Text>
        </TouchableOpacity>
    )
}

export default SettingsListItem
