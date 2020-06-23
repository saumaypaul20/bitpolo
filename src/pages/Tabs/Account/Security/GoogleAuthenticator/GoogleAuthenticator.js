import React from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import { Colors, Fonts, Images } from '../../../../../theme'
import BPText from '../../../../../common/BPText/BPText'
import BPButton from '../../../../../common/BPButton/BPButton'
import { useNavigation } from '@react-navigation/native'

const GoogleAuthenticator = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.GOOGLE_AUTHENTICATOR}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch', marginHorizontal:20, justifyContent:'space-between'}}>
                         
                           <View>
                            <View style={{alignItems:'center', marginTop:130}}>
                                    <BPText style={{fontSize:16}}>Download and install</BPText>
                                    <BPText style={{fontSize: 22, marginTop:8}}>Google Authenticator</BPText>
                                </View>

                                <View style={{backgroundColor: Colors.darkGray2, height:182, width:182, borderRadius:91, justifyContent:'center', alignItems:'center',alignSelf:'center', marginVertical:32}}> 
                                    <Image source={Images.google_authenticator_icon} style={{height:170}} resizeMode="contain"/>
                                </View>


                                <View style={{ marginHorizontal:41, alignItems:'center',}}>
                                    
                                    <BPText style={{fontFamily: Fonts.FONT_MEDIUM, textAlign:'center', lineHeight:23}}>To enable Two-factor authentication, you need to download and install google Authenticator application on your phone.</BPText>
                                </View>
                        
                           </View>
                        
                        <View style={{marginBottom:40}}>
                            <BPButton label="Next" onPress={()=> navigation.navigate(screenNames.TWO_FACTOR_AUTHENTICATION)}/>
                        </View>

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default GoogleAuthenticator
