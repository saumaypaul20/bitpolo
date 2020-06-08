import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors, Images } from '../../../../theme'
import FilterFAB from '../../../../components/FilterFAB/FilterFAB'

const OrdersHistory = () => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton title="Order History"/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'flex-start', alignItems:'center',  marginHorizontal:20, marginTop:83}}>
                         
                    
                       <FilterFAB />
                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default OrdersHistory
