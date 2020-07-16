import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, Image, ActivityIndicator,  } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors, Images } from '../../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Icon, Tab, Tabs } from 'native-base'
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { modifyFavs, addMarketList } from '../../../redux/actions/markets.action';
import store from '../../../redux/store';
import _ from 'lodash'
import BPText from '../../../common/BPText/BPText';
import { useNavigation } from '@react-navigation/native';
import ListEmpty from '../../../components/ListEmpty/ListEmpty';
import { equalityFnMarket, equalityFnIndexPrice } from '../../../utils/reduxChecker.utils';
import { emitMarketListEvent } from '../../../api/config.ws';
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils';
import { getMatchingMarketList } from '../../../api/markets.api';
import { addFavCoin, updateFavCoin } from '../../../api/users.api';
 
let count = 0
     
    const callAddFavCoin = async(item)=>{
        let payload = {lang:"en",data:{attributes:{market: item}}}
        let headers = {
            Authorizaton: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }
        let res = await addFavCoin(payload, headers)
        if(res.status){
            console.log(res.data)
        }
    }
    const callDeleteFavCoin = async(item)=>{
        let payload = {lang:"en",data:{attributes:{market: item}}}
        let res = await updateFavCoin(payload)
        if(res.status){
            console.log(res.data)
        }
    }

    const onStarClicked = (item, favourites) =>{
        let state = store.getState()
         
        let market_list = state.marketReducer.market_list
        if(favourites.find(i => i.name == item.params[0])){
                onDeleteClick(item)
            }else{
                let itemRes = market_list.find(i=>i.name === item.params[0])
            let newData =favourites.concat([itemRes])
            console.log("onstart click data",newData)
                store.dispatch(modifyFavs(newData))
                callAddFavCoin(itemRes.name)
            }
        }

        const onDeleteClick =(item)=>{
            let state = store.getState()
            let favourites = state.marketReducer.favourites
             
            let newData = favourites.filter(i=> i.name !== item.params[0])
            store.dispatch(modifyFavs(newData))
            callDeleteFavCoin(item.params[0])
        }

        

    const INRView = ()=>{
        // let focus = navigation.isFocused()
        console.log("INRView reloads", count)
        count++
        let market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
        let favourites = useSelector(state=> state.marketReducer.favourites, (l,r)=>{
            console.log("Fav eq l r ----", l,r);
            let change = false

            if( l. length + r.length === 0){
                change = true
            }else if(r.length > 0){
                

                for(let i=0; i <l.length ;i++){
                    let found = r.findIndex(rItem=> rItem.name === l[i].name)
                    if(found > -1){
                        change = true
                        if(!change){
                            break;
                        }
                    }
                }
            } 
            console.log("Fav eq change----", change);
            
            return change
        })
        
        market_data = market_data.filter(i=> i.params[0].endsWith("INR"))

        return(
            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                <SwipeListView
                        useFlatList={true}
                        data={market_data}
                        renderItem={ (rowData) => {
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
        let favourites = useSelector(state=> state.marketReducer.favourites)
        market_data = market_data.filter(i=> i.params[0].endsWith("USDT"))
        // console.log(" USDTViewmarket_data",market_data)

        return(
            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                <SwipeListView
                        useFlatList={true}
                        data={market_data}
                        renderItem={ (rowData) => {
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

    const FavouritesTab = ()=>{
        console.log("called favstab")
        const market_data = useSelector(state=> state.marketReducer.data, equalityFnMarket)
        const favourites = useSelector(state=> state.marketReducer.favourites)
        console.log("fav tabs favsssss",favourites)
        let favs = favourites.map(i=>{
            // let into =false
            for(let j=0; j< market_data.length; j++){
                if(market_data[j].params[0] === i.name){
                    return market_data[j]
                }
            }
        })

        return(
            <View style={{ backgroundColor:Colors.primeBG, flex:1}}>
                <SwipeListView
                            useFlatList={true}
                            data={favs}
                            renderItem={ (rowData) => {
                                return(
                            // listItem(rowData.item, rowData.index)
                            <ListItem item={rowData.item} index={rowData.index} />
                            )}}
                            renderHiddenItem={ (rowData, rowMap) => (
                                <View style={{right:0, position:'absolute', top:0, bottom:0, backgroundColor:Colors.lightRed, flex:1, justifyContent:'center', alignItems:'center',width:64}}>
                                    <TouchableOpacity onPress={ () =>{rowMap[rowData.item.id]?.closeRow(); setTimeout(() => {
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
                                    rowMap[rowKey]?.closeRow()
                                }, 1000)
                            }}
                            rightOpenValue={-64}
                            disableRightSwipe
                            stopRightSwipe={-64}
                            ListHeaderComponent={ favourites.length>0 ? homeHeaderComp() : <></>}
                            stickyHeaderIndices={[0]}
                            keyExtractor={item => item?.params[1]?.l}
                            contentContainerStyle={{flex:1,}}
                            ListEmptyComponent={<ListEmpty />}
                        
                        />  
                        
                </View>
        )
    }
    const ListItem = ({item, index}) =>{
    //   console.log("item",item)
        let bool = index%2===0 ? true : false;

        let index_price = useSelector(state=> state.marketReducer.index_price, equalityFnIndexPrice)

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
        if( favs.length > 0 && favs.find(i=> i.name === item.params[0])){
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
        // let focus = navigation.isFocused()
        // const user = useSelector(state=> state.authReducer.auth_attributes);
        const socketConnected = useSelector(state=> state.marketReducer.socketConnected, shallowEqual)
        const [loading, setloading] = useState(true)
        const [marketPairs, setmarketPairs] = useState([])
        const [, setfavs] = useState([])
        // console.log("usert",user)
       


        const callgetMarketList = useCallback(async () =>{
            try{ 
                let attr = {
                    Authorization: getAuthToken(),
                    info: getInfoAuthToken(),
                }
                // let res = await getMarketList(attr)
                let res = await getMatchingMarketList(attr)
                
                console.log("getmarkets",res)
    
                if(res.status){
                    let arr = res.data[0][0]["USDT"].concat(res.data[0][1]["INR"])
                    let final = arr
                    let favs = arr.filter(i=>i.is_favourite)
                    console.log("arr",arr)
                    console.log("favs",favs)
                    console.log("final",final)
                    // setfavs(favs)
                    dispatch(modifyFavs(favs))
                    dispatch(addMarketList(final))
                    setmarketPairs(final)
                    setSocket(true)
                }
            }catch(e){
            //  console.log(e)
            }
        },[])
         
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
                if( !socketConnected){
                    emitMarketListEvent(marketPairs.map(i=>i.name))
                } 
            }
            // return () => {
            //     if(socket) socket.disconnect()
            // }
        }, [socket,navigation])
      
        // useEffect(() => {
        //     const unsubscribe = navigation.addListener('focus', () => {
        //         setloading(false)
        //       });
          
        //       return unsubscribe;
        // }, [navigation])

        // useEffect(() => {
        //     const unsubscribe = navigation.addListener('blur', () => {
        //         setloading(true)
        //       });
          
        //       return unsubscribe;
        // }, [navigation])

        return (
            <SafeAreaView style={{flex:1,}}>
                <View style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                    <Toolbar title="Markets" backgroundColor={Colors.darkGray2} hasTabs />
                    
                    { <Tabs locked initialPage={1} tabBarUnderlineStyle={{borderBottomWidth:0,width:'auto', marginHorizontal:-5 }} tabContainerStyle={{paddingRight:'40%', backgroundColor: Colors.darkGray2}} >

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


                    </Tabs>}

                </View>
            </SafeAreaView>
        )
    }
    Markets = React.memo(Markets)
    export default Markets
