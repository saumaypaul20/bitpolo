import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../../../theme'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import BPText from '../../../../../common/BPText/BPText'
import BPInput from '../../../../../common/BPInput/BPInput'
import BPButton from '../../../../../common/BPButton/BPButton'

const AntiSpoof = () => {
    const [code, setCode] = useState('')
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.SET_ANTI_SPOOF}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch', marginHorizontal:20, justifyContent:'space-between'}}>
                        <View>
                            <View style={{paddingTop:20}}>
                                <BPText style={{lineHeight:20}}>The Anti-Phishing Code you set will reflect in every response email that you receive from BitPolo.</BPText>
                            </View>

                            <BPInput placeholder="New Email Authenticity Code" text={code} setText={(t)=> setCode(t)}/>

                            <View style={{marginTop:16}}>
                                <BPText>Note:</BPText>
                                <BPText style={{opacity:0.7,  lineHeight:20, marginTop:8}}>Keep your passwords, 2FA codes and SMS codes confidential. Do not share them with anyone, including BitPolo support.</BPText>
                            </View>
                        </View>
                        
                        <View style={{marginBottom:40}}>
                            <BPButton label="Submit"/>
                        </View>

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default AntiSpoof
