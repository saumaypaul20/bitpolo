import React from 'react'
import { View, Text } from 'react-native'
import { primaryColors } from '../../utils/colors'

const HomeHeaderComp = () => {
    return (
        <View style={{backgroundColor: primaryColors.primeBG}}>
            <View style={{ flexDirection:'row', alignItems:'flex-start', paddingVertical:20}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Bold' , fontSize:10}}>BDX/USDT</Text>
                            <Text style={{color:'#fff', fontSize:23,}}>17.6043</Text>
                            <Text style={{color:'#fff', fontSize:11, color:primaryColors.lightGreen}}>-0.13%</Text>
                        </View>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Bold', fontWeight:'bold', fontSize:10}}>BDX/USDT</Text>
                            <Text style={{color:'#fff', fontSize:23,}}>17.6043</Text>
                            <Text style={{color:'#fff', fontSize:11, color:primaryColors.lightGreen}}>-0.13%</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Bold' , fontWeight:'bold', fontSize:10}}>BDX/USDT</Text>
                            <Text style={{color:'#fff', fontSize:23,}}>17.6043</Text>
                            <Text style={{color:'#fff', fontSize:11, color:primaryColors.lightGreen}}>-0.13%</Text>
                        </View>
                    </View>
                   
                    <View style={{ flexDirection:'row', alignItems:'flex-start', paddingVertical:10, backgroundColor: primaryColors.darkGray3 }}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.white, fontFamily:'Inter-Medium' , fontSize:12}}>Ranking List</Text>
                           </View>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Regular', fontSize:12}}>BTC Market</Text>
                             </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'flex-end', paddingRight:16}}>
                            <Text style={{color: '#6796FF', fontFamily:'Inter-Medium' , fontSize:12}}>More</Text>
                            </View>
                    </View>

                    <View style={{ flexDirection:'row', alignItems:'flex-start',   borderTopWidth:1, borderBottomWidth:1,borderColor: primaryColors.lightWhite }}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#fff', paddingVertical:8}}>
                            <Text style={{color: primaryColors.white, fontFamily:'Inter-Medium' , fontSize:12}}>Gainers</Text>
                           </View>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#fff', paddingVertical:8}}>
                            <Text style={{color: primaryColors.white, fontFamily:'Inter-Regular', fontSize:12, }}>Losers</Text>
                             </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                            <Text style={{color: primaryColors.lightGreen, fontFamily:'Inter-Medium' , fontSize:12}}>24h Volume</Text>
                            </View>
                    </View>
        </View>
    )
}

export default HomeHeaderComp
