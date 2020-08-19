import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../components/Toolbar/Toolbar'
import HomeHeaderComp from '../../../components/HomeHeaderComp/HomeHeaderComp'
import BPText from '../../../common/BPText/BPText'
import { Colors, Fonts } from '../../../theme'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { equalityFnMarket } from '../../../utils/reduxChecker.utils'
import { useNavigation } from '@react-navigation/native'
import { getMarketList } from '../../../api/users.api'
import io from 'socket.io-client';
import { addMarketData, triggerMarketSocket, setActiveTradePair } from '../../../redux/actions/markets.action'
var pako = require('pako');
import * as ENDPOINT from '../../../api/constants'
import { splitIt } from '../../../utils/converters'
import { emitMarketListEvent, emitUnsubMarketListEvent } from '../../../api/config.ws'
import { screenNames } from '../../../routes/screenNames/screenNames'

 
const ListItem = ({item, type, index}) =>{
    const dispatch = useDispatch()
    const navigation = useNavigation()
    let bool = index%2===0 ? true : false;
    return(
        <TouchableOpacity onPress={()=>{
            dispatch(setActiveTradePair(item.params[0]))
            navigation.navigate(screenNames.TRADES)
        }}>

        
        <View style={{ flexDirection:'row', alignItems:'flex-start',  paddingVertical:8,  backgroundColor: bool ? Colors.primeBG: Colors.darkGray2}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'flex-start', paddingHorizontal:30}}>
                <BPText style={{color: Colors.white, fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>{item?.divider.a} <BPText style={{color: Colors.lightWhite, fontSize:10, fontFamily:'Inter-Bold'}}>/ {item?.divider.b}</BPText></BPText>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'flex-start',}}>
                <BPText style={{color: type === 1? Colors.lightGreen: Colors.red, fontFamily:'Inter-Regular', fontSize:12, }}>{parseFloat(item?.params[1]?.l).toFixed(2)}</BPText>
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end', paddingHorizontal:30}}>
                <BPText style={{color: Colors.lightWhite, fontFamily:'Inter-Medium' , fontSize:12}}>{parseFloat(item?.params[1]?.v).toFixed(4)}</BPText>
                </View>
        </View>
        </TouchableOpacity>
    )
}


const Tab = ({type}) =>{
    let market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
    console.log("tab makerketdata", market_data)
    console.log("tab type", type)
    const [data, setdata] = useState([])
        useEffect(() => {
            if(type === 1 ){
                setdata(market_data.filter(i=> !i.params[1].cp.match('-')))
            }else{
                setdata(market_data.filter(i=> i.params[1].cp.match('-')))
            }
        }, [market_data,type])
    return (
        data.length>0 ? <FlatList
                data={data}
                renderItem={({ item,index }) => <ListItem item={item} type={type} index={index} />}
                keyExtractor={item => item.id}
                initialNumToRender={7}
                getItemLayout={(data, index) => {
                    return {
                        index,
                        length: 30, // itemHeight is a placeholder for your amount
                        offset: index * 30,
                        width:'100%'
                    }
                }}
                // ListHeaderComponent={ <HomeHeaderComp />}
                // stickyHeaderIndices={[0]}
                //ListEmptyComponent={<View style={{flex:1, justifyContent:'flex-start', alignItems:'center', paddingTop:50}}><ActivityIndicator color={Colors.white} size="large" /></View>}
            />:
            <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', paddingTop:50}}><ActivityIndicator color={Colors.white} size="large" /></View>
            )
}


