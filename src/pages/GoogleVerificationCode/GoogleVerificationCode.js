import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { primaryColors } from '../../theme/colors';
import { Container, Content } from 'native-base';
import BPButton from '../../common/BPButton/BPButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toolbar from '../../components/Toolbar/Toolbar';
import BPText from '../../common/BPText/BPText';
import { Fonts, Colors } from '../../theme';
import { screenNames } from '../../routes/screenNames/screenNames';
import { useNavigation, StackActions } from '@react-navigation/native';
import { g2fVerify, getGeolocation } from '../../api/users.api';
import { getPublicIP, getAuthToken, getInfoAuthToken, getDeviceId } from '../../utils/apiHeaders.utils';
import DeviceInfo  from 'react-native-device-info';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { saveAuthAttributesAction } from '../../redux/actions/auth.actions';
import Storage from '../../utils/storage.utils';
import { changeUserPassword } from '../../api/security.api';

const GoogleVerificationCode = (props) => {
    const navigation = useNavigation()
    let email = useSelector(state => state.authReducer.email);

    const [code, setCode] = useState(''); //setting code initial STATE value        
    const [geo, setgeo] = useState(null); //setting code initial STATE value        
    const dispatch = useDispatch()

    const onSubmit = () =>{
        if(props.route.params.type === 'login'){
            goToScreen()
        }else{
            changeUserPasswordFlow()
        }
    }

    const goToScreen = async ()=>{
        if(props.route.params.screen){
            navigation.dispatch(StackActions.pop(2))
        }else{
            let payload = {
                id: props.route.params.data.id,
                attributes:{
                    browser : await DeviceInfo.getModel(),
                    ip : await getPublicIP(),
                    is_browser : false,
                    is_mobile : true,
                    is_app : true,
                    os : await DeviceInfo.getSystemName(),
                    os_byte : await DeviceInfo.getSystemVersion(),
                    g2f_code : code,
                    country : geo.country,
                    // city : geo.city,
                    // region : geo.region
                }
            }
            try {
                let res = await g2fVerify(payload)
                console.log(res)
                if(res.status){
                let res_data= res.data.data;
                res_data.email =email
                dispatch(saveAuthAttributesAction(res_data))
                await Storage.set("login", res_data)
                navigation.reset({index:0, routes: [{name:screenNames.DASHBOARD}]})
            }
            } catch (error) {
                console.log(error);
                alert("Something went wrong!")
                
            }
        }
    }

    const changeUserPasswordFlow = async () =>{
          let toPassHeader={
                Authorization: getAuthToken(),
                info: getInfoAuthToken(),
                device: getDeviceId()
            }

            let payload1= {
                data:{
                    id:props.route.params.id,
                    attributes:{
                        g2f_code:code,
                        old_password: props.route.params.passwords.old_password,
                        password: props.route.params.passwords.password,
                        password_confirmation: props.route.params.passwords.c_password,
                    }
                }
            }
        let ress = await changeUserPassword(payload1, toPassHeader)
                console.log("cahnge pwd",ress)
                if(ress.status){
                    alert("Password has been changed")
                    // navigation.navigate(screenNames.SIGNIN)
                    navigation.dispatch(StackActions.pop(2))
                } else {
                    alert("Something went wrong!")
                    return
                }

    }

    const getGeoInfo = async () =>{
        try {
            let res = await getGeolocation()
        if(res){
            console.log("geo res",res)
            setgeo(res.data)
        }
        } catch (error) {
            //
        }

    }
    useEffect(() => {
        getGeoInfo() 
    }, [])
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


                        <BPButton label="Confirm" style={{alignSelf:'stretch'}} onPress={()=> onSubmit()}/>
                    

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
