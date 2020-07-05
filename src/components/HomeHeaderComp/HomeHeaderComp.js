import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Colors, Fonts } from '../../theme'
import BPText from '../../common/BPText/BPText'
import { equalityFnMarket } from '../../utils/reduxChecker.utils'
import { useSelector } from 'react-redux'

const HomeHeaderComp = () => {
    let market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
    if(market_data.length > 3){
    return (
        <View style={{backgroundColor: Colors.primeBG}}>
            <View style={{ flexDirection:'row', alignItems:'flex-start', paddingVertical:20}}>
                     {market_data.slice(0,3).map((item, index)=>{
                        return(
                            <View key={item.id} style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                                <BPText style={{color: Colors.lightWhite, fontFamily: Fonts.FONT_BOLD, fontSize:10}}>{item.divider.a} / {item.divider.b}</BPText>
                                <BPText style={{color:'#fff', fontSize:23,}}>{parseFloat(item?.params[1]?.l).toFixed(2)}</BPText>
                                {/* <BPText style={{color:'#fff', fontSize:11, color:Colors.lightGreen}}>{item.params[1].cp.toFixed(2)}%</BPText> */}

                                <Text 
                                    style={{
                                        color: !item?.params[1]?.cp.match('-') ? Colors.lightGreen : Colors.red, 
                                        // fontFamily:'Inter-Medium', 
                                        fontSize:11, 
                                        // backgroundColor:!item?.params[1]?.cp.match('-')  ?Colors.lightGreen : Colors.red,
                                        // padding:5, borderRadius:3
                                    }}
                                        > {parseFloat(item?.params[1]?.cp === "Infinity" ? 0 : item?.params[1]?.cp ).toFixed(2)}%</Text>

                            </View>
                            )
                        })   
                        }
                        {/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <BPText style={{color: Colors.lightWhite, fontFamily: Fonts.FONT_BOLD, fontSize:10}}>BDX/USDT</BPText>
                            <BPText style={{color:'#fff', fontSize:23,}}>17.6043</BPText>
                            <BPText style={{color:'#fff', fontSize:11, color:Colors.lightGreen}}>-0.13%</BPText>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <BPText style={{color: Colors.lightWhite, fontFamily: Fonts.FONT_BOLD , fontSize:10}}>BDX/USDT</BPText>
                            <BPText style={{color:'#fff', fontSize:23,}}>17.6043</BPText>
                            <BPText style={{color:'#fff', fontSize:11, color:Colors.lightGreen}}>-0.13%</BPText>
                        </View> */}
                    </View>
                   
                    <View style={{ flexDirection:'row', alignItems:'flex-start', paddingVertical:10, backgroundColor: Colors.darkGray3 }}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <BPText style={{color: Colors.white, fontFamily:Fonts.FONT_MEDIUM , fontSize:12}}>Ranking List</BPText>
                           </View>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <BPText style={{color: Colors.lightWhite, fontFamily:Fonts.FONT_REGULAR, fontSize:12}}>BTC Market</BPText>
                             </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'flex-end', paddingRight:16}}>
                            <BPText style={{color: '#6796FF', fontFamily:Fonts.FONT_MEDIUM , fontSize:12}}>More</BPText>
                            </View>
                    </View>

                   
        </View>
    )}else{
        return <View style={{padding:20}}><ActivityIndicator color={Colors.white} size="large" /></View>
    }
}

export default HomeHeaderComp
