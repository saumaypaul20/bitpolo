import React from 'react'
import {View, Dimensions, ActivityIndicator} from'react-native'
import  _ from 'lodash'
import WebView from 'react-native-webview'
import { connect } from 'react-redux'
import { Colors } from '../../theme'
const myHtmlFile = require("../../../android/app/src/main/assets/tchart.html");

 class TradeChart extends React.Component {
        constructor(props){
            super(props)
            this.update= false
        }

        UNSAFE_componentWillReceiveProps(){
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            // console.log(this.props.kline)
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            if (this.webview && this.props.kline.length>0) this.webview.postMessage(JSON.stringify(
                { 
                    update:this.update,
                    width: Dimensions.get("window").width,
                    klineData: this.props.kline.map(el=>{
                        return {
                            time: el.params[0],
                            low: el.params[4],
                            high: el.params[3],
                            open: el.params[1],
                            close: el.params[2],
                          }
                    })
        
        }));

        this.update= true
        }
 
     render() {
        if (this.webview) this.webview.postMessage(JSON.stringify(
            { 
                width: Dimensions.get("window").width,
                update: this.update
                
    
    }));
        return (
            <View style={{flex:1, height: 200, width:Dimensions.get("window").width,}}>
               {this.props.kline.length>0 ? <WebView 
                source={{uri:"file:///android_asset/tchart.html"}} 
                scrollEnabled={false} 
                originWhitelist={['*']}
                ref={r => this.webview = r}
                /> : <ActivityIndicator color={Colors.white} size="large" />}
            </View>
       )
     }
 }

 function mapStateToProps(state) {
    const { klineReducer } = state
    return { kline: klineReducer.kline }
  }
  
 
 export default connect(mapStateToProps,null)(TradeChart)
 