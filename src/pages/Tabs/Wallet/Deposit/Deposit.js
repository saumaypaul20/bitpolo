import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Button } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors } from '../../../../theme'
import { screenNames } from '../../../../Routes/screenNames/screenNames'
import BPText from '../../../../common/BPText/BPText'

const Deposit = () => {
    const rightEl = () => {
        return(
            <BPText style={{color: Colors.lightWhite, fontSize:15}}>History</BPText>
        )
    }
    return (
        <SafeAreaView style={{flex:1}}>
        <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title={screenNames.DEPOSIT} rightElement={rightEl()}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginTop:42}}>
                    
                    
                    
                 
                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}

export default Deposit
