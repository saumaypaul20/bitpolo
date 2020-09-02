import React, { useState } from 'react'
import { StatusBar} from 'react-native'
import { Container, Content, Card , Button, View, Toast} from 'native-base'
import LabelInput from '../../components/LabelInput/LabelInput'
import BPButton from '../../common/BPButton/BPButton'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { inputAction, saveUserId } from '../../redux/actions/auth.actions'
import LogoHeader from '../../common/LogoHeader/LogoHeader'
import QueryActions from '../../components/QueryActions/QueryActions'
import { Colors, Fonts } from '../../theme'
import BPText from '../../common/BPText/BPText'
import { screenNames } from '../../routes/screenNames/screenNames'
import { SafeAreaView } from 'react-native-safe-area-context'
import {loginUser, getGeolocation} from '../../api/users.api'
import { getPublicIP, getDeviceId } from '../../utils/apiHeaders.utils'
import { useNavigation } from '@react-navigation/native'
import { TYPES } from '../../redux/types'

const Signin = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [loading, setloading] = useState(false)
    let email = useSelector(state => state.authReducer.email, shallowEqual);
    let password = useSelector(state => state.authReducer.password, shallowEqual);

    const isDisabled =()=>{
        if(email.length==0){
           return true
        }else if(password.length==0){
           return true
        }else if(loading){
            return true
        }

       return false
    }

    const onSignInPress = async () => {
      //  await Storage.set("login", true)
      setloading(true)
    
      let ip = await getPublicIP()
      if(!ip){
          Toast.show({
              text:'Something went wrong. Try again!'
          })
          return
      }

      if(!email || email.length === 0){
          alert("Enter your Email")
          return
      }else if(!password || password.length == 0){
          alert("Enter your Password")
          return
      }

      let location = await getGeolocation()
      if(!location){
          alert("Unable to get your location");
          return
      }
    //   alert(JSON.stringify(location))
      let payload = {
            is_browser: false,
            is_mobile: true,
            ip: ip,
            email: email,
            password: password,
            browser: getDeviceId().browser,
            os: getDeviceId().os
            
        }

      let res = await loginUser({...payload, ...location.data})
      console.log(res)
     
      if(!res.status){
            alert(res.data.data.attributes.message)
            setloading(false)
      }else{ 

        if(res.data.data.attributes.google_auth){
            navigation.navigate(screenNames.GOOGLE_VERIFICATION_CODE, {data: res.data.data, type:'login'})
            setloading(false)
            return
        }else{
            setloading(false)
         // alert(res.data.data.attributes.message)
          dispatch(saveUserId(res.data.data.id))
          navigation.navigate(screenNames.OTP_SCREEN, {data: res.data.data})}
        }
       
    }
    
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                <StatusBar translucent barStyle={Colors.barStyle} backgroundColor={Colors.primeBG} />
                <Content contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex:1, justifyContent:'center'}}>
                    <Card transparent style={{ flex:4, justifyContent:'center',}}>
                    <LogoHeader />    
                            <View style={{  flexDirection: 'column', backgroundColor: 'transparent', alignItems:'center', marginHorizontal:43}}>
                                <LabelInput keyboardType="email-address" label="Email" placeholder="Email/Mobile Number"  onChangeText={(text)=> dispatch(inputAction(TYPES.EMAIL_INPUT, text))} value={email}/*iconPath={iconLabel1} */ />
                                <LabelInput label="Password" placeholder="Enter your Password" onChangeText={(text)=> dispatch(inputAction(TYPES.PASSWORD_INPUT, text))} value={password} secureTextEntry/*iconPath={iconLabel2} isPassword secureTextEntry *//>
                                
                                <Button onPress={()=>navigation.navigate(screenNames.PINSCREEN, {type:1, screen: screenNames.FORGOT_PASSWORD})} transparent style={{ marginVertical: 10, alignSelf:'flex-end' }} >
                                    <BPText uppercase={false} style={{ padding: 20, fontSize: 13, color: Colors.lightWhite, fontFamily: Fonts.FONT_REGULAR }}>Forgot Password?</BPText>
                                </Button>

                                <BPButton loading={loading} label="Sign in" onPress={()=> onSignInPress()} style={{alignSelf:'stretch'}} disabled={isDisabled()}/>
                            </View>
                        </Card>
                        
                        <Card transparent  style={{flex:1,justifyContent:'flex-end', alignItems:'center', paddingBottom: 55 }}>
                            

                        <QueryActions
                            query={"Don't have an account yet?"} 
                            actionName="Sign Up" 
                            action={()=> navigation.navigate(screenNames.SIGNUP)}/>

                        </Card>
            
                </View>

                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Signin
