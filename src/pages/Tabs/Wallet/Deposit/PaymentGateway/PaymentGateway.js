import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'

const url = require('../../../../../web/payment.html')
const PaymentGateway = () => {
    return (
        <View style={{flex:1}}>
             <WebView source={{html:  '<h1>Hello WebView</h1>'}}/>
        </View>
    )
}

export default PaymentGateway
