import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image,  } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors, Images } from '../../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Container, Content, Icon, Tab, Tabs } from 'native-base'
import { useDispatch, useSelector } from 'react-redux';
import { addMarketData, modifyFavs } from '../../../redux/actions/markets.action';
import io from 'socket.io-client';
import * as ENDPOINT from '../../../api/constants'
import { getMarketList } from '../../../api/apiCalls';


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
    
    let bool = index%2===0 ? true : false
    return(
        <View style={{ flexDirection:'row', alignItems:'flex-start',  paddingVertical:8, backgroundColor: bool ? Colors.primeBG: Colors.darkGray2}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Text style={{color: Colors.white, fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>{item?.pair?.up} <Text style={{color: Colors.lightWhite,  fontFamily:'Inter-Bold'}}>/ {item?.pair?.down}</Text></Text>
                <Text style={{color: Colors.white, fontSize:10,  fontFamily:'Inter-Medium' }}>Vol {item.volume}</Text>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Text style={{color: Colors.lightWhite, fontFamily:'Inter-Regular', fontSize:12, }}>{item?.last_price?.inr}</Text>
                <Text style={{color: Colors.white, fontFamily:'Inter-Medium', fontSize:10, }}>$ {item?.last_price?.usd}</Text>
                </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                <Text 
                style={{
                    color: item.rate.sign === '+' ? Colors.text.darkGreen : Colors.text.darkRed, 
                    fontFamily:'Inter-Medium', 
                    fontSize:12, 
                    backgroundColor: item.rate.sign === '+' ?Colors.lightGreen : Colors.red,
                    padding:5, borderRadius:3
                }}
                    >{item.rate.sign === '+' ? '+' : '-'}{item?.rate.val}%</Text>
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

const favsEmpty = () =>{
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Image source={Images.nothing_is_here} style={{width:167, height:130, margin:25}} resizeMode="center" />
                <Text style={{color: Colors.white, fontSize:18, fontFamily:'Inter-Medium', opacity:0.8}}>Nothing is here</Text>
                <Text style={{color: Colors.white, fontSize:14, fontFamily:'Inter-Regular', opacity:0.5,lineHeight:23, paddingHorizontal:56, textAlign:'center',paddingTop:12}}>{`Go to any crypto and then Swipe left to\nadd it in favourites`}</Text>
        </View>
    )
}

const Markets = () => {
    
    var pako = require('pako');
    const socket = io(ENDPOINT.WEBSOCKET);
    const dispatch = useDispatch();

    let user = useSelector(state=> state.authReducer.auth_attributes);
    console.log("usert",user)
    const market_data = useSelector(state=> state.marketReducer.data)
    const [data, setData] = useState([])
    const [favs, setFavs] = useState([])
    const favourites = useSelector(state=> state.marketReducer.favourites)


    const startSocket=() => {
        socket.on("connect", function() {
            socket.emit("message", { "method" : "state.subscribe", "params" : ["BTCINR"] });
            socket.on("message", function(data) {
                const result = JSON.parse(pako.inflate(data, { to: "string" }));
                console.log("soclet00000",result);
            });
        })

        socket.on("disconnect", function(){
            console.log("socket disconnected");
        });
    }
        
    

    // const socketAuth = () =>{
    //     socket.on("connect", function() {
    //         socket.emit("message", {"id":3,"method":"server.auth","params":[user.attributes.token,"mobile app"]});
    //         socket.on("message", function(data) {
    //             const result = JSON.parse(pako.inflate(data, { to: "string" }));
    //             console.log("soclket auth",result);
    //         });
    //     })

    //     socket.on("disconnect", function(){
    //         console.log("socket auth disconnected");
    //     });
    // }

    useEffect(() => {
        // socketAuth()
        startSocket()
        getMarkets()
        dispatch(addMarketData(DATA))
        setData(DATA)
    }, [])

    useEffect(() => {
        setFavs(favourites)
    }, [favourites])

    const getMarkets = async () =>{
        try{ 
            let attr = {
                Authorization: user?.attributes?.token,
                info: user?.attributes?.info,
            }
            let res = await getMarketList(attr)
            console.log("getmarkets",res)
        }catch(e){
            console.log(e)
        }
    }
    const onStarClicked = (item) =>{
       if(favs.find(i => i.id == item.id)){
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
             dispatch(modifyFavs(newData))
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

    const isFavourite = (item) =>{
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

    return (
        <SafeAreaView style={{flex:1,}}>
            <View style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                <Toolbar title="Markets" backgroundColor={Colors.darkGray2} hasTabs />
                   
                <Tabs locked initialPage={2} tabBarUnderlineStyle={{borderBottomWidth:0,width:'auto', marginHorizontal:-5 }} tabContainerStyle={{paddingRight:'40%', backgroundColor: Colors.darkGray2}} >

                    <Tab  heading="Favourites" 
                    textStyle={{color:Colors.text.lightWhite,}} 
                    tabStyle={{ backgroundColor: Colors.darkGray2, }} 
                    activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff'}} >
                        <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                        <SwipeListView
                                    useFlatList={true}
                                    data={favs}
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
                                    ListHeaderComponent={ favs.length>0 ? homeHeaderComp() : <></>}
                                    stickyHeaderIndices={[0]}
                                    keyExtractor={item => item.id}
                                    contentContainerStyle={{flexGrow:1,}}
                                    ListEmptyComponent={favsEmpty()}
                                    
                                />  
                                
                        </View>
                    </Tab>
                    
                    <Tab heading="BDX" 
                        disabled
                    textStyle={{color:Colors.text.lightWhite,}} 
                    tabStyle={{ backgroundColor: Colors.darkGray2 , }} 
                    activeTabStyle={{backgroundColor: Colors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff', }} >
                        <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                               <SwipeListView
                                    useFlatList={true}
                                    data={market_data}
                                    renderItem={ (rowData, rowMap) => {
                                       console.log("bdx",rowData)
                                        
                                        return(
                                       listItem(rowData.item, rowData.index)
                                    )}}
                                    renderHiddenItem={ (rowData, rowMap) => (
                                        <View style={{right:0, position:'absolute', top:0, bottom:0, backgroundColor:Colors.darkGray, flex:1, justifyContent:'center', alignItems:'center',width:64}}>
                                            <TouchableOpacity onPress={ () =>{ onStarClicked(rowData.item);setTimeout(() => {
                                                
                                                rowMap[rowData.item.id].closeRow();
                                            }, 1000); } }>
                                               {isFavourite(rowData.item)}
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
                                    contentContainerStyle={{flexGrow:1}}
                                   
                                   
                                />  
                        </View>
                    </Tab>

                    <Tab heading="BTC"  
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

export default Markets
