import React from 'react'
import { View, Text,  } from 'react-native'
import { primaryColors } from '../../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../common/Toolbar/Toolbar'
import { Container, Content } from 'native-base'

const Home = () => {
    return (
        <SafeAreaView style={{flex:1,}}>
            <Container style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
                <Toolbar title="Exchange" backgroundColor={primaryColors.darkGray2}/>

                <Content contentContainerStyle={{ flexGrow: 1 }}>
                   <View style={{flex:1}}>
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
                    <Text style={{color: primaryColors.white}}>Home</Text>
                   </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Home
