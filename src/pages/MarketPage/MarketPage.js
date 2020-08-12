import React, { useState, useEffect, useCallback } from 'react'
import { View, Image, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container } from 'native-base'
import { Colors, Images } from '../../theme'
import PickerComp from '../../components/PickerComp/PickerComp'
// import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils'
import { emitDepthSubscribeEvent, emitDepthUnsubscribeEvent, emitKlineSubscribeEvent, emitKlineUnsubscribeEvent } from '../../api/config.ws'
// import TradesLeftCol from '../../../components/TradesLeftCol/TradesLeftCol'
// import TradesRightCol from '../../../components/TradesRightCol/TradesRightCol'
import { getMatchingMarketList } from '../../api/markets.api'
import { splitIt } from '../../utils/converters'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { storeCurrencies, setActiveTradePair } from '../../redux/actions/markets.action'
import { addDepthSubs } from '../../redux/actions/depthSubs.action'
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../routes/screenNames/screenNames'
import BPText from '../../common/BPText/BPText'
import TradeChart from '../../components/AreaChart/TradeChart'
import MarketBottom from '../../components/MarketBottom/MarketBottom'
import { addKlineData, emptyKlineData } from '../../redux/actions/kline.actions'
import { equalityFnIndexPrice, equalityFnMarket } from '../../utils/reduxChecker.utils'
import DepthChart from '../../components/AreaChart/DepthChart'