const Home = () => {
    const [socket, setSocket] = useState(null)
    const [activetab, settab] = useState(1)
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [loading, setloading] = useState(true)
    // let focus = navigation.isFocused()
    const user = useSelector(state=> state.authReducer.auth_attributes);
    const socketConnected = useSelector(state=> state.marketReducer.socketConnected, shallowEqual)
    const [marketPairs, setmarketPairs] = useState([])
    // let market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)

    const callgetMarketList = useCallback(async () =>{
        try{ 
            let attr = {
                Authorization: user?.attributes?.token,
                info: user?.attributes?.info,
            }
            let res = await getMarketList(attr)
            console.log("getmarkets",res)

            if(res.status){
                let arr = res.data.data.attributes.filter((i,index) =>{ 
                    if( i.market_pair === "INR" || i.market_pair === "USDT"){
                        return i
                    }
                })
                let final = arr.map(i=>i.market_name)
                setmarketPairs(final)
                setSocket(true)
            }
        }catch(e){
        //  console.log(e)
        }
    },[])

    // const startSocket= (marketPairs,socket) => {
    //     console.log("soceklt mareket_paors",marketPairs)
    //     // const reduxState = store.getState()
    //     dispatch(triggerMarketSocket())
    //     socket.on("connect", function() {
    //          console.log("connected home")
            
    //         socket.emit("message", {"id": 1, "method" : "state.subscribe", "params" : marketPairs });
    //         socket.on("message", function(data) {
    //             const result = JSON.parse(pako.inflate(data, { to: "string" }));
    //             // console.log("count-socket",count2);
    //             // console.log("soclet00000",result);
    //             // console.log("id",id);
                
    //             result.id = Math.random().toString()
    //             // setData([result])
    //             if(result.params){
    //                 let pair = result.params[0]
    //                 if(pair.match("INR")){
    //                     result.divider= splitIt(result.params[0], "INR")
    //                 }else if(pair.match("USDT")){
    //                     result.divider= splitIt(result.params[0], "USDT")
    //                 }
    //                 dispatch(addMarketData(result))
    //             }
    //         });
    //     })
    
    //     socket.on("disconnect", function(){
    //         console.log("socket disconnected");
    //     });
    // }

    useEffect(() => {
        // getMarketPairs()
        if(!socketConnected){
            callgetMarketList()
          }
    }, [])

    useEffect(() => {
    console.log("socketConnected", socketConnected)
    // console.log("foucs", focus)
        if(socket){
            if(!socketConnected){
                emitMarketListEvent(marketPairs)
            } 
        }
        // return () => {
        //     if(socket) socket.disconnect()
        // }
    }, [socket,navigation])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setloading(false)
          });
      
          return unsubscribe;
    }, [navigation])

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setloading(true)
            emitUnsubMarketListEvent(marketPairs)
          });
      
          return unsubscribe;
    }, [navigation])


    return (
        <SafeAreaView style={{flex:1,backgroundColor: Colors.primeBG}}>
            <View style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                <Toolbar title="Exchange" backgroundColor={Colors.darkGray2}/>

                   <View style={{flex:1}}>
                    {<View style={{paddingVertical:8}}>
                    <HomeHeaderComp />

                    <View style={{ flexDirection:'row', alignItems:'flex-start',   borderTopWidth:1, borderBottomWidth:1,borderColor: Colors.lightWhite }}>
                        <TouchableOpacity onPress={()=> requestAnimationFrame(() => {
    settab(1)
  })} style={{flex:1 ,backgroundColor: activetab === 1? Colors.darkGray : 'transparent',justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#fff', paddingVertical:8}}>
                            <BPText style={{color: Colors.white, fontFamily: activetab === 1 ? Fonts.FONT_MEDIUM :Fonts.FONT_REGULAR , fontSize:12,}}>Gainers</BPText>
                           </TouchableOpacity>

                        <TouchableOpacity onPress={()=>requestAnimationFrame(() => {
    settab(2)
  })} style={{flex:1 ,backgroundColor: activetab === 2? Colors.darkGray : 'transparent', justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#fff', paddingVertical:8}}>
                            <BPText style={{color: Colors.white, fontFamily:activetab === 2? Fonts.FONT_MEDIUM: Fonts.FONT_REGULAR, fontSize:12}}>Losers</BPText>
                             </TouchableOpacity>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                            <BPText style={{color: Colors.lightGreen, fontFamily:Fonts.FONT_MEDIUM , fontSize:12}}>24h Volume</BPText>
                            </View>
                    </View>

                        {activetab ===1 ? <Tab type={1} /> : <Tab type={2} />}
                            
                    </View>}
                        
                   </View>
               
            </View>
        </SafeAreaView>
    )
}

export default Home
