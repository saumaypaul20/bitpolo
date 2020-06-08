import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors } from '../../../../theme'

const OrdersHistory = () => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton title="Orders History"/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',  marginHorizontal:48, marginTop:83}}>
                         
                    

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default OrdersHistory