const HeaderComp = () =>{
    let index_price = useSelector(state => state.marketReducer.index_price, equalityFnIndexPrice)
    const activeTradePair = useSelector(state=> state.marketReducer.activeTradePair, shallowEqual)
    const market_data = useSelector(state=> state.marketReducer.data.filter(i=> i.params[0] === activeTradePair), equalityFnMarket)
    let found = market_data.find(i=> i.params[0] === activeTradePair)
    const activecurrency = useSelector(state => state.marketReducer.currencies.find(i => i.value === activeTradePair), shallowEqual)

    const currentMarketPrice =   useCallback(
        () => {
            //let found = market_data
            //console.log("ABCD#####", found)
            if (found && index_price) {
                return <BPText style={{ color: parseFloat(found.params[1].cp) > -1 ? Colors.lightGreen : Colors.red, padding: 5 }}>
                    {`${found?.divider.b === "USDT" ? (parseFloat(found?.params[1]?.l) * index_price.find(i => i.asset === "USDT").amount).toFixed(2) : (parseFloat(found?.params[1]?.l) / index_price.find(i => i.asset === "USDT").amount).toFixed(2)}`}</BPText>
            }
        },
        [found],
    )

    return(
         found && activecurrency ?
        <>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginHorizontal:16, borderTopColor:Colors.lightWhite, borderTopWidth:0.5}}>

            <View style={{flexDirection:'row', flex:1, justifyContent:'space-around',paddingVertical:10,}}>
                <BPText style={{ color: Colors.lightWhite}}>Last Price</BPText>
                <BPText>{found?.params[1].l} {`${activecurrency?.b}`}</BPText>
            </View>
            <View style={{width:0.5, backgroundColor: Colors.lightWhite}}/>
            <View style={{flexDirection:'row', flex:1, justifyContent:'space-around',paddingVertical:10,}}>
                <BPText style={{ color: Colors.lightWhite}}>24H Change</BPText>
                <BPText>{found && parseFloat(found?.params[1].cp).toFixed(3)}%</BPText>
            </View>

        </View>


        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch',paddingVertical:10, marginHorizontal:16, backgroundColor: Colors.darkGray}}>

            <View style={{ flex:1, alignItems:'flex-start'}}>
                <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Highest</BPText>
                <BPText style={{fontSize:12}}>{parseFloat(found?.params[1].h).toFixed(3)} {`${activecurrency?.b}`}</BPText>
            </View>
            
            <View style={{ flex:1, alignItems:'center'}}>
                <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Lowest</BPText>
                <BPText style={{fontSize:12}}>{parseFloat(found?.params[1].lo).toFixed(3)} {`${activecurrency?.b}`}</BPText>
            </View>
            <View style={{ flex:2,  alignItems:'flex-end'}}>
                <BPText style={{ color: Colors.lightWhite, fontSize:12}}>24H Volume / Value</BPText>
                <BPText style={{fontSize:12}}>{parseFloat(found?.params[1].v).toFixed(3)} {`${activecurrency?.a}`} / {currentMarketPrice()} {`${activecurrency?.b}`}</BPText>
            </View>

        </View>
        </>
        : <ActivityIndicator color={Colors.white} size="large" />
    
    )
}
const MarketPage = () => {
    // console.log("trdes reloads---------------------------------------------", id);
    
    // id++
    // let index_price = useSelector(state => state.marketReducer.index_price, equalityFnIndexPrice)
    const dispatch = useDispatch()
    const navigation= useNavigation()
  
    const currencies = useSelector(state=> state.marketReducer.currencies, (l,r)=> l.payload === r.payload )
    const activeTradePair = useSelector(state=> state.marketReducer.activeTradePair, shallowEqual)
    // const market_data = useSelector(state=> state.marketReducer.data.filter(i=> i.params[0] === activeTradePair), equalityFnMarket)
    // let found = market_data.find(i=> i.params[0] === activeTradePair)
     

     
    // // let user = useSelector(state=> state.authReducer.auth_attributes, shallowEqual);
    // console.log("market_data in trades",market_data)
    const [currencyVal, setCurrency] = useState(activeTradePair)
    const [Lcurrencies, setLcurrencies] = useState(currencies)
    const [loading, setloading]= useState(true)
    const [view, setview]= useState(1)

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
                setloading(false)
            // setcurrencies(arr)
            
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if(activeTradePair){setloading(false)
            setTimeout(() => {
                //emitDepthSubscribeEvent(currencyVal, activeTradePair)
            }, 1000);
            emitKlineSubscribeEvent(activeTradePair, currencyVal)}
          });
      
          return unsubscribe;
    }, [navigation])
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setloading(true)
          //  dispatch(setActiveTradePair(null))
            //setActiveTradePair(null)
            setTimeout(() => {
                
                //emitDepthUnsubscribeEvent(currencyVal)
            }, 1000);
            emitKlineUnsubscribeEvent(currencyVal,60)
          });
      
          return unsubscribe;
    }, [navigation])

    useEffect(() => {
       //emitKlineSubscribeEvent()
       if(!activeTradePair){

           callListMarket()
        }

       return ()=>{
        //    alert("trades unmounted")
        
            emitKlineUnsubscribeEvent(currencyVal)
           //dispatch(setActiveTradePair(null))

           setloading(false)
       }
    }, [])

    useEffect(() => {
        console.log("statt e,mit")
      setTimeout(() => {
          if(!activeTradePair){return  }
          setTimeout(() => {
            //emitDepthSubscribeEvent(currencyVal, activeTradePair)
            setloading(false)
        }, 1000);
          emitKlineSubscribeEvent(activeTradePair, currencyVal)

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
                            setloading(true)
                            //dispatch(addDepthSubs(null));
                            setCurrency(activeTradePair);
                            dispatch(setActiveTradePair(val))
                            dispatch(emptyKlineData())
                            emptyKlineData()
                            setTimeout(() => {
                                setloading(false)
                            }, 1000);
                        }}
                        chevronPositionTop= {3}
                    />
                }
                
                </View>

                <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', flexDirection:'row', width:'100%'}}>
                    <TouchableOpacity style={{marginHorizontal:22}} >
                        <Image source={Images.market_chart_icon} style={styles.headerIconStyles} />
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <Image source={Images.list_icon} style={styles.headerIconStyles} />
                    </TouchableOpacity>
                </View>
            </View>}
                renderItem={
                    ()=>{
                        return(
                            <View style={{  justifyContent:'flex-start', alignItems:'center', }}>
                                
                                <HeaderComp />

                                <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', paddingHorizontal:16, backgroundColor: Colors.darkGray2}}>

                                 

                                    <Tab label={"PRICE Chart"} onPress={()=> setview(1)} active={view === 1}/>
                                    <Tab label={"Depth Chart"} onPress={()=> setview(2)} active={view === 2}/>
                                     
                                    <View style={{ flex:2,  alignItems:'flex-end', paddingVertical:12}}>
                                        <BPText>X</BPText>
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
            
                                <View style={{height:400}}>
                                    {!loading && activeTradePair ? 
                                    view === 1 ? <TradeChart /> : <View style={{width: Dimensions.get("window").width}}><DepthChart height={400}/></View>
                                    : <ActivityIndicator color={Colors.white} size="large"/>}
                                </View>
                                <View style={{alignSelf:"stretch", flex:1}}>
                                    {!loading && activeTradePair&& <MarketBottom/>}
                                </View>
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


const Tab = ({label, onPress, active})=>{
    return (
        <TouchableOpacity onPress={()=> onPress()} style={{ flex:1, alignItems:'center', borderBottomWidth:1, borderBottomColor: active ?Colors.white: 'transparent', paddingVertical:12}}>
            <BPText style={{textTransform:'uppercase'}}>{label}</BPText>
        </TouchableOpacity>
    )
}