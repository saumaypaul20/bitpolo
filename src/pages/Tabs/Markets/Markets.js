import React from 'react'
import { View, Text, FlatList,  } from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { primaryColors } from '../../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../common/Toolbar/Toolbar'
import { Container, Content, Icon, Tab, Tabs } from 'native-base'

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
        rate: {val:'21.63', sign:'-'}
    },
    
    {
        id: (Math.random()*1000).toString(),
        pair: {up: 'BDN', down: 'BDX' },
        last_price:{inr: 0.00003333, usd:0.13434},
        volume: '5,133',
        rate: {val:'21.63', sign:'-'}
    },
    
]
const ListItem = ({item, index}) =>{
    let bool = index%2===0 ? true : false
    return(
        <View style={{ flexDirection:'row', alignItems:'flex-start',  paddingVertical:8, backgroundColor: bool ? 'transparent': primaryColors.darkGray2}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Text style={{color: primaryColors.white, fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>{item?.pair?.up} <Text style={{color: primaryColors.lightWhite,  fontFamily:'Inter-Bold'}}>/ {item?.pair?.down}</Text></Text>
                <Text style={{color: primaryColors.white, fontSize:10,  fontFamily:'Inter-Medium' }}>Vol {item.volume}</Text>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Regular', fontSize:12, }}>{item?.last_price?.inr}</Text>
                <Text style={{color: primaryColors.white, fontFamily:'Inter-Medium', fontSize:10, }}>$ {item?.last_price?.usd}</Text>
                </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                <Text 
                style={{
                    color: bool ? primaryColors.text.darkGreen : primaryColors.text.darkRed, 
                    fontFamily:'Inter-Medium', 
                    fontSize:12, 
                    backgroundColor: bool ?primaryColors.lightGreen : primaryColors.red,
                    padding:5, borderRadius:3
                }}
                    >{bool ? '+' : '-'}{item?.rate.val}%</Text>
                </View>
        </View>
    )
}


const HomeHeaderComp = () => {
    return (
        <View style={{backgroundColor: primaryColors.primeBG}}>
            {/* <View style={{ flexDirection:'row', alignItems:'flex-start', paddingVertical:20}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Bold' , fontSize:10}}>BDX/USDT</Text>
                            <Text style={{color:'#fff', fontSize:23,}}>17.6043</Text>
                            <Text style={{color:'#fff', fontSize:11, color:primaryColors.lightGreen}}>-0.13%</Text>
                        </View>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Bold', fontWeight:'bold', fontSize:10}}>BDX/USDT</Text>
                            <Text style={{color:'#fff', fontSize:23,}}>17.6043</Text>
                            <Text style={{color:'#fff', fontSize:11, color:primaryColors.lightGreen}}>-0.13%</Text>
                        </View>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Bold' , fontWeight:'bold', fontSize:10}}>BDX/USDT</Text>
                            <Text style={{color:'#fff', fontSize:23,}}>17.6043</Text>
                            <Text style={{color:'#fff', fontSize:11, color:primaryColors.lightGreen}}>-0.13%</Text>
                        </View>
                    </View> */}
                   
                    

                    <View style={{ flexDirection:'row', alignItems:'flex-start', backgroundColor: primaryColors.darkGray2, paddingVertical:15}}>
                        <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                            
                            <Text  onPress={()=>alert('uo')}style={{color: primaryColors.white, fontFamily:'Inter-Medium' , fontSize:12}}>Pair <Icon type="FontAwesome" name="chevron-down" style={{color:'#fff', fontSize:10, fontWeight:'100'}}/> <Text style={{color: primaryColors.text.lightWhite}}>/</Text> Vol <Icon type="FontAwesome" name="chevron-down" style={{color:'#fff', fontSize:10, fontWeight:'100'}}/></Text>
                           </View>

                        <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                            <Text onPress={()=>alert('uo')} style={{color: primaryColors.white, fontFamily:'Inter-Regular', fontSize:12, }}>Last price <Icon type="FontAwesome" name="sort" style={{color:'#fff', fontSize:12}}/></Text>
                             </View>
                        <View  style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                            <Text onPress={()=>alert('uo')} style={{color: primaryColors.white, fontFamily:'Inter-Medium' , fontSize:12}}>24h Change <Icon type="FontAwesome" name="sort" style={{color:'#fff', fontSize:12}}/></Text>
                            </View>
                    </View>
        </View>
    )
}

const Markets = () => {
    return (
        <SafeAreaView style={{flex:1,}}>
            <View style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
                <Toolbar title="Markets" backgroundColor={primaryColors.darkGray2} hasTabs />
                   
                   

                   <Tabs locked tabBarUnderlineStyle={{borderBottomWidth:0,width:'auto', marginHorizontal:-5 }} tabContainerStyle={{width:250}} >
                    <Tab  heading="Favourites" 
                    textStyle={{color:primaryColors.text.lightWhite,}} 
                    tabStyle={{ backgroundColor: primaryColors.darkGray2, }} 
                    activeTabStyle={{backgroundColor: primaryColors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff'}} >
                        <View style={{ backgroundColor:primaryColors.primeBG, flex:1}}>
                        <FlatList
                                data={DATA}
                                renderItem={({  item, index, }) => <ListItem item={item} index={index} />}
                                keyExtractor={item => item.id}
                                ListHeaderComponent={ <HomeHeaderComp />}
                                stickyHeaderIndices={[0]}
                            />
                                
                        </View>
                    </Tab>
                    <Tab heading="BDX" 
                    textStyle={{color:primaryColors.text.lightWhite,}} 
                    tabStyle={{ backgroundColor: primaryColors.darkGray2 }}
                    activeTabStyle={{backgroundColor: primaryColors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff'}} >
                        <View style={{ backgroundColor:primaryColors.primeBG, flex:1}}>
                        <FlatList
                                data={DATA}
                                renderItem={({  item, index, }) => <ListItem item={item} index={index} />}
                                keyExtractor={item => item.id}
                                ListHeaderComponent={ <HomeHeaderComp />}
                                stickyHeaderIndices={[0]}
                            />
                                
                        </View>
                    </Tab>

                    <Tab heading="BTC" 
                    textStyle={{color:primaryColors.text.lightWhite,}} 
                    tabStyle={{ backgroundColor: primaryColors.darkGray2 , }} 
                    activeTabStyle={{backgroundColor: primaryColors.darkGray2, borderBottomWidth:1, borderBottomColor:'#fff', }} >
                        <View style={{ backgroundColor:primaryColors.primeBG, flex:1}}>
                        {/* <FlatList
                                data={DATA}
                                renderItem={({  item, index, }) => <ListItem item={item} index={index} />}
                                keyExtractor={item => item.id}
                                ListHeaderComponent={ <HomeHeaderComp />}
                                stickyHeaderIndices={[0]}
                            /> */}
                               <SwipeListView
                                    data={DATA}
                                    renderItem={ (data, rowMap) => (
                                        <View >
                                            <Text style={{color:'#fff'}}>I am {data.item.volume} in a SwipeListView</Text>
                                        </View>
                                    )}
                                    renderHiddenItem={ (data, rowMap) => (
                                        <View style={{backgroundColor:'#333'}}>
                                            <Text>Left</Text>
                                            <Text>Right</Text>
                                        </View>
                                    )}
                                    leftOpenValue={75}
                                    rightOpenValue={75}
                                />  
                        </View>
                    </Tab>
                    </Tabs>



                  
                        
                   
               
            </View>
        </SafeAreaView>
    )
}

export default Markets
