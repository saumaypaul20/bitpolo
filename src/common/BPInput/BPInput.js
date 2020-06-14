import React from 'react'
import { View, Text } from 'react-native'
import BPText from '../BPText/BPText'
import { Colors, Fonts } from '../../theme'
import { Input } from 'native-base'

const BPInput = ({label, placeholder, text, setText, rightEl}) =>{
    return(
        <>
            <BPText style={{fontFamily: Fonts.FONT_MEDIUM}}>{label}</BPText>
            <View style={{borderColor: Colors.lightWhite, borderRadius: 6, borderWidth:1, marginTop:8, paddingHorizontal:16, flexDirection:'row', alignItems:'center'}}>
                <Input
                    keyboardType="default"
                    value={text}
                    onChangeText ={(t)=> setText(t)}
                    placeholder={placeholder}
                />
               {rightEl && <View style={{alignItems:'center', justifyContent:'center', borderLeftWidth:1, borderColor: Colors.lightWhite, position:'absolute', right:0, top:0, bottom:0, padding:14}}>
                    {rightEl}
                </View>}
            </View>
        </>
    )
}

export default BPInput
