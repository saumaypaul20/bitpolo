    import React, { useEffect, useState } from 'react'
    import { View, Text, FlatList, TouchableOpacity, Image,  } from 'react-native'
    import { SwipeListView } from 'react-native-swipe-list-view';
    import { Colors, Images } from '../../../theme'
    import { SafeAreaView } from 'react-native-safe-area-context'
    import Toolbar from '../../../components/Toolbar/Toolbar'
    import { Container, Content, Icon, Tab, Tabs } from 'native-base'
    import { useDispatch, useSelector, shallowEqual } from 'react-redux';
    import { addMarketData, modifyFavs } from '../../../redux/actions/markets.action';
    import io from 'socket.io-client';
    import * as ENDPOINT from '../../../api/constants'
    import { getMarketList } from '../../../api/apiCalls';
    import store from '../../../redux/store';
    // var io = require("socket.io-client/dist/socket.io");

    let count = 0
    let count2 = 0
    const DATA = [
        {
            id: (Math.random()*1000).toString(),
            pair: {up: 'BDN', down: 'BDX' },
            last_price:{inr: 0.00003333, usd:0.13434},
            volume: '5,333',
            rate: {val:'21.63', sign:'-'}
        },
        
        {
            id: (Math.random()*1000).toString(),
            pair: {up: 'BDN', down: 'BDX' },
            last_price:{inr: 0.00003333, usd:0.13434},
            volume: '5,333',
            rate: {val:'21.63', sign:'+'}
        },
        
        {
            id: (Math.random()*1000).toString(),
            pair: {up: 'BDN', down: 'BDX' },
            last_price:{inr: 0.00003333, usd:0.13434},
            volume: '5,133',
            rate: {val:'21.63', sign:'-'}
        },
        
    ]
    const listItem = (item, index) =>{
    //  console.log("item",item)
        let bool = index%2===0 ? true : false
        return(
            <View style={{ flexDirection:'row', alignItems:'flex-start',  paddingVertical:8, backgroundColor: bool ? Colors.primeBG: Colors.darkGray2}}>
                <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                    <Text style={{color: Colors.white, fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>{item?.params[0].slice(0,3)} <Text style={{color: Colors.lightWhite,  fontFamily:'Inter-Bold'}}>/ {item?.params[0].slice(3)}</Text></Text>
                    <Text style={{color: Colors.white, fontSize:10,  fontFamily:'Inter-Medium' }}>Vol {parseInt(item?.params[1]?.v).toFixed(2)}</Text>
                </View>

                <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                    <Text style={{color: Colors.lightWhite, fontFamily:'Inter-Regular', fontSize:12, }}>{parseInt(item?.params[1]?.l).toFixed(2)}</Text>
                    <Text style={{color: Colors.white, fontFamily:'Inter-Medium', fontSize:10, }}>$ {parseInt(item?.params[1]?.l).toFixed(2)}</Text>
                    </View>
                <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                    <Text 
                    style={{
                        color: !item?.params[1]?.cp.match('-') ? Colors.text.darkGreen : Colors.text.darkRed, 
                        fontFamily:'Inter-Medium', 
                        fontSize:12, 
                        backgroundColor:!item?.params[1]?.cp.match('-')  ?Colors.lightGreen : Colors.red,
                        padding:5, borderRadius:3
                    }}
                        > {parseInt(item?.params[1]?.cp).toFixed(2)}%</Text>
                    </View>
            </View>
        )
    }

    // const startSocket=() => {
    //     const reduxState = store.getState()
    //     socket.on("connect", function() {
    //         socket.emit("message", { "method" : "state.subscribe", "params" : ["BTCINR"] });
    //         socket.on("message", function(data) {
    //             const result = JSON.parse(pako.inflate(data, { to: "string" }));
    //             console.log("count-socket",count2);
    //             console.log("soclet00000",result);
            
    //             count2++
    //             result.id = Math.random().toString()
    //             // setData([result])
    //             if( reduxState.marketReducer.data.length > 0 && Object.entries(reduxState.marketReducer.data[0]).toString() !== Object.entries(result.params[1]).toString()){
                    
    //                 store.dispatch(addMarketData([result]))
    //             }else if(reduxState.marketReducer.data.length == 0){
    //                 store.dispatch(addMarketData([result]))

    //             }
    //         });
    //     })

    //     socket.on("disconnect", function(){
    //         console.log("socket disconnected");
    //     });
    // }
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

    const favsEmpty = () =>{
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                    <Image source={Images.nothing_is_here} style={{width:167, height:130, margin:25}} resizeMode="center" />
                    <Text style={{color: Colors.white, fontSize:18, fontFamily:'Inter-Medium', opacity:0.8}}>Nothing is here</Text>
                    <Text style={{color: Colors.white, fontSize:14, fontFamily:'Inter-Regular', opacity:0.5,lineHeight:23, paddingHorizontal:56, textAlign:'center',paddingTop:12}}>{`Go to any crypto and then Swipe left to\nadd it in favourites`}</Text>
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
        console.log('reload')
        count++
        console.log("count-comp",count);
        var pako = require('pako');
        const socket = io(ENDPOINT.WEBSOCKET);
        const dispatch = useDispatch();
        let user = useSelector(state=> state.authReducer.auth_attributes);
    //  console.log("usert",user)
        const market_data = useSelector(state=> state.marketReducer.data, shallowEqual)
        // const [data, setData] = useState([])
        // const [favs, setFavs] = useState([])
        const favourites = useSelector(state=> state.marketReducer.favourites, shallowEqual)


    
            
        

        // const socketAuth = () =>{
        //     socket.on("connect", function() {
        //         socket.emit("message", {"id":3,"method":"server.auth","params":[user.attributes.token,"mobile app"]});
        //         socket.on("message", function(data) {
        //             const result = JSON.parse(pako.inflate(data, { to: "string" }));
        //           //  console.log("soclket auth",result);
        //         });
        //     })

        //     socket.on("disconnect", function(){
        //       //  console.log("socket auth disconnected");
        //     });
        // }
        const startSocket=() => {
            let compare
            // const reduxState = store.getState()
            socket.on("connect", function() {
                socket.emit("message", { "method" : "state.subscribe", "params" : ["BTCINR"] });
                socket.on("message", function(data) {
                    const result = JSON.parse(pako.inflate(data, { to: "string" }));
                    console.log("count-socket",count2);
                    console.log("soclet00000",result);
                
                    count2++
                    result.id = Math.random().toString()
                    // setData([result])
                    console.log("forst cmpare ", compare)
                    console.log("new cmpare ", Object.entries(result.params[1]).toString())
                  if(compare && compare !== Object.entries(result.params[1]).toString()){
                      console.log("marketdata 0")
                      dispatch(addMarketData([result]))
                      compare = Object.entries(result.params[1]).toString()
                    //   socket.disconnect()
                    }else{
                        compare = Object.entries(result.params[1]).toString()
                        console.log("forst cmpare ", compare)
                       
                      dispatch(addMarketData([result]))
                    }
                });
            })
        
            socket.on("disconnect", function(){
                console.log("socket disconnected");
            });
        }
        useEffect(() => {
            // socketAuth()
        // setData(market_data)
    
            startSocket()
            getMarkets()
            // dispatch(addMarketData(data))
            // setData(DATA)
            return () => {
            
                socket.disconnect()
            }
        }, [])


        // useEffect(() => {
        //     console.log("called setFavs")
        //     setFavs(favourites)
        // }, [favourites])

        const getMarkets = async () =>{
            try{ 
                let attr = {
                    Authorization: user?.attributes?.token,
                    info: user?.attributes?.info,
                }
                let res = await getMarketList(attr)
            //  console.log("getmarkets",res)
            }catch(e){
            //  console.log(e)
            }
        }
        const onStarClicked = (item) =>{
        if(favourites.find(i => i.id == item.id)){
                onDeleteClick(item)
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
        }

        const onDeleteClick = (item)=>{
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

        

        return (
            <SafeAreaView style={{flex:1,}}>
                <View style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                    <Toolbar title="Markets" backgroundColor={Colors.darkGray2} hasTabs />
                    
                    <Tabs locked initialPage={1} tabBarUnderlineStyle={{borderBottomWidth:0,width:'auto', marginHorizontal:-5 }} tabContainerStyle={{paddingRight:'40%', backgroundColor: Colors.darkGray2}} >

                        <Tab  heading="Favourites" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2, }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff'}} >
                            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                            <SwipeListView
                                        useFlatList={true}
                                        data={favourites}
                                        renderItem={ (rowData, rowMap) => {
                                            return(
                                        listItem(rowData.item, rowData.index)
                                        )}}
                                        renderHiddenItem={ (rowData, rowMap) => (
                                            <View style={{right:0, position:'absolute', top:0, bottom:0, backgroundColor:Colors.lightRed, flex:1, justifyContent:'center', alignItems:'center',width:64}}>
                                                <TouchableOpacity onPress={ () =>{rowMap[rowData.item.id].closeRow(); setTimeout(() => {
                                                    onDeleteClick(rowData.item) ;
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
                                                rowMap[rowKey].closeRow()
                                            }, 1000)
                                        }}
                                        rightOpenValue={-64}
                                        disableRightSwipe
                                        stopRightSwipe={-64}
                                        ListHeaderComponent={ favourites.length>0 ? homeHeaderComp() : <></>}
                                        stickyHeaderIndices={[0]}
                                        keyExtractor={item => item.id.toString()}
                                        contentContainerStyle={{flex:1,}}
                                        ListEmptyComponent={favsEmpty()}
                                    
                                    />  
                                    
                            </View>
                        </Tab>
                        
                        <Tab heading="BTC" 
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2 , }} 
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff', }} >
                            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                                <SwipeListView
                                        useFlatList={true}
                                        data={market_data}
                                        renderItem={ (rowData, rowMap) => {
                                        //  console.log("bdx",rowData)
                                            
                                            return(
                                        listItem(rowData.item, rowData.index)
                                        )}}
                                        renderHiddenItem={ (rowData, rowMap) => (
                                            <View style={{right:0, position:'absolute', top:0, bottom:0, backgroundColor:Colors.darkGray, flex:1, justifyContent:'center', alignItems:'center',width:64}}>
                                                <TouchableOpacity onPress={ () =>{ onStarClicked(rowData.item);setTimeout(() => {
                                                    
                                                    rowMap[rowData.item.id].closeRow();
                                                }, 1000); } }>
                                                {isFavourite(rowData.item, favourites)}
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    
                                        onRowOpen={(rowKey, rowMap) => {
                                            setTimeout(() => {
                                                rowMap[rowKey].closeRow()
                                            }, 1000)
                                        }}
                                        rightOpenValue={-64}
                                        disableRightSwipe
                                        stopRightSwipe={-64}
                                        ListHeaderComponent={ homeHeaderComp()}
                                        stickyHeaderIndices={[0]}
                                        keyExtractor={item => item.id}
                                        contentContainerStyle={{flex:1}}
                                        extraData={market_data}
                                    
                                    />  
                            </View>
                        </Tab>

                        <Tab heading="BDX"  
                        disabled
                        textStyle={{color:Colors.text.lightWhite,}} 
                        tabStyle={{ backgroundColor: Colors.darkGray2 }}
                        activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff'}} >
                            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                            <FlatList
                                    data={DATA}
                                    renderItem={({  item, index, }) => listItem(item,index)}
                                    keyExtractor={item => item.id}
                                    ListHeaderComponent={homeHeaderComp()}
                                    stickyHeaderIndices={[0]}
                                />
                                    
                            </View>
                        </Tab>

                    </Tabs>

                </View>
            </SafeAreaView>
        )
    }
    Markets = React.memo(Markets)
    export default Markets
