import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../../../theme'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import BPText from '../../../../../common/BPText/BPText'
import BPInput from '../../../../../common/BPInput/BPInput'
import BPButton from '../../../../../common/BPButton/BPButton'
import { useNavigation, StackActions } from '@react-navigation/native'

const TwoFactorAuthentication = () => {
    const navigation = useNavigation()
    const [code, setCode] = useState('')
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.TWO_FACTOR_AUTHENTICATION}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch', marginHorizontal:20, justifyContent:'space-between'}}>
                        <View>
                            <View style={{paddingTop:20}}>
                                <BPText style={{lineHeight:20, fontSize:18, marginBottom:8}}>Enter confirmation code</BPText>
                                <BPText style={{lineHeight:20, opacity:0.8}}>Please enter the confirmation code that you see on your authentication app.</BPText>
                            </View>

                            <BPInput placeholder="Enter the 6-digit code" text={code} setText={(t)=> setCode(t)}/>

                        </View>
                        
                        <View style={{marginBottom:40}}>
                            <BPButton label="Submit" onPress={()=>   navigation.dispatch(StackActions.pop(2))}/>
                        </View>

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default TwoFactorAuthentication
