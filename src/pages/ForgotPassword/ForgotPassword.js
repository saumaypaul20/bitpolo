import React, { useState } from 'react'
import { View, Text, StatusBar, Image } from 'react-native'
import { Container, Content } from 'native-base'
import { primaryColors } from '../../theme/colors'
import BPTitle from '../../common/BPTitle/BPTitle'
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle'
import BPButton from '../../common/BPButton/BPButton'
import LabelInput from '../../components/LabelInput/LabelInput'
import QueryActions from '../../components/QueryActions/QueryActions'
import { useNavigation } from '@react-navigation/native'
import { Colors, Images } from '../../theme'
import { useSelector, useDispatch } from 'react-redux'
import { inputAction } from '../../redux/actions/auth.actions'
import { TYPES } from '../../redux/types'
import { screenNames } from '../../routes/screenNames/screenNames'
import { forgetPassword } from '../../api/apiCalls'
import { getPublicIP } from '../../utils/apiHeaders.utils'

const ForgotPassword = () => {
    const navigation = useNavigation()
    // const [email, setEmail] = useState('')
    const dispatch = useDispatch()
    const email = useSelector(state=> state.authReducer.email)
    const ip = useSelector(state=> state.authReducer.ip)

    const onSubmit = async () =>{
        try{
            let res = await forgetPassword({email:email, ip: ip})
            if(res.status){
                console.log(res)
                navigation.navigate(screenNames.CHANGE_PASSWORD, {data:res.data.data})
            }else{
                alert("Something went wrong! Please try again.")
            }
        }catch(e){
            alert("Something went wrong! Please try again.")
        }
    }
    return (
        <Container style={{ flex: 1, backgroundColor: Colors.primeBG }}>
            <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor={Colors.primeBG} />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex:3,alignItems:'center', justifyContent: 'center',paddingTop:110}}>
                    <View style={{padding:28}}>
                        <Image source={Images.forgot_icon} style={{width: 140, height:140}} resizeMode="contain" />
                    </View>
                    
                    <BPTitle title="Forgot Password" />
                    
                    <BPSubtitle text={`Enter the email id associated with\nyour account`} />
                </View>
                <View style={{flex:1,alignItems:'center', justifyContent: 'center', marginHorizontal:43}}>
                    
                   <LabelInput label="Email" onChangeText={(t)=> dispatch(inputAction(TYPES.EMAIL_INPUT, t))} value={email} />
                  
                    <View style={{paddingTop:20, alignSelf:'stretch', marginHorizontal:16}}>
                        <BPButton label="Submit" onPress={()=> onSubmit()}/>
                    </View>

                    <View style={{paddingVertical:20}}>
                        <QueryActions action={()=> navigation.pop()} actionName="Sign In" query="Remember Password?"/>  

                    </View>
                </View>


            </Content>
        </Container>
    )
}

export default ForgotPassword
