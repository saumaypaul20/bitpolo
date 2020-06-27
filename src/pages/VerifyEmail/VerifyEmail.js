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
import { Colors, Images } from '../../theme'
import { screenNames } from '../../routes/screenNames/screenNames'
import { useSelector } from 'react-redux'
import { resetPassword, validateOtp } from '../../api/apiCalls'
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../utils/apiHeaders.utils'

const VerifyEmail = (props) => {
    let user_id = useSelector(state => state.authReducer.auth_attributes.id);
    console.log(user_id)

    let ip = useSelector(state=> state.authReducer.ip)
    const email = useSelector(state=> state.authReducer.email) 
    const [code, setCode] = useState(''); //setting code initial STATE value
    const [showProgress, setProgress] = useState(false) //setting showProgress initial STATE value
    const pinCount = 6
    const navigation = useNavigation()
    const handleCodeFilled = (code) => {
        setCode(code)

        if (code.length == pinCount) {
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

        const onsubmit= async ()=>{

            let toPassHeader={
                Authorization: getAuthToken(),
                info: getInfoAuthToken(),
                device: getDeviceId()
            }

            let payload2= {
                data:{
                    id:props.route.params.validated_data.id,
                    attributes:{
                        otp:`BEL-${code}`,
                        password: props.route.params.passwords.password,
                        password_confirmation: props.route.params.passwords.c_password,
                    }
                }
            }
            console.log("payload2",payload2)
            let ress = await resetPassword(payload2, toPassHeader)
            console.log("resPasswd",ress)
            if(ress.status){
                alert("Password has been reset")
                // navigation.navigate(screenNames.SIGNIN)
                navigation.reset({index:0, routes: [{name:screenNames.SIGNIN}]})
            } else {
                alert("PIN code doesn't match")
                return
            }
        }

        const validateTheOtp = async () =>{
           
        }

    return (
        <Container style={{ flex: 1, backgroundColor: Colors.primeBG }}>
            <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex:3,alignItems:'center', justifyContent: 'center',paddingTop:110}}>
                    <View style={{padding:28}}>
                        <Image source={Images.verify_icon} style={{width: 140, height:140}} resizeMode="contain" />
                    </View>
                    
                    <BPTitle title="Verify Your Email" />
                    
                    <BPSubtitle text={`Please enter the ${pinCount} digit code sent to\n${email}`} />
                </View>
                <View style={{flex:1,alignItems:'center', justifyContent: 'center', marginHorizontal:43,}}>
                
                    
                <OTPInputView
                        keyboardType="phone-pad"
                        // autoFocusOnLoad
                        style={{ height: 64, width: 300,  marginTop: 30, borderRadius:6, borderWidth:1, borderColor:Colors.gray , overflow: 'hidden' }}
                        pinCount={pinCount}
                        code={code}
                        onCodeChanged={code => handleCodeFilled(code)}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={code => setCode(code)}
                    />
                  
                    <View style={{paddingTop:20, alignSelf:'stretch'}}>
                        <BPButton label="Reset Password" onPress={()=> onsubmit()}/>
                    </View>

                    <View style={{paddingVertical:20}}>
                        <QueryActions action={()=> alert('yo')} actionName="Sign In" query="Remember Password?"/>  

                    </View>
                </View>


            </Content>
        </Container>
    )
}


const styles = StyleSheet.create({

    underlineStyleBase: {
        width:51,
        height:64,
       borderWidth: 0,
       overflow:'hidden',
       borderLeftWidth: 0.5,
       borderRightWidth: 0.5,
       marginLeft:-1,
      // borderColor: Colors.gray,
       color: Colors.white,
       backgroundColor: Colors.darkGray,
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

export default VerifyEmail
