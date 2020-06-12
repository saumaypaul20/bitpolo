import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { primaryColors } from '../../theme/colors';
import { Container, Content } from 'native-base';
import BPButton from '../../common/BPButton/BPButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toolbar from '../../components/Toolbar/Toolbar';
import BPText from '../../common/BPText/BPText';
import { Fonts, Colors } from '../../theme';
import { screenNames } from '../../Routes/screenNames/screenNames';

const GoogleVerificationCode = (props) => {
    const {navigation} = props
    const [code, setCode] = useState(''); //setting code initial STATE value        

    const goToScreen =()=>{
        navigation.reset({index:0, routes: [{name:screenNames.DASHBOARD}]})
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',  marginHorizontal:48, marginTop:83}}>
                        <BPText style={{fontSize:24, fontFamily: Fonts.FONT_BOLD}}>Enter the Verification code</BPText>
                        <BPText style={{ fontSize:16, textAlign:'center', paddingVertical:20, lineHeight:23}}>{`Get a verification code from the\n`}<BPText style={{fontFamily:Fonts.FONT_BOLD}}>Google Authenticator app</BPText></BPText>
                        
                        <TextInput
                            keyboardType="oneTimeCode"
                            // autoFocusOnLoad
                            placeholder="Enter 6-digit code"
                            placeholderTextColor={Colors.gray}
                            style={styles.inputStyle}
                            value={code}
                            onChangeText={code => setCode(code)}
                            maxLength={6}
                        />


                        <BPButton label="Confirm" style={{alignSelf:'stretch'}} onPress={()=> goToScreen()}/>
                    

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    inputStyle:{  width: '100%',  marginTop: 40, marginBottom:68 ,borderRadius:6, borderWidth:1, borderColor:Colors.gray , padding: 20, color:'#fff'},
   
});


export default GoogleVerificationCode
