import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'
import { MOBIKWIK_URL } from '../../../../../api/constants'

// const url = require('../../../../../web/payment.html')
const PaymentGateway = (props) => {
    // alert(JSON.stringify(props.route.params))
    const load = `
        window.alert("done");
        var form = document.createElement("form");
        
        form.method = "POST";
        form.action = "${MOBIKWIK_URL}";
        Object.keys(${JSON.stringify(props.route.params.paymentResult)}).forEach((key, value) => {
          var formElement = document.createElement("input");
          formElement.name = key;
          formElement.value = ${JSON.stringify(props.route.params.paymentResult)}[key];
          formElement.type = "hidden";
          form.appendChild(formElement);
        });
        document.body.appendChild(form);
        form.submit();
       
       
    `;
    return (
      
        <View style={{flex:1, paddingTop:50}}>

        <WebView   source={{ html: `<html><head></head><body></body></html>` }} javaScriptEnabled={true} injectedJavaScript={load} />
        </View>
       
    )
}

export default PaymentGateway
