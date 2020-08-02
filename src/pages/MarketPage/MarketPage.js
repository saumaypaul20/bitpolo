import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Picker, Icon, CardItem, Form, Tabs, Tab, Left } from 'native-base'
import Toolbar from '../../components/Toolbar/Toolbar'
import { Colors, Images, Fonts } from '../../theme'
import PickerComp from '../../components/PickerComp/PickerComp'
// import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils'
import { emitDepthSubscribeEvent, emitDepthUnsubscribeEvent } from '../../api/config.ws'
// import TradesLeftCol from '../../../components/TradesLeftCol/TradesLeftCol'
// import TradesRightCol from '../../../components/TradesRightCol/TradesRightCol'
import { getMatchingMarketList } from '../../api/markets.api'
import { splitIt } from '../../utils/converters'
import { useDispatch, useSelector } from 'react-redux'
import { storeCurrencies, setActiveTradePair } from '../../redux/actions/markets.action'
import { addDepthSubs } from '../../redux/actions/depthSubs.action'
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../routes/screenNames/screenNames'
import { equalityFnMarket } from '../../utils/reduxChecker.utils'
import BPText from '../../common/BPText/BPText'
let id= 0
const MarketPage = () => {
    // console.log("trdes reloads---------------------------------------------", id);
    
    // id++

    const dispatch = useDispatch()
    const navigation= useNavigation()
    const currencies = useSelector(state=> state.marketReducer.currencies)
    const activeTradePair = useSelector(state=> state.marketReducer.activeTradePair)
    // const market_data = useSelector(state=> state.marketReducer.data.filter(i=> i.params[0] === activeTradePair), equalityFnMarket)
    // let found = market_data.find(i=> i.params[0] === activeTradePair)
    // // let user = useSelector(state=> state.authReducer.auth_attributes, shallowEqual);
    // console.log("market_data in trades",market_data)
    const [currencyVal, setCurrency] = useState(activeTradePair)
    const [Lcurrencies, setLcurrencies] = useState(currencies)
    const [loading, setloading]= useState(true)

    const callListMarket = async ()=>{
        let res = await getMatchingMarketList()
        if (res.status){
            let arr= res.data[1].map(i=>{
                let divider={}
                if(i.match("INR")){
                    divider= splitIt(i, "INR")
                }else if(i.match("USDT")){
                    divider= splitIt(i, "USDT")
                }
                let payload ={
                    label: `${divider.a} / ${divider.b}`,
                    value: i,
                    a: divider.a,
                    b: divider.b
                }
                return payload
            }
                )
                dispatch(storeCurrencies(arr))
                setLcurrencies(arr)
                
                dispatch(setActiveTradePair(arr[1].value))
            // setcurrencies(arr)
            
        }
    }

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         setloading(true)
    //         emitDepthSubscribeEvent(currencyVal, activeTradePair)
    //       });
      
    //       return unsubscribe;
    // }, [navigation])
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('blur', () => {
    //         setloading(false)
    //       //  dispatch(setActiveTradePair(null))
    //         //+setActiveTradePair(null)
    //         emitDepthUnsubscribeEvent(currencyVal)
    //       });
      
    //       return unsubscribe;
    // }, [navigation])

    useEffect(() => {
       // emitDepthSubscribeEvent()
       callListMarket()

       return ()=>{
        //    alert("trades unmounted")
        
 
           dispatch(setActiveTradePair(null))

           setloading(false)
       }
    }, [])

    useEffect(() => {
        console.log("statt e,mit")
      setTimeout(() => {
          if(!activeTradePair){return  }
         //emitDepthSubscribeEvent(currencyVal, activeTradePair)
      }, 2000);
     }, [activeTradePair])
 
    // const currencies = [{label: 'BTC/USDT', value:'key1'}];
    // if(currencies.length === 0){ return }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1, backgroundColor:Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            {/* <Toolbar backgroundColor={Colors.darkGray2} title={"Exchange"}/> */}
            {/* <Content contentContainerStyle={{ flexGrow: 1 }}>
                
            </Content> */}
            <FlatList data={['1']}
                nestedScrollEnabled
                style={{ width: '100%' }}
                keyExtractor={(data)=> data}
                
                ListHeaderComponent={<View style={styles.headerContainer}>
                                    
                <View style={{flex:0.5, borderRadius:4, alignSelf:'flex-start'}}>
                { !activeTradePair && Lcurrencies.length == 0 ?  <ActivityIndicator color={Colors.white}/> :
                    
                    <PickerComp
                        items={Lcurrencies}
                        pickerVal = {activeTradePair} 
                        setPickerVal = {(val)=>{
                            dispatch(addDepthSubs(null));
                            setCurrency(activeTradePair);
                            dispatch(setActiveTradePair(val))
                             
                        }}
                        chevronPositionTop= {3}
                    />
                }
                
                </View>

                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', flexDirection:'row', width:'100%'}}>
                    <TouchableOpacity style={{marginHorizontal:22}} onPress={()=> navigation.navigate(screenNames.MARKET_TRADES) }>
                        <Image source={Images.market_chart_icon} style={styles.headerIconStyles} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={Images.list_icon} style={styles.headerIconStyles} />
                    </TouchableOpacity>
                </View>
            </View>}
                renderItem={
                    ({item,index})=>{
                        return(
                            <View style={{  justifyContent:'flex-start', alignItems:'center', }}>
                
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginHorizontal:16, borderTopColor:Colors.lightWhite, borderTopWidth:0.5}}>

                                    <View style={{flexDirection:'row', flex:1, justifyContent:'space-around',paddingVertical:10,}}>
                                        <BPText style={{ color: Colors.lightWhite}}>Last Price</BPText>
                                        <BPText>90232.89 USDT</BPText>
                                    </View>
                                    <View style={{width:0.5, backgroundColor: Colors.lightWhite}}/>
                                    <View style={{flexDirection:'row', flex:1, justifyContent:'space-around',paddingVertical:10,}}>
                                        <BPText style={{ color: Colors.lightWhite}}>24H Change</BPText>
                                        <BPText>-1.864%</BPText>
                                    </View>

                                </View>


                                <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch',paddingVertical:10, marginHorizontal:16, backgroundColor: Colors.darkGray}}>

                                    <View style={{ flex:1, alignItems:'flex-start'}}>
                                        <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Highest</BPText>
                                        <BPText style={{fontSize:12}}>8011.96 USDT</BPText>
                                    </View>
                                    
                                    <View style={{ flex:1, alignItems:'center'}}>
                                        <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Lowest</BPText>
                                        <BPText style={{fontSize:12}}>7300 USDT</BPText>
                                    </View>
                                    <View style={{ flex:2,  alignItems:'flex-end'}}>
                                        <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Volume / Value</BPText>
                                        <BPText style={{fontSize:12}}>63.63 BTC / 466106.14 USDT</BPText>
                                    </View>

                                </View>
                                
                                <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', paddingHorizontal:16, backgroundColor: Colors.darkGray2}}>

                                    <View style={{ flex:1, alignItems:'center', borderBottomWidth:1, borderBottomColor: Colors.white, paddingVertical:12}}>
                                        <BPText style={{textTransform:'uppercase'}}>PRICE Chart</BPText>
                                    </View>
                                    
                                    <View style={{ flex:1, alignItems:'center', borderBottomWidth:1, borderBottomColor: Colors.white, paddingVertical:12}}>
                                       
                                        <BPText style={{textTransform:'uppercase'}}>Depth Chart</BPText>
                                    </View>
                                    <View style={{ flex:2,  alignItems:'flex-end'}}>
                                        <BPText>8</BPText>
                                    </View>

                                </View>
                                
                                
                                {/* ---------------------------------- */}

                            {/* {(Lcurrencies.length == 0 || !found || !loading) ?  
                                <ActivityIndicator color={Colors.white} size="large" style={{marginTop:50}}/>
                            :
                                <View style={{flex:1, flexDirection:'row', alignSelf:'stretch'}}>
                                    {activeTradePair && <TradesLeftCol />}
                                    {activeTradePair && <TradesRightCol /> }
                                </View>} */}

                                {/* {-----------------------------} */}
            

                            </View>
                        )
                    }
                }
                stickyHeaderIndices={[0]}
            />
        </Container>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    tabTextStyle:{ color:Colors.text.lightWhite },
    tabStyle:{ backgroundColor: Colors.darkGray3 },
    activeTabStyle:{ backgroundColor: Colors.darkGray3, borderBottomWidth:1, borderBottomColor:'#fff' },

    headerContainer:{ alignItems:'center', flexDirection:'row', justifyContent:'space-between', width:'100%', paddingVertical:10, backgroundColor: Colors.darkGray2, paddingHorizontal:16},
    headerIconStyles:{width:22, height:22}
})

export default MarketPage
