import React, { useState } from 'react'
import { View, Text, Keyboard, StyleSheet, StatusBar, SafeAreaView, TextInput } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { primaryColors } from '../../utils/colors';
import { Container, Content, Item, Button } from 'native-base';
import BPButton from '../../common/BPButton/BPButton';
import QueryActions from '../../common/QueryActions/QueryActions';
import UserHeader from '../../common/Toolbar/Toolbar';

const GoogleVerificationCode = (props) => {
    const {navigation} = props
    const [code, setCode] = useState(''); //setting code initial STATE value        

    return (
        <SafeAreaView style={{flex:1}}>
        <Container style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
            {/* <StatusBar translucent barStyle="light-content" backgroundColor="transparent" /> */}
            <UserHeader />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',  marginHorizontal:48, marginTop:83}}>
                    <Text style={{color: primaryColors.white, fontSize:24, fontWeight: '900'}}>Enter the Verification code</Text>
                    <Text style={{color: primaryColors.white, fontSize:16, textAlign:'center', paddingVertical:20, lineHeight:23}}>{`Get a verification code from the\n`}<Text style={{fontWeight:'700'}}>Google Authenticator app</Text></Text>
                    
                    <TextInput
                        keyboardType="phone-pad"
                        // autoFocusOnLoad
                        placeholder="Enter 6-digit code"
                        placeholderTextColor={primaryColors.lightGray}
                        style={styles.inputStyle}
                        value={code}
                        onChangeText={code => setCode(code)}
                        maxLength={6}
                    />


                    <BPButton label="Confirm" onPress={()=> navigation.reset({index:0, routes: [{name:"Dashboard"}]})}/>
                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    inputStyle:{  width: '100%',  marginTop: 40, marginBottom:68 ,borderRadius:6, borderWidth:1, borderColor:primaryColors.lightGray , padding: 20, color:'#fff'},
   
});


export default GoogleVerificationCode
