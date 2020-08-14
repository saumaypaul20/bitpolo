import React from 'react'
import { View, Text } from 'react-native'
import WebView from 'react-native-webview'
import { MOBIKWIK_URL } from '../../../../../api/constants'

// const url = require('../../../../../web/payment.html')

const load=(MOBIKWIK_URL, props) =>{ return  `
        
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
       true
       
       
    `;}

class PaymentGateway extends React.Component{
    // alert(JSON.stringify(props.route.params))
    constructor(props){
        super(props)
       // alert(JSON.stringify(this.props))
    }
    // UNSAFE_componentWillReceiveProps(){
    //     if (this.webview){ 
    //         //alert("yo")
    //         this.webview.postMessage(JSON.stringify(
    //         { 
    //             url:MOBIKWIK_URL,
    //             result: this.props.route.params.paymentResult
    
    //         }
    //         ));
    //     }
    // }

    // componentDidMount(){
        
    // }
    render(){
        if (this.webview) this.webview.postMessage(JSON.stringify({  
                url:MOBIKWIK_URL,
                result: this.props.route.params.paymentResult 
            }));
        
        return (
            <View style={{flex:1, paddingTop:50}}>

                <WebView  
                    source={{uri:"file:///android_asset/payment.html"}}  
                    originWhitelist={['*']}
                    ref={r => this.webview = r}
                    injectedJavaScript={load(MOBIKWIK_URL, this.props)} 
                 />
        </View>
       )
    }
}

export default PaymentGateway
