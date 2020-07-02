import React from 'react'
import { View, Text } from 'react-native'
import { Colors, Fonts } from '../../theme'
import BPText from '../../common/BPText/BPText'

const HomeHeaderComp = () => {
    return (
        <View style={{backgroundColor: Colors.primeBG}}>
            <View style={{ flexDirection:'row', alignItems:'flex-start', paddingVertical:20}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <BPText style={{color: Colors.lightWhite, fontFamily: Fonts.FONT_BOLD, fontSize:10}}>BDX/USDT</BPText>
                            <BPText style={{color:'#fff', fontSize:23,}}>17.6043</BPText>
                            <BPText style={{color:'#fff', fontSize:11, color:Colors.lightGreen}}>-0.13%</BPText>
                        </View>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <BPText style={{color: Colors.lightWhite, fontFamily: Fonts.FONT_BOLD, fontSize:10}}>BDX/USDT</BPText>
                            <BPText style={{color:'#fff', fontSize:23,}}>17.6043</BPText>
                            <BPText style={{color:'#fff', fontSize:11, color:Colors.lightGreen}}>-0.13%</BPText>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <BPText style={{color: Colors.lightWhite, fontFamily: Fonts.FONT_BOLD , fontSize:10}}>BDX/USDT</BPText>
                            <BPText style={{color:'#fff', fontSize:23,}}>17.6043</BPText>
                            <BPText style={{color:'#fff', fontSize:11, color:Colors.lightGreen}}>-0.13%</BPText>
                        </View>
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
    )
}

export default HomeHeaderComp
