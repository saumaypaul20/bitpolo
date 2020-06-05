import React from 'react'
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import { Container, Content, Icon } from 'native-base'
import { primaryColors } from '../../styles/colors'
import BPTitle from '../../common/BPTitle/BPTitle'
import BPSubtitle from '../../common/BPSubTitle/BPSubtitle'
import BPButton from '../../common/BPButton/BPButton'
import LabelInput from '../../components/LabelInput/LabelInput'
import QueryActions from '../../components/QueryActions/QueryActions'
import { useNavigation } from '@react-navigation/native'
import BPText from '../../common/BPText/BPText'
import { Colors } from '../../styles'

const ChangePassword = () => {
    const navigation = useNavigation()
    return (
        <Container style={{ flex: 1, backgroundColor: Colors.primeBG }}>
            <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
            <Content contentContainerStyle={{ flexGrow: 1 }}>
            
                <View style={{flex:3,alignItems:'center', justifyContent: 'center',paddingTop:110}}>
                    <View style={{padding:28}}>
                        <Image source={require('../../assets/images/items/change_your_password_icon.png')} style={{width: 140, height:140}} resizeMode="contain" />
                    </View>
                    
                    <BPTitle title="Change Your Password" />
                    
                    <BPSubtitle text={`This will be your new password`} />
                </View>
                <View style={{flex:1,alignItems:'center', justifyContent: 'center', marginHorizontal:43}}>
                    
                   <LabelInput label="Password" secureTextEntry/>
                   <LabelInput label="Re-Enter Password" secureTextEntry/>
                  
                    <View style={{paddingTop:20}}>
                        <BPButton label="Change Password" onPress={()=> navigation.navigate("VerifyEmail")}/>
                    </View>

                    <View style={{paddingVertical:50}}>
                       <TouchableOpacity 
                       onPress={()=> navigation.popToTop()}
                       style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                           <Icon  type="FontAwesome" name="chevron-left" style={{color:'#fff', paddingHorizontal: 10, fontSize: 10}}/>
                           <BPText>Go Back</BPText>
                       </TouchableOpacity>
                    </View>
                </View>


            </Content>
        </Container>
    )
}

export default ChangePassword
