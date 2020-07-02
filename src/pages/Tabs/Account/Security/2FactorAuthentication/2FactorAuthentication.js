import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, Clipboard, KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Fonts } from '../../../../../theme'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import { Container, Content, Root } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import BPText from '../../../../../common/BPText/BPText'
import BPInput from '../../../../../common/BPInput/BPInput'
import BPButton from '../../../../../common/BPButton/BPButton'
import { useNavigation, StackActions } from '@react-navigation/native'
import { g2fCreate, g2fSettings } from '../../../../../api/security.api'
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../../../utils/apiHeaders.utils'
import { copyText } from '../../../../../utils/component.utils'
import { user_icon } from '../../../../../theme/images'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { saveAuthAttributesAction } from '../../../../../redux/actions/auth.actions'
import Storage from '../../../../../utils/storage.utils'

const TwoFactorAuthentication = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector(state=>state.authReducer.auth_attributes, shallowEqual)
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [googlekey, setgooglekey] = useState(null)


    let toPassHeader={
        Authorization: getAuthToken(),
        info: getInfoAuthToken(),
        device: getDeviceId()
    }

    const callCreateg2f =async()=>{
       

        let res =await g2fCreate(toPassHeader)
        if(res.status){
            setgooglekey(res.data.googleKey)
        }
    }
    useEffect(() => {
        callCreateg2f()
       
    }, [])

    const addG2F = async()=>{

        let payload= {
            data:{
                id: user.id,
                attributes:{
                    password: password,
                    g2f_code: code,
                    google_secrete_key: googlekey,
                    google_auth: true
                }
            }
        }

        let res = await g2fSettings(payload, toPassHeader)
        if(res.status){
                let newUser = user;
                newUser.attributes.google_auth = true;
                dispatch(saveAuthAttributesAction(newUser))
                await Storage.set("login", newUser)
                navigation.dispatch(StackActions.pop(2))
        }
    }

    const isDisabled =() =>{
        if(code.length !== 6 || password.length === 0){
            return true
        }

        return false
    }
    
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
     
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.TWO_FACTOR_AUTHENTICATION}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch', marginHorizontal:20, justifyContent:'space-between'}}>
                        {googlekey && <>
                        <View>
                            <View style={{paddingTop:20, justifyContent:'center', alignItems:'center'}}>
                                <BPText style={{lineHeight:20, fontSize:18, marginBottom:8}}>Open Google Authenticator</BPText>

                                <BPText style={{lineHeight:20, opacity:0.8, alignSelf:'stretch', textAlign:'center',}}>Please enter the below alphanumeric code on your authentication app.</BPText>
                                

                                <BPText  onPress={() => copyText(googlekey,'Google Key')} selectable style={{lineHeight:20, alignSelf:'stretch', textAlign:'center', fontSize:20, padding:20, borderWidth:1, borderColor: Colors.white, marginHorizontal:16, borderRadius:4, marginTop:20, marginBottom:5}}>{googlekey}</BPText>

                                <BPText style={{lineHeight:20, opacity:0.8, alignSelf:'stretch', textAlign:'center',}}>Press to Copy.</BPText>


                                <BPText style={{lineHeight:16,marginTop:5, opacity:0.8, alignSelf:'stretch', textAlign:'center', fontSize:12, color:Colors.red, fontFamily: Fonts.FONT_SEMIBOLD}}> Please make a note of the key shown above. In case you lose your mobile device or delete the 'Google Authenticator' app, this key allows you to recover your BitPolo account.</BPText>

                            </View>
                            <View style={{paddingTop:20}}>
                                <BPText style={{lineHeight:20, fontSize:18, marginBottom:8}}>Enter your password</BPText>
                                <BPText style={{lineHeight:20, opacity:0.8}}>Please enter the password for your account.</BPText>
                            </View>
                            
                            <BPInput secureTextEntry placeholder="Enter password" text={password} setText={(t)=> setPassword(t)}/>

                            <View style={{paddingTop:20}}>
                                <BPText style={{lineHeight:20, fontSize:18, marginBottom:8}}>Enter confirmation code</BPText>
                                <BPText style={{lineHeight:20, opacity:0.8}}>Please enter the confirmation code that you see on your authentication app.</BPText>
                            </View>

                            <BPInput maxLength={6} keyboardType="number-pad" placeholder="Enter the 6-digit code" text={code} setText={(t)=> setCode(t)}/>

                        </View>
                        
                        <View style={{marginBottom:40}}>
                            <BPButton label="Submit" onPress={()=> addG2F()} disabled={isDisabled()}/>
                        </View>
                        </>}
                        {
                            !googlekey && <ActivityIndicator size="large" color={Colors.white}/>
                        }
                    </View>
                </Content>
            </Container>
           
        </SafeAreaView>
    )
}

export default TwoFactorAuthentication
