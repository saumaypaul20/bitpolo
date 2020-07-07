import React, { useEffect, useState, useCallback, useRef } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator,  } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors, Images } from '../../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Container, Content, Icon, Tab, Tabs } from 'native-base'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addMarketData, modifyFavs, triggerMarketSocket } from '../../../redux/actions/markets.action';
import io from 'socket.io-client';
import * as ENDPOINT from '../../../api/constants'
import { getMarketList, getMarketByPair } from '../../../api/users.api';
import store from '../../../redux/store';
import _ from 'lodash'
import BPText from '../../../common/BPText/BPText';
import { useNavigation } from '@react-navigation/native';
import ListEmpty from '../../../components/ListEmpty/ListEmpty';
import { splitIt } from '../../../utils/converters';
import { equalityFnMarket } from '../../../utils/reduxChecker.utils';
import { emitMarketListEvent } from '../../../api/config.ws';
import { getAuthToken, getInfoAuthToken } from '../../../utils/apiHeaders.utils';
// var io = require("socket.io-client/dist/socket.io");
var pako = require('pako');
let id = 1;
let count = 0
let count2 = 0
let count3 = 0
let eq = 0


    // const  equalityFnMarket = (l,r) =>{
    //    // console.log("inside eqFn",l,r);
    //     eq++
    //     //console.log("eq called", eq)
    //     let change = false
    //     if(r.length > 0){
            

    //          for(let i=0; i <l.length ;i++){
    //             let found = r.findIndex(rItem=> rItem.params[0]=== l[i].params[0])
    //             if(found > -1){
    //                 change =  (_.isEqual(l[i].params[1], r[found].params[1]))
    //                 if(!change){
    //                     break;
    //                 }
    //             }
    //          }
    //     }

    //     console.log("CHANG--------",change);
        
    //     return change
    //     // console.log("market_data _lodash", _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method'])))).length); 
    //     // console.log("market_data _lodash cond", _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method'])))).length === 0); 
    //     // console.log("market_data _lodash  res", _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method']))))); 
    //     // return _.differenceWith(l, r, (a, b) => _.isEqual(_.omit(a, ['id','method'], _.omit(b,['id','method'])))).length === 0 ? true : false
      
       
    // }

    const INRView = ()=>{
        const navigation = useNavigation()
        // let focus = navigation.isFocused()
        console.log("INRView reloads", count)
        count++
        let market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
        
        market_data = market_data.filter(i=> i.params[0].endsWith("INR"))

        // console.log("market_data",market_data)
        
        const favourites = []

        useEffect(() => {
            // console.log("INRView mounts", count)
            count++
          }, [])
        const onStarClicked = useCallback((item,favourites) =>{
            if(favourites.find(i => i.id == item.id)){
                    onDeleteClick(item, favourites)
                }else{
                    let newData =market_data.map(i=>{
                        if(i.id == item.id){
                            i.isFavourite = true;
                            return i
                        }else{
                            return i
                        }
                    })
                    store.dispatch(modifyFavs(newData))
                }
            },[favourites])


        return(
            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                <SwipeListView
                        useFlatList={true}
                        data={market_data}
                        renderItem={ (rowData, rowMap) => {
                        //  console.log("bdx",rowData)
                            
                            return(
                        // listItem(rowData.item, rowData.index)
                        <ListItem item={rowData.item} index={rowData.index} />

                        )
                    }}
                        renderHiddenItem={ (rowData, rowMap) => (
                            <View style={{right:0, position:'absolute', top:0, bottom:0, backgroundColor:Colors.darkGray, flex:1, justifyContent:'center', alignItems:'center',width:64}}>
                                <TouchableOpacity onPress={ () =>{ onStarClicked(rowData.item, favourites);setTimeout(() => {
                                    
                                    rowMap[rowData.item.id]?.closeRow();
                                }, 1000); } }>
                                {isFavourite(rowData.item, favourites)}
                                </TouchableOpacity>
                            </View>
                        )}
                    
                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                rowMap[rowKey]?.closeRow()
                            }, 1000)
                        }}
                        rightOpenValue={-64}
                        disableRightSwipe
                        stopRightSwipe={-64}
                        ListHeaderComponent={ homeHeaderComp()}
                        stickyHeaderIndices={[0]}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{flexGrow:1}}
                        ListEmptyComponent={<View style={{flex:1, justifyContent:'flex-start', alignItems:'center', paddingTop:50}}><ActivityIndicator color={Colors.white} size="large" /></View>}
                        
                    
                    />  
            </View>
        )
    }
    const USDTView = ()=>{
     
        console.log("USDTView reloads", count)
        count++
        let market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
        market_data = market_data.filter(i=> i.params[0].endsWith("USDT"))
        // console.log(" USDTViewmarket_data",market_data)
         
        const favourites = []


        useEffect(() => {
            // console.log("USDTView mounts", count)
            count++
          }, [])
        const onStarClicked = useCallback((item,favourites) =>{
            if(favourites.find(i => i.id == item.id)){
                    onDeleteClick(item, favourites)
                }else{
                    let newData =market_data.map(i=>{
                        if(i.id == item.id){
                            i.isFavourite = true;
                            return i
                        }else{
                            return i
                        }
                    })
                    store.dispatch(modifyFavs(newData))
                }
            },[favourites])


        return(
            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                <SwipeListView
                        useFlatList={true}
                        data={market_data}
                        renderItem={ (rowData, rowMap) => {
                        //  console.log("bdx",rowData)
                            
                            return(
                        // listItem(rowData.item, rowData.index)
                        <ListItem item={rowData.item} index={rowData.index} />

                        )
                    }}
                        renderHiddenItem={ (rowData, rowMap) => (
                            <View style={{right:0, position:'absolute', top:0, bottom:0, backgroundColor:Colors.darkGray, flex:1, justifyContent:'center', alignItems:'center',width:64}}>
                                <TouchableOpacity onPress={ () =>{ onStarClicked(rowData.item, favourites);setTimeout(() => {
                                    
                                    rowMap[rowData.item.id]?.closeRow();
                                }, 1000); } }>
                                {isFavourite(rowData.item, favourites)}
                                </TouchableOpacity>
                            </View>
                        )}
                    
                        onRowOpen={(rowKey, rowMap) => {
                            setTimeout(() => {
                                rowMap[rowKey]?.closeRow()
                            }, 1000)
                        }}
                        rightOpenValue={-64}
                        disableRightSwipe
                        stopRightSwipe={-64}
                        ListHeaderComponent={ homeHeaderComp()}
                        stickyHeaderIndices={[0]}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{flexGrow:1}}
                        ListEmptyComponent={<View style={{flex:1, justifyContent:'flex-start', alignItems:'center', paddingTop:50}}><ActivityIndicator color={Colors.white} size="large" /></View>}
                        
                    
                    />  
            </View>
        )
    }

    const FavouritesTab = React.memo(()=>{
        console.log("called favstab")
        const dispatch = useDispatch();
        const market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
        const favourites = useSelector(state=> state.marketReducer.favourites, equalityFnMarket)



        const onDeleteClick =(item, market_data)=>{
            let newData =market_data.map(i=>{
                if(i.id == item.id){
                    i.isFavourite = false;
                    return i
                }else{
                    return i
                }
            })
            dispatch(modifyFavs(newData))
        }



        return(
            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                <SwipeListView
                            useFlatList={true}
                            data={favourites}
                            renderItem={ (rowData, rowMap) => {
                                return(
                            // listItem(rowData.item, rowData.index)
                            <ListItem item={rowData.item} index={rowData.index} />
                            )}}
                            renderHiddenItem={ (rowData, rowMap) => (
                                <View style={{right:0, position:'absolute', top:0, bottom:0, backgroundColor:Colors.lightRed, flex:1, justifyContent:'center', alignItems:'center',width:64}}>
                                    <TouchableOpacity onPress={ () =>{rowMap[rowData.item.id]?.closeRow(); setTimeout(() => {
                                        onDeleteClick(rowData.item, market_data) ;
                                    }, 500);} }>
                                    <Image 
                                    source={Images.delete_icon} 
                                    style={{width:14, height:16}} 
                                    resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                            )}
                        
                            onRowOpen={(rowKey, rowMap) => {
                                setTimeout(() => {
                                    rowMap[rowKey]?.closeRow()
                                }, 1000)
                            }}
                            rightOpenValue={-64}
                            disableRightSwipe
                            stopRightSwipe={-64}
                            ListHeaderComponent={ favourites.length>0 ? homeHeaderComp() : <></>}
                            stickyHeaderIndices={[0]}
                            keyExtractor={item => item.id.toString()}
                            contentContainerStyle={{flex:1,}}
                            ListEmptyComponent={<ListEmpty />}
                        
                        />  
                        
                </View>
        )
    })
    const ListItem = ({item, index}) =>{
    //   console.log("item",item)
        let bool = index%2===0 ? true : false;

        let index_price = useSelector(state=> state.marketReducer.index_price, (l,r)=>{
            let change = false
            if(r.length > 0){
                 for(let i=0; i <l.length ;i++){
                    let found = r.findIndex(rItem=> rItem.amout === l[i].amount)
                    if(found > -1){
                        change =  (_.isEqual(l[i], r[found]))
                        if(!change){
                            break;
                        }
                    }
                 }
            }
            return change
        })

        if(!index_price){return <></>}
        return(
            <View style={{ flexDirection:'row', alignItems:'flex-start',  paddingVertical:8, backgroundColor: bool ? Colors.primeBG: Colors.darkGray2}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'flex-start', paddingHorizontal:30}}>
                    <View style={{alignItems:'flex-start'}}>
                        <BPText style={{  fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>{item?.divider.a} <BPText style={{color: Colors.lightWhite,  fontFamily:'Inter-Bold'}}>/ {item?.divider.b}</BPText></BPText>

                        <BPText style={{fontSize:10,  fontFamily:'Inter-Medium', textAlign:'left' }}>Vol {parseFloat(item?.params[1]?.v).toFixed(2)}</BPText>
                    </View>
                </View>

                <View style={{flex:1, justifyContent:'center', alignItems:'center',paddingHorizontal:30}}>
                    <BPText style={{fontSize:12, }}>{parseFloat(item?.params[1]?.l).toFixed(2)}</BPText>
                    <BPText style={{fontFamily:'Inter-Medium', fontSize:10, }}>$ {item?.divider.b === "USDT" ? (parseFloat(item?.params[1]?.l)* index_price.find(i=> i.asset === "USDT").amount).toFixed(2): (parseFloat(item?.params[1]?.l)/ index_price.find(i=> i.asset === "USDT").amount).toFixed(2)}</BPText>
                    </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end', alignSelf:'center',paddingHorizontal:30}}>
                    <Text 
                    style={{
                        color: !item?.params[1]?.cp.match('-') ? Colors.text.darkGreen : Colors.text.darkRed, 
                        fontFamily:'Inter-Medium', 
                        fontSize:12, 
                        backgroundColor:!item?.params[1]?.cp.match('-')  ?Colors.lightGreen : Colors.red,
                        padding:5, borderRadius:3
                    }}
                        > {parseFloat(item?.params[1]?.cp === "Infinity" ? 0 : item?.params[1]?.cp ).toFixed(2)}%</Text>
                    </View>
            </View>
        )
    }

     
    const homeHeaderComp = () => {
        return (
            <View style={{backgroundColor: Colors.primeBG}}>

                        <View style={{ flexDirection:'row', alignItems:'flex-start', backgroundColor: Colors.darkGray2, paddingVertical:15}}>
                            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                                
                                <Text  onPress={()=>alert('uo')}style={{color: Colors.white, fontFamily:'Inter-Medium' , fontSize:12}}>Pair <Icon type="FontAwesome" name="chevron-down" style={{color:'#fff', fontSize:10, fontWeight:'100'}}/> <Text style={{color: Colors.text.lightWhite}}>/</Text> Vol <Icon type="FontAwesome" name="chevron-down" style={{color:'#fff', fontSize:10, fontWeight:'100'}}/></Text>
                            </View>

                            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                                <Text onPress={()=>alert('uo')} style={{color: Colors.white, fontFamily:'Inter-Regular', fontSize:12, }}>Last price <Icon type="FontAwesome" name="sort" style={{color:'#fff', fontSize:12}}/></Text>
                                </View>
                            <View  style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                                <Text onPress={()=>alert('uo')} style={{color: Colors.white, fontFamily:'Inter-Medium' , fontSize:12}}>24h Change <Icon type="FontAwesome" name="sort" style={{color:'#fff', fontSize:12}}/></Text>
                                </View>
                        </View>
            </View>
        )
    }

   
    const isFavourite = (item,favs) =>{
        if(favs.find(i=> i.id === item.id)){
            return(
                <Image 
                    source={Images.star_active} 
                    style={{width:19, height:19}} 
                    resizeMode="contain" />
            )
        }else
        return(
            <Image 
                source={Images.star_icon} 
                style={{width:19, height:19}} 
                resizeMode="contain" />
        )
    }
    
    let Markets = () => {

        // console.log('reload')
        const [socket, setSocket] = useState(null)
        const dispatch = useDispatch();
        const navigation = useNavigation()
        let focus = navigation.isFocused()
        // const user = useSelector(state=> state.authReducer.auth_attributes);
        const socketConnected = useSelector(state=> state.marketReducer.socketConnected, shallowEqual)

        const [marketPairs, setmarketPairs] = useState([])
        // console.log("usert",user)
       


        const callgetMarketList = useCallback(async () =>{
            try{ 
                let attr = {
                    Authorization: getAuthToken(),
                    info: getInfoAuthToken(),
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
        // let compstartSocket= (m)=> emitMarketListEvent(m)
        // const emitMarketListEvent=(marketPairs,socket) => {
        //     console.log("soceklt mareket_paors",marketPairs)
        //     // const reduxState = store.getState()
        //     dispatch(triggerMarketSocket())
        //     socket.on("connect", function() {
                
               

        //          console.log("connected markets")
               
        //         socket.emit("message", {"id": 1, "method" : "state.subscribe", "params" : marketPairs });
        //         socket.on("message", function(data) {
        //             const result = JSON.parse(pako.inflate(data, { to: "string" }));
        //             console.log("count-socket",count2);
        //          console.log("soclet00000",result);
        //             // console.log("id",id);
        //             id++
        //             count2++
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
        console.log("foucs", focus)
            if(socket){
                if(focus && !socketConnected){
                    emitMarketListEvent(marketPairs)
                } 
            }
            // return () => {
            //     if(socket) socket.disconnect()
            // }
        }, [socket,navigation,focus])
      

        return (
            <SafeAreaView style={{flex:1,}}>
                <View style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                    <Toolbar title="Markets" backgroundColor={Colors.darkGray2} hasTabs />
                    
                    <Tabs locked initialPage={1} tabBarUnderlineStyle={{borderBottomWidth:0,width:'auto', marginHorizontal:-5 }} tabContainerStyle={{paddingRight:'40%', backgroundColor: Colors.darkGray2}} >

                        <Tab  heading="Favourites" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2, }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff'}} >
                           <FavouritesTab   />
                        </Tab>
                        
                        <Tab heading="INR" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2 , }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff', }} >
                            <INRView   />
                        </Tab>

                        <Tab heading="USDT" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2 , }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff', }} >
                            <USDTView   />
                        </Tab>


                    </Tabs>

                </View>
            </SafeAreaView>
        )
    }
    Markets = React.memo(Markets)
    export default Markets
