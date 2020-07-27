import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { primaryColors } from '../../theme/colors'
import BPText from '../BPText/BPText'

const SettingsListItem = ({
    rightElement,
    label,
    image,
    onPress,
    paddingHorizontal = 40, 
    borderBottom, 
    noBorder, 
    borderTop, 
    backgroundColor="transparent"
}) => {
    return (
        <TouchableOpacity 
         onPress={()=>onPress ? onPress() : console.log("uo")}
         activeOpacity={0.8} 
         style={{
             ...styles.button,
            borderTopWidth: borderBottom ? borderTop ? 1:0 : noBorder ? 0 :1, 
            borderBottomWidth: noBorder ? 0 : borderBottom ? 1 : 0, 
            paddingHorizontal:  paddingHorizontal,
            backgroundColor: backgroundColor 
            }}
            >
           <View style={{flexDirection:'row', flex:1, alignSelf:'flex-start', alignItems:"center"}}>
              {image &&  <Image source={image} style={{width: 18, marginRight:20, height:18}} resizeMode="contain"/>}
                <BPText style={{ fontSize:18}}>{label}</BPText>
           </View>
           {
               rightElement &&
               <View style={{flexDirection:'row',  justifyContent:'center', alignItems:'center'}}>
                   {rightElement}
               </View>
           }
        </TouchableOpacity>
    )
}

const styles= StyleSheet.create({
    button:{
        flexDirection:'row', 
        alignItems:'center', 
        alignSelf:'stretch', 
        borderColor: primaryColors.gray, 
        opacity:0.8,
        paddingVertical:18
    },
})
export default SettingsListItem
