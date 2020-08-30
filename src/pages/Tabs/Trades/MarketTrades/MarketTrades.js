import React, { useState, useEffect } from 'react'
import { View, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Icon } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors, Images } from '../../../../theme'
import FilterFAB from '../../../../components/FilterFAB/FilterFAB'
import BPText from '../../../../common/BPText/BPText'
import { useSelector, shallowEqual } from 'react-redux'
import { emitMarketDealsEvent } from '../../../../api/config.ws'
import { equalityFnMarket, equalityFnDepths } from '../../../../utils/reduxChecker.utils'
import _ from 'lodash'
import { convertDate, convertTime } from '../../../../utils/converters'

const ListItem =({item,type}) =>{
    console.log("liostitem deals",item)
    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', paddingHorizontal:32, borderBottomColor: Colors.gray, borderBottomWidth:1, paddingVertical:16}}>
            <View style={{ flex:1, alignItems:'flex-start'}}>
                <BPText>{convertTime(item.t)}</BPText>
                
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

const renderItem = ({item})=>( <ListItem item={item.params[1][0]} type={item.params[1][0].s === "buy" ? 2 : 1} />)

const MarketTrades = () => {
    const [nowpair, setnowpair] = useState(null)
    const activeTradePair = useSelector(state=> state.marketReducer.activeTradePair, shallowEqual)
    const deals = useSelector(state=> state.dealsReducer.deals, equalityFnDepths)

    useEffect(()=>{
        if(activeTradePair){
           
            emitMarketDealsEvent(activeTradePair, nowpair)
            setnowpair(activeTradePair)
        }
    },[])

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton title="Market Trades"/>
                <View style={{ flex: 1 }}>
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
                                {deals?.length>0 && 
                                <FlatList
                                data={_.orderBy(deals, function(e){return e.params[1][0].t}, ['desc'])}
                                renderItem={renderItem}
                                //Setting the number of column
                                
                                keyExtractor={(item, index) => index.toString()}
                                />}
                                    {/* <ListItem type={1}/>
                                    <ListItem type={2}/>
                                    <ListItem type={2}/>
                                    <ListItem type={1}/>
                                    <ListItem type={2}/> */}

                                </View>
 
                </View>
            </Container>
        </SafeAreaView>
    )
}

export default MarketTrades
