import React, { useState } from 'react'
import { View, Text, Image, TextInput , TouchableOpacity} from 'react-native'

import { Item, Input, CardItem, Label } from 'native-base'
import { primaryColors } from '../utils/colors'


const LabelInput = (props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(props.secureTextEntry)

    const onVisibleIconPress =()=>{
     
        setSecureTextEntry(!secureTextEntry)
    }

    return (
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',  marginTop:  0 , marginHorizontal:0, paddingHorizontal:0}}>
            {/* <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Image source={props.iconPath} style={{width:15, height:15, marginBottom:10, opacity: 0.5}} />
            </View> */}
            <CardItem style={{flex:1, backgroundColor:'transparent',flexDirection:'column', alignItems:'flex-start', padding:0, }}>
                {/* <Text style={{fontFamily:'Asap-Regular',color: primaryColors.terneryBlue, fontSize:10, marginBottom: -8, marginLeft:7}}>{props.label}</Text> */}
                <Item floatingLabel style={{borderBottomColor: 'transparent', borderBottomWidth:0.2, borderBottomColor: 'rgba(250, 250, 250, 0.3)', paddingBottom:10}}>
                    <Label style={{ fontFamily: "NordiquePro-Regular", color: primaryColors.lightWhite, letterSpacing: 1, fontSize: 16 }}>{props.label}</Label>

                    <Input  
                        keyboardType={ props.keyboardType ? props.keyboardType : "default"}
                        autoCapitalize="none"
                        autoCompleteType="off"
                        secureTextEntry={secureTextEntry}
                        returnKeyType='done'
                        placeholder={props.placeholder}
                        style={{color: '#fff', fontSize:16, fontFamily:'Asap-Regular', backgroundColor:'transparent'}} placeholderTextColor="#fff"/>
                    {/* {props.isPassword && <TouchableOpacity onPress={()=> onVisibleIconPress()}><Image  source={require('../assets/images/signin/Icon_eye.png')} style={{width: 19, height: 15, marginHorizontal:5, opacity: secureTextEntry ? 0.5 : 1 }} /></TouchableOpacity> } */}
                </Item>
            </CardItem>
        </View>
    )
}

export default LabelInput
