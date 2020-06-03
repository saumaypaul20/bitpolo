import React from 'react'
import { View, Text, StatusBar, Image } from 'react-native'
import { Container, Content } from 'native-base'
import { primaryColors } from '../../utils/colors'
import BPTitle from '../../common/BPTitle/BPTitle'
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle'
import BPButton from '../../common/BPButton/BPButton'
import LabelInput from '../../common/LabelInput/LabelInput'
import QueryActions from '../../common/QueryActions/QueryActions'
import { useNavigation } from '@react-navigation/native'

const ForgotPassword = () => {
    const navigation = useNavigation()
    return (
        <Container style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex:3,alignItems:'center', justifyContent: 'center',paddingTop:110}}>
                    <View style={{padding:28}}>
                        <Image source={require('../../assets/images/items/forgot_icon.png')} style={{width: 140, height:140}} resizeMode="contain" />
                    </View>
                    
                    <BPTitle title="Forgot Password" />
                    
                    <BPSubtitle text={`Enter the email id associated with\nyour account`} />
                </View>
                <View style={{flex:1,alignItems:'center', justifyContent: 'center', marginHorizontal:43}}>
                    
                   <LabelInput label="Email" />
                  
                    <View style={{paddingTop:20}}>
                        <BPButton label="Submit" onPress={()=> navigation.navigate("VerifyEmail")}/>
                    </View>

                    <View style={{paddingVertical:20}}>
                        <QueryActions action={()=> alert('yo')} actionName="Sign In" query="Remember Password?"/>  

                    </View>
                </View>


            </Content>
        </Container>
    )
}

export default ForgotPassword
