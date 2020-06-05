import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { primaryColors } from '../../../../styles/colors'

const BankAccountDetails = () => {
    return (
        <SafeAreaView style={{flex:1, backgroundColor: primaryColors.primeBG}}> 
            <Toolbar enableBackButton title={"Bank Account Details"}/>
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>BAD</Text>
            </View>
        </SafeAreaView>
    )
}

export default BankAccountDetails
