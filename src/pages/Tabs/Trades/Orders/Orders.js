import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator,FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Switch, Button } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors } from '../../../../theme'
import BPText from '../../../../common/BPText/BPText'
import { screenNames } from '../../../../routes/screenNames/screenNames'
import BPSwitch from '../../../../common/BPSwitch/BPSwitch'
import { getPendingOrders ,cancelOrder, cancelAllOrders} from '../../../../api/orders.api'
import { splitIt, convertTime, convertDate } from '../../../../utils/converters'
import { useSelector } from 'react-redux'


const ListItem = ({item, onPress}) => {
    return(
        <View style={{justifyContent:'flex-start', alignItems:'flex-start',alignSelf:'stretch', marginBottom:10 }}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch'}}>
                            <View>
                               <View style={{flexDirection:'row', marginBottom:3, alignItems:'center'}}>
                                <BPText>{item.divider.a} / {item.divider.b}</BPText>
                                <Text style={{backgroundColor: item.type===1 ? Colors.lightGreen: Colors.red, color: Colors.white, marginHorizontal:5, paddingHorizontal:5, fontSize:10}}>{item.type === 1 ? 'BUY': 'SELL'}</Text>
                                {/* <Text style={{backgroundColor: Colors.lightGreen, color: Colors.white, marginHorizontal:5, paddingHorizontal:10}}>BUY</Text> */}
                               </View>
                                <BPText style={{fontSize:10, color:Colors.lightWhite}}>{convertTime(item.ctime)} {convertDate(item.ctime,'-')}</BPText>
                            </View>
                            <View >
                                <Button onPress={()=> onPress()} style={{backgroundColor: Colors.white, width: 40, height:14, justifyContent:'center', opacity:0.8}}>
                                    <BPText style={{color: Colors.darkGray3, fontSize: 10}}>Cancel</BPText>
                                </Button>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginTop:10}}>
                       
                            <View  style={{ alignItems:'flex-start'}}>
                                <BPText style={{fontSize:10}}>{item.price}</BPText>
                                <BPText style={{fontSize:8, color:Colors.lightWhite}}>Price</BPText>
                            </View>
                            <View  style={{ alignItems:'center'}}>
                                <BPText style={{fontSize:10}}>{item.amount}</BPText>
                                <BPText style={{fontSize:8, color:Colors.lightWhite}}>Amount</BPText>
                            </View>
                            <View style={{ alignItems:'flex-end'}}>
                                <BPText style={{fontSize:10}}>0.00%</BPText>
                                <BPText style={{fontSize:8, color:Colors.lightWhite}}>Placed</BPText>
                            </View>
                            
                            
                        </View>

                        
                     </View>
    )
}
const Orders = ({navigation}) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [orders, setorders]= useState([])
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const user = useSelector(state=>state.authReducer.auth_attributes);
    const rightToolbarElement = ()=>{
        return(
            <Button transparent onPress={()=> navigation.navigate(screenNames.ORDERS_HISTORY)}>
                <BPText style={{fontSize:15}}>Orders History</BPText>
            </Button>
        )
    }

    const getorders = async()=>{
        let body={
            data:{
                attributes:{
                    limit:100,
                    market:"ALL",
                    offset:0,
                    user_id: user.id
                }
            }
        }
        let res = await getPendingOrders(body);
        if(res.status){
            let resarr= res.data.data.attributes.records

            let finarr = resarr.map(i=>{
                let divider={}
                if(i.market.match("INR")){
                    divider= splitIt(i.market, "INR")
                }else if(i.market.match("USDT")){
                    divider= splitIt(i.market, "USDT")
                }
                i.divider = divider
                return i
            })

            setorders(finarr)
        }
    }

    useEffect(()=>{
        getorders()
    },[])

    const cancelAll = async ()=>{
        let res =  await cancelAllOrders();
        if(res.status){
            alert("All orders has been cancelled")
            setorders([])
            getorders()
        }
    }

    const cancelthisorder = async(item)=>{
        let body={
            data:{
                attributes:{
                    market: item.market,
                    order_id: item.id,
                    source: item.source
                }
            }
        }
        let res = await cancelOrder(body)
        if(res.status){
            alert(`Order ${item.id} has been cancelled!`)
            setorders([])
            getorders()
        }
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
        <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title="Open Orders" rightElement={rightToolbarElement()}/>
            
                <View style={{flex:1, justifyContent:'center', alignItems:'center', marginHorizontal:16}}>
                     

                     {
                         orders.length === 0 ?
                         <ActivityIndicator color={Colors.white} size="large"/>
                         :
                         <FlatList
                         style={{alignSelf:'stretch'}}
                         data={orders}
                         ListHeaderComponent={
                            <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                                <View style={{ flex:1, flexDirection:'row',justifyContent:'flex-start', alignItems:'flex-start', alignSelf:'stretch', paddingVertical:20}}>
                                    <BPText style={{fontSize:15}}>Hide Other Pairs </BPText>
        
                                    <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>
                                </View>
        
                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                    <Button onPress={()=> cancelAll()} style={{backgroundColor: Colors.white, width: 60, height:19, justifyContent:'center', opacity:0.8}}>
                                        <BPText style={{color: Colors.darkGray3, fontSize: 12}}>Cancel All</BPText>
                                    </Button>
                                </View>
        
                            </View>
                         }
                         renderItem={({ item }) =>  <ListItem item={item} onPress={()=> cancelthisorder(item)}/> }
                         //Setting the number of column
                         keyExtractor={(item, index) => index.toString()}
                         />
                     }

                     
                </View>
             
        </Container>
    </SafeAreaView>
    )
}

export default Orders
