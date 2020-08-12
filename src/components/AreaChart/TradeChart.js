import React from 'react'
import {View, Dimensions, ActivityIndicator} from'react-native'
import  _ from 'lodash'
import WebView from 'react-native-webview'
import { connect } from 'react-redux'
import { Colors } from '../../theme'
import { updateKlineBool } from '../../redux/actions/kline.actions'
// const myHtmlFile = require("../../../android/app/src/main/assets/tchart.html");

 class TradeChart extends React.Component {
        constructor(props){
            super(props)
           // this.update= false
           this.width= Dimensions.get("window").width
           this.getdata= this.getdata.bind(this)
        }

        getdata= ()=>{
            let arr = this.props.klineQ
            if(this.props.kline.length>0){
                arr = this.props.kline
                this.props.updateKlineBool(true)
                 
            }
            if (this.webview) this.webview.postMessage(JSON.stringify(
                { 
                    update: this.props.kline.length > 0,
                    width: Dimensions.get("window").width,
                    klineData: arr.map(el=>{
                        return {
                            time: el.params[0].length>10 ? Math.floor(new Date(el.params[0])/1000): el.params[0],
                            low: el.params[4],
                            high: el.params[3],
                            open: el.params[1],
                            close: el.params[2],
                          }
                    })
        
        }));
        }
        UNSAFE_componentWillReceiveProps(){
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
            // console.log(this.props.kline)
            // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                this.getdata()
            

     //  this.update= true
        }

        componentDidMount(){
            this.getdata()
        }
       
     render() {
    //     if (this.webview) this.webview.postMessage(JSON.stringify(
    //         { 
    //             width: Dimensions.get("window").width,
    //             update: this.props.update
                
    
    // }));

        
        return (
            <View style={{flex:1, height: 200, width: this.width,}}>
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
    return { kline: klineReducer.kline, klineQ: klineReducer.klineQ }
  }
  
 
 export default connect(mapStateToProps, {updateKlineBool})(TradeChart)
 