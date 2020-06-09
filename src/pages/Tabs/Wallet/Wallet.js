import React from 'react'
import { View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Content, Button, Container } from 'native-base'
import { Images, Colors, Fonts } from '../../../theme'
import BPText from '../../../common/BPText/BPText'

const Wallet = () => {
    return (
        <SafeAreaView style={{flex:1}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'flex-start'}}>
                        
                        <BPText style={{marginHorizontal:12, fontSize:12, paddingVertical:16}}>
                            Total Value (BTC) <BPText style={{fontFamily:Fonts.FONT_MEDIUM, fontSize:11,}}> 0 BTC</BPText> = $0.00
                        </BPText>

                        <View style={{
                            backgroundColor:  Colors.darkGray3,
                            padding:16
                        }}>

                            <BPText>Estimated value</BPText>
 
                            <BPText style={{fontFamily: Fonts.FONT_MEDIUM, letterSpacing: 1.89, fontSize:24}}>0.00000000 BTC </BPText>
                        </View>
                        
                    


                    

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Wallet
