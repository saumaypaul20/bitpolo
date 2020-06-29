import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { primaryColors } from '../../theme/colors'
import BPText from '../BPText/BPText'

const SettingsListItem = (props) => {
    return (
        <TouchableOpacity 
         onPress={()=>props.onPress ? props.onPress() : console.log("uo")}
         activeOpacity={0.8} 
         style={{
             ...styles.button,
            borderTopWidth: props.borderBottom ? props.borderTop ? 1:0 : props.noBorder ? 0 :1, 
            borderBottomWidth: props.noBorder ? 0 : props.borderBottom ? 1 : 0, 
            paddingHorizontal: props.paddingHorizontal ? props.paddingHorizontal : 40,
            backgroundColor: props.backgroundColor || "transparent"
            }}
            >
           <View style={{flexDirection:'row', flex:1, alignSelf:'flex-start', alignItems:"center"}}>
              {props.image &&  <Image source={props.image} style={{width: 18, marginRight:20, height:18}} resizeMode="contain"/>}
                <BPText style={{ fontSize:18}}>{props.label}</BPText>
           </View>
           {
               props.rightElement &&
               <View style={{flexDirection:'row',  justifyContent:'center', alignItems:'center'}}>
                   {props.rightElement}
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
