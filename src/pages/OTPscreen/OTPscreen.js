import React, { useState } from 'react'
import { View, Text, Keyboard, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { primaryColors } from '../../utils/colors';
import { Container, Content, Item, Button } from 'native-base';
import BPButton from '../../common/BPButton/BPButton';
import QueryActions from '../../common/QueryActions/QueryActions';
import UserHeader from '../../common/Toolbar/Toolbar';
import BPTitle from '../../common/BPTitle/BPTitle';
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle';

const OTPscreen = (props) => {
    const {navigation} = props
    const [code, setCode] = useState(''); //setting code initial STATE value
    const [showProgress, setProgress] = useState(false) //setting showProgress initial STATE value


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
        <SafeAreaView style={{flex:1}}>
        <Container style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
            {/* <StatusBar translucent barStyle="light-content" backgroundColor="transparent" /> */}
            <UserHeader />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',  marginHorizontal:48, marginTop:83}}>
                    <BPTitle title="Verfication Code"/>
                    <BPSubtitle text="Please enter the 4 digit code sent to vrsuresh.choudhary@gmail.com" />
                    
                    <OTPInputView
                        keyboardType="phone-pad"
                        // autoFocusOnLoad
                        style={{ height: 64, width: '100%',  marginTop: 30, borderRadius:6, borderWidth:1, borderColor:primaryColors.lightGray , overflow: 'hidden' }}
                        pinCount={4}
                        code={code}
                        onCodeChanged={code => handleCodeFilled(code)}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={code => setCode(code)}
                    />

                    <QueryActions query={"Didn't recieve code yet?"} actionName="Resend" action={()=> resendCode()}/>

                    <BPButton label="Confirm" onPress={()=> navigation.navigate("GoogleVerificationCode")}/>
                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    underlineStyleBase: {
         width:75,
         height:64,
        borderWidth: 0,
        overflow:'hidden',
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        marginLeft:-1,
       // borderColor: primaryColors.lightGray,
        color: primaryColors.white,
        backgroundColor: primaryColors.darkGray,
         borderRadius:0
    },

    underlineStyleHighLighted: {
        // borderColor: '#fff',
        // backgroundColor: 'rgba(45, 154, 255,0.1)'
    },
    blueText: {
        // color: primaryColors.blue,
        fontSize: 12,
        fontFamily: 'Asap-Regular'
    }
});


export default OTPscreen
