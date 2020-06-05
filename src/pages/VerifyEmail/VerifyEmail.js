import React, { useState } from 'react'
import { View, Text, StatusBar, Image, StyleSheet, Keyboard } from 'react-native'
import { Container, Content } from 'native-base'
import BPTitle from '../../common/BPTitle/BPTitle'
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle'
import BPButton from '../../common/BPButton/BPButton'
import LabelInput from '../../components/LabelInput/LabelInput'
import QueryActions from '../../components/QueryActions/QueryActions'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { useNavigation } from '@react-navigation/native'
import { Colors } from '../../styles'

const VerifyEmail = () => {

    const [code, setCode] = useState(''); //setting code initial STATE value
    const [showProgress, setProgress] = useState(false) //setting showProgress initial STATE value

    const navigation = useNavigation()
    const handleCodeFilled = (code) => {
        setCode(code)

        if (code.length == 4) {
            Keyboard.dismiss();
            //setProgress(true)
           // renderToast("PIN Number Verified")
            //  console.log("code " + code)
            verifyOtp(code)

        }}


        const verifyOtp = (input) => {
            if (input == code) {//need to implement
    
                //Actions.push("AccountType")
            } else {
                Keyboard.dismiss();
                alert("PIN code doesn't match")
            }
        }

        const resendCode = ()=>{
            //to do
        }

    return (
        <Container style={{ flex: 1, backgroundColor: Colors.primeBG }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex:3,alignItems:'center', justifyContent: 'center',paddingTop:110}}>
                    <View style={{padding:28}}>
                        <Image source={require('../../assets/images/items/verify_icon.png')} style={{width: 140, height:140}} resizeMode="contain" />
                    </View>
                    
                    <BPTitle title="Verify Your Email" />
                    
                    <BPSubtitle text={`Please enter the 4 digit code sent to\nvrsuresh.choudhary@gmail.com`} />
                </View>
                <View style={{flex:1,alignItems:'center', justifyContent: 'center', marginHorizontal:43}}>
                
                    
                <OTPInputView
                        keyboardType="phone-pad"
                        // autoFocusOnLoad
                        style={{ height: 64, width: '100%',  marginTop: 60, marginBottom:60, borderRadius:6, borderWidth:1, borderColor:Colors.lightGray , overflow: 'hidden' }}
                        pinCount={4}
                        code={code}
                        onCodeChanged={code => handleCodeFilled(code)}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={code => setCode(code)}
                    />
                  
                    <View style={{paddingTop:20}}>
                        <BPButton label="Reset Password" onPress={()=> navigation.navigate("ChangePassword")}/>
                    </View>

                    <View style={{paddingVertical:20}}>
                        <QueryActions action={()=> alert('yo')} actionName="Sign In" query="Remeber Password?"/>  

                    </View>
                </View>


            </Content>
        </Container>
    )
}


const styles = StyleSheet.create({

    underlineStyleBase: {
         width:77,
         height:64,
        borderWidth: 0,
        overflow:'hidden',
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        marginHorizontal:-1,
       // borderColor: Colors.lightGray,
        color: Colors.white,
        backgroundColor: Colors.darkGray,
         borderRadius:0
    },

    underlineStyleHighLighted: {
        // borderColor: '#fff',
        // backgroundColor: 'rgba(45, 154, 255,0.1)'
    },
    blueText: {
        // color: Colors.blue,
        fontSize: 12,
        fontFamily: 'Asap-Regular'
    }
});  

export default VerifyEmail
