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
import { addMarketData, triggerSocket } from '../../../redux/actions/markets.action'
var pako = require('pako');
import * as ENDPOINT from '../../../api/constants'

const DATA = [
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
  
]

const ListItem = ({item}) =>{

   

    return(
        <View style={{ flexDirection:'row', alignItems:'flex-start',  paddingVertical:8}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'flex-start', paddingHorizontal:30}}>
                <BPText style={{color: Colors.white, fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>{item?.params[0].slice(0,3)} <BPText style={{color: Colors.lightWhite, fontSize:10, fontFamily:'Inter-Bold'}}>/ {item?.params[0].slice(3)}</BPText></BPText>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <BPText style={{color: Colors.lightWhite, fontFamily:'Inter-Regular', fontSize:12, }}>{parseFloat(item?.params[1]?.l).toFixed(2)}</BPText>
                </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end', paddingHorizontal:30}}>
                <BPText style={{color: Colors.lightWhite, fontFamily:'Inter-Medium' , fontSize:12}}>{parseFloat(item?.params[1]?.v).toFixed(4)}</BPText>
                </View>
        </View>
    )
}


const Tab = ({type}) =>{
    let market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
    console.log("tab makerketdata", market_data)
    // const [data, setdata] = useState([])
    //     useEffect(() => {
    //         if(type === 1 ){
    //             setdata(market_data.filter(i=> !i.params[1].cp.match('-')))
    //         }else{
    //             setdata(market_data.filter(i=> i.params[1].cp.match('-')))
    //         }
    //     }, [market_data])
    return (
        <FlatList
                data={type === 1 ? market_data.filter(i=> !i.params[1].cp.match('-')) : market_data.filter(i=> i.params[1].cp.match('-'))}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={item => item.id}
                // ListHeaderComponent={ <HomeHeaderComp />}
                stickyHeaderIndices={[0]}
                ListEmptyComponent={<View style={{flex:1, justifyContent:'flex-start', alignItems:'center', paddingTop:50}}><ActivityIndicator color={Colors.white} size="large" /></View>}
            />)
}


const Home = () => {
    const [socket, setSocket] = useState(null)
    const [activetab, settab] = useState(1)
    const dispatch = useDispatch();
    const navigation = useNavigation()
    let focus = navigation.isFocused()
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
                setSocket(io(ENDPOINT.WEBSOCKET, {
                    transports: ['websocket'],
                  }))
            }
        }catch(e){
        //  console.log(e)
        }
    },[])

    const startSocket= (marketPairs,socket) => {
        console.log("soceklt mareket_paors",marketPairs)
        // const reduxState = store.getState()
        dispatch(triggerSocket())
        socket.on("connect", function() {
             console.log("connected home")
            
            socket.emit("message", {"id": 2, "method" : "state.subscribe", "params" : marketPairs });
            socket.on("message", function(data) {
                const result = JSON.parse(pako.inflate(data, { to: "string" }));
                // console.log("count-socket",count2);
                // console.log("soclet00000",result);
                // console.log("id",id);
                
                result.id = Math.random().toString()
                // setData([result])
                if(result.params){

                    dispatch(addMarketData(result))
                }
            });
        })
    
        socket.on("disconnect", function(){
            console.log("socket disconnected");
        });
    }

    useEffect(() => {
        // getMarketPairs()
        callgetMarketList()
        
    }, [])

    useEffect(() => {
        console.log("foucs", focus)
        console.log("socketConnected", socketConnected)
        if(socket){
            if(focus && !socketConnected){
                startSocket(marketPairs, socket)
            } 
        }
        return () => {
            if(socket) socket.disconnect()
        }
    }, [socket,navigation,focus])



    return (
        <SafeAreaView style={{flex:1,backgroundColor: Colors.primeBG}}>
            <View style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                <Toolbar title="Exchange" backgroundColor={Colors.darkGray2}/>

                   <View style={{flex:1}}> 
                    <View style={{paddingVertical:8}}>
                    <HomeHeaderComp />

                    <View style={{ flexDirection:'row', alignItems:'flex-start',   borderTopWidth:1, borderBottomWidth:1,borderColor: Colors.lightWhite }}>
                        <TouchableOpacity onPress={()=> settab(1)} style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#fff', paddingVertical:8}}>
                            <BPText style={{color: Colors.white, fontFamily: activetab === 1 ? Fonts.FONT_MEDIUM :Fonts.FONT_REGULAR , fontSize:12}}>Gainers</BPText>
                           </TouchableOpacity>

                        <TouchableOpacity onPress={()=> settab(2)} style={{flex:1, justifyContent:'center', alignItems:'center', borderRightWidth:0.5, borderColor:'#fff', paddingVertical:8}}>
                            <BPText style={{color: Colors.white, fontFamily:activetab === 2? Fonts.FONT_MEDIUM: Fonts.FONT_REGULAR, fontSize:12, }}>Losers</BPText>
                             </TouchableOpacity>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                            <BPText style={{color: Colors.lightGreen, fontFamily:Fonts.FONT_MEDIUM , fontSize:12}}>24h Volume</BPText>
                            </View>
                    </View>

                    {activetab ===1 && <Tab type={1} />}
                    {activetab ===2 && <Tab type={2}  />}
                            
                    </View>
                        
                   </View>
               
            </View>
        </SafeAreaView>
    )
}

export default Home
