import React from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const OTPInputDecider = ({type, data}) => {
    const navigation = useNavigation()
    let user = useSelector(state=>state.authReducer.auth_attributes)
    if(!user){
        navigation.navigate(screenNames.OTP_SCREEN, {data: data})
    }else{
        if(user.attributes.google_auth){
            
        }
    }

    return null
   
}

export default OTPInputDecider
