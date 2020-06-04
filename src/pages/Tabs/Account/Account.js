import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Account = () => {
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <Text>Account</Text>
        </SafeAreaView>
    )
}
Account.navigationOptions = screenProps => ({
    title: 'Acc',
    tabBarVisible: false
})
export default Account
