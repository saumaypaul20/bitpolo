import React from 'react'
import { View, Text } from 'react-native'

const Account = () => {
    return (
        <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <Text>Account</Text>
        </View>
    )
}
Account.navigationOptions = screenProps => ({
    title: 'Acc',
    tabBarVisible: false
})
export default Account
