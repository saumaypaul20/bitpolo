import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Icon } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors, Images } from '../../../../theme'
import FilterFAB from '../../../../components/FilterFAB/FilterFAB'
import BPText from '../../../../common/BPText/BPText'

const ListItem =({type}) =>{
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', paddingHorizontal:16, borderBottomColor: Colors.gray, borderBottomWidth:1, paddingVertical:16}}>
            <View style={{ flex:1, alignItems:'flex-start'}}>
                <BPText>BTC / USDT</BPText>
                
            </View>
            
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <BPText style={{color: type=== 1? Colors.lightGreen: Colors.red}}>0.22232323</BPText>
            </View>
            
            <View style={{flex:1, alignItems:'flex-end'}}>
                <BPText>67</BPText>
            </View>
        </View>
    )
}

const MarketTrades = () => {
    let today = new Date()
    let [date1, setDate1] = useState(today);
    let [date2, setDate2] = useState(today);

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton title="MArket TRADEs"/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{  justifyContent:'flex-start', alignItems:'stretch', backgroundColor: Colors.darkGray3, paddingHorizontal:20}}>
                      

                       <View style={{flexDirection:'row', padding:13}}>
                            <View style={{flex:1, justifyContent:'flex-start',}}>
                                <BPText style={{fontSize:12, color:Colors.lightWhite}}>Time</BPText>
                            </View>

                         
                            <View style={{flex:1, alignItems:'center'}}>
                                    <BPText style={{fontSize:12, color:Colors.lightWhite}}>Price</BPText>
                                </View>
                                <View style={{flex:1, alignItems:'flex-end'}}>
                                    <BPText style={{fontSize:12, color:Colors.lightWhite}}>Amount</BPText>
                                </View>
                          
                       </View>

                      
                    
                    </View>


                    <View style={{flex:1,marginTop:16}}>
                               
                                    <ListItem type={1}/>
                                    <ListItem type={2}/>
                                    <ListItem type={2}/>
                                    <ListItem type={1}/>
                                    <ListItem type={2}/>

                                </View>


                     


                       <FilterFAB />
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default MarketTrades
