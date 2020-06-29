import React, { useState } from 'react'
import { Text , TouchableOpacity, StatusBar} from 'react-native'
import { Container, Content, CardItem, Item, Card , Button, View} from 'native-base'
import LabelInput from '../../components/LabelInput/LabelInput'
import LogoHeader from '../../common/LogoHeader/LogoHeader'
import BPButton from '../../common/BPButton/BPButton'
import QueryActions from '../../components/QueryActions/QueryActions'
import { Colors } from '../../theme'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../api/users.api'
import { SafeAreaView } from 'react-native-safe-area-context'
import { screenNames } from '../../routes/screenNames/screenNames'
import { inputAction } from '../../redux/actions/auth.actions'
import { TYPES } from '../../redux/types'

const Signup = ({navigation}) => {
    const dispatch = useDispatch()

    const deviceId = useSelector(state=> state.deviceReducer.deviceId)
    let email = useSelector(state => state.authReducer.email);

    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] =useState(null);
    const [error, setError] = useState(false)
 
    const goToScreen = () =>{
        navigation.reset({
            index: 0,
            routes: [{ name: screenNames.SIGNIN, params:{email: email} }],
        })
    }

    const isError =() =>{
        if(!email && !password && !phone && !rePassword){
            alert("All fields must be filled")
            setError(true)
            return true
        }
        else if(!email || email.length === 0 || !email.match("@") || !email.match(".")){
            alert("Provide correct email address")
            setError(true)
            return true
        }else if(!phone || phone.length === 0){
            setError(true)
            alert("Phone mustn't be empty")
            return true
        }else if(!password || password.length === 0){
            alert("Password mustn't be empty")
            setError(true)
            return true
        }else  if(password != rePassword){
            alert("Confirmation password doesn't match!")
            return true
        }
        return false
    }

    const register = async ()=>{
        if(isError() || error){
            return 
        }
        let referrer_code = ""
       
        let payload = {
            email: email,
            password: password,
            password_confirmation: rePassword,
            referrer_code: referrer_code
        }

        let res = await registerUser(payload);
        console.log(res)
        if(!res.status){
            alert(JSON.stringify(Object.values(res.data.data.attributes.message)[0]).replace(/['"]+/g, ''))
            return
        }

        alert(res.data.data.attributes.message)

        goToScreen() 
         
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor= {Colors.primeBG} />
                <Content contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex:1, justifyContent:'center'}}>
                    <Card transparent style={{ flex:12, justifyContent:'center', alignItems:'stretch', alignSelf:'stretch'}}>
                        <LogoHeader />    
                        
                    </Card>
                    
                    <Card transparent  style={{flex:0.5,justifyContent:'flex-start', alignItems:'center', paddingBottom: 55, paddingTop:0, marginTop:0 }}>

                        <View style={{  flexDirection: 'column', backgroundColor: 'transparent', alignItems:'center', marginHorizontal:43,}}>
                            <LabelInput 
                                keyboardType="email-address" 
                                label="Email" 
                                value={email}
                                onChangeText={(t) =>{dispatch(inputAction(TYPES.EMAIL_INPUT, t))}}

                            />
                            <LabelInput 
                                label="Phone No" 
                                keyboardType="phone-pad" 
                                value={phone}
                                onChangeText = {(t)=>setPhone(t)}
                            />
                            <LabelInput 
                                secureTextEntry 
                                label="Password" 
                                value={password}
                                onChangeText = {(t)=>{setPassword(t); dispatch(inputAction("PASSWORD", t))}} 
                            />
                            <LabelInput 
                                secureTextEntry
                                label="Re-Enter Password" 
                                value={rePassword}
                                onChangeText = {(t)=>setRePassword(t)} 
                            />
                            
                            <View style={{marginTop:48, marginBottom:53, marginHorizontal:16,alignSelf:'stretch'}}>
                                <BPButton label="Sign Up" onPress={()=> register()} style={{alignSelf:'stretch'}}/>
                            </View>
                        </View>
                        
                        <QueryActions 
                            query={"Already have an account yet?"} 
                            actionName="Sign In" 
                            action={()=>goToScreen()}/>

                    </Card>
            
                </View>

                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Signup
