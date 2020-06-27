import React, { useState } from 'react'
import { View, Text, Image, TextInput , TouchableOpacity} from 'react-native'

import { Item, Input, CardItem, Label } from 'native-base'
import { Colors, Fonts } from '../../theme'


const LabelInput = (props) => {
    let {secureTextEntry, value, onChangeText, label, keyboardType} = props
    const [isSecureTextEntry, setSecureTextEntry] = useState(secureTextEntry)


    const thisChangeMe =(t)=>{
        console.log(t);
        props.onChangeText(t)
    }
    const onVisibleIconPress =()=>{
     
        setSecureTextEntry(!secureTextEntry)
    }

    return (
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',  marginTop:  0 , marginHorizontal:0, paddingHorizontal:0}}>
           
            <CardItem style={{flex:1, backgroundColor:'transparent',flexDirection:'column', alignItems:'flex-start', padding:0, }}>
                 
                <Item floatingLabel style={{borderBottomColor: 'transparent', borderBottomWidth:1, borderBottomColor: Colors.textInputBorder, paddingBottom:10}}>
                    <Label style={{ fontFamily: Fonts.FONT_REGULAR, color: Colors.lightWhite, letterSpacing: 1, fontSize: 16 }}>{label}</Label>

                    <Input  
                        keyboardType={ keyboardType ? keyboardType : "default"}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        secureTextEntry={isSecureTextEntry}
                        returnKeyType='done'
                        placeholder={props.placeholder}
                        style={{color: '#fff', fontSize:16, fontFamily:Fonts.FONT_REGULAR, backgroundColor:'transparent'}} placeholderTextColor="#fff"
                        onChangeText={(text)=>  thisChangeMe(text)}
                        value={value}
                        />
                     
                </Item>
            </CardItem>
        </View>
    )
}

export default LabelInput
