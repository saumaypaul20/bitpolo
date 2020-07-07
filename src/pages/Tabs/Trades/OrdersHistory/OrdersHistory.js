import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Icon } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors, Images } from '../../../../theme'
import FilterFAB from '../../../../components/FilterFAB/FilterFAB'
import BPText from '../../../../common/BPText/BPText'
import BPDatePicker from '../../../../components/BPDatePicker/BPDatePicker'

const OrdersHistory = () => {
    let today = new Date()
    let [date1, setDate1] = useState(today);
    let [date2, setDate2] = useState(today);

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton title="Order History"/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{  justifyContent:'flex-start', alignItems:'stretch', backgroundColor: Colors.darkGray3, paddingHorizontal:20}}>
                       <View style={{flexDirection:'row', alignItems:'center', paddingVertical:12}}>
                            <View style={{flex:1, marginHorizontal:12}}>
                                <BPDatePicker label="Start" date={date1}  setDate={setDate1}  />
                            </View>
                            <View style={{flex:1, marginHorizontal:12}}>
                                <BPDatePicker label="End" date={date2}  setDate={setDate2} />
                            </View>
                             
                       </View>

                       <View style={{flexDirection:'row', padding:13}}>
                            <View style={{flex:1, justifyContent:'flex-start',}}>
                                <BPText style={{fontSize:12, color:Colors.lightWhite}}>Pair</BPText>
                            </View>

                           <View style={{flex:1, justifyContent:'space-between', flexDirection:'row'}}> 
                            <View style={{flex:1, justifyContent:'center',}}>
                                    <BPText style={{fontSize:12, color:Colors.lightWhite}}>Age/Price</BPText>
                                </View>
                                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                    <BPText style={{fontSize:12, color:Colors.lightWhite}}>Filled/Amount</BPText>
                                </View>
                           </View>
                       </View>

                      
                    
                    </View>


                    <View style={{flex:1, margin:16}}>
                                <View style={{justifyContent:'flex-start', alignItems:'flex-start', borderWidth:1, borderColor: Colors.lightWhite, padding:10, backgroundColor: Colors.darkGray3}}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch'}}>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <BPText>BTC / USDT</BPText>
                                            <Text style={{backgroundColor: Colors.lightGreen, color: Colors.white, marginHorizontal:5, paddingHorizontal:5, fontSize:10}}>BUY</Text>
                                            <BPText style={{fontSize:10, color:Colors.lightWhite}}>11.20.14 01-25-2020</BPText>
                                        </View>
                                        <View >
                                            <BPText style={{  color:Colors.lightWhite, borderColor: Colors.lightWhite, borderWidth:1, padding:5}}>CANCELLED</BPText>
                                        </View>
                                    </View>

                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginTop:10}}>
                                        <View style={{alignItems:'flex-start'}}>
                                            <BPText>0.0000 BTC</BPText>
                                            <BPText style={{fontSize:10, color:Colors.lightWhite}}>Price</BPText>
                                        </View>
                                        <View style={{alignItems:'flex-start'}}>
                                            <BPText>0.0000 USDT</BPText>
                                            <BPText style={{fontSize:10, color:Colors.lightWhite}}>Amount</BPText>
                                        </View>
                                       
                                    </View>

                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginTop:10}}>
                                        <View style={{alignItems:'flex-start'}}>
                                           
                                            <BPText style={{fontSize:8, color:Colors.lightWhite}}>Fee</BPText>
                                            <BPText style={{fontSize:8, color:Colors.lightWhite}}>Total</BPText>
                                        </View>
                                        <View style={{alignItems:'flex-start'}}>
                                            <BPText style={{fontSize:8}}>0.0000 USDT</BPText>
                                            <BPText style={{fontSize:8}}>0.0000 BTC</BPText>
                                        </View>
                                       
                                    </View>

                                </View>


                       </View>


                       <FilterFAB />
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default OrdersHistory
