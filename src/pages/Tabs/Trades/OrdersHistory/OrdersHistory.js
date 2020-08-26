import React, { useState, useEffect } from 'react'
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Icon } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors, Images } from '../../../../theme'
import FilterFAB from '../../../../components/FilterFAB/FilterFAB'
import BPText from '../../../../common/BPText/BPText'
import BPDatePicker from '../../../../components/BPDatePicker/BPDatePicker'
import { getFinishedOrders } from '../../../../api/orders.api'
import { useSelector } from 'react-redux'
import { splitIt, convertDate, convertTime } from '../../../../utils/converters'


const ListItem = ({item})=>{
    return(
        <View style={{justifyContent:'flex-start', alignItems:'flex-start', borderWidth:1, borderColor: Colors.lightWhite, padding:10, backgroundColor: Colors.darkGray3, marginBottom:15}}>
                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch'}}>
                                        <View style={{flexDirection:'row', alignItems:'center'}}>
                                            <BPText>{item.divider.a} / {item.divider.b}</BPText>
                                            <Text style={{backgroundColor: item.side ===2 ? Colors.lightGreen : Colors.red, color: Colors.white, marginHorizontal:5, paddingHorizontal:5, fontSize:10}}>BUY</Text>
                                            <BPText style={{fontSize:10, color:Colors.lightWhite}}>{convertTime(item.ctime*1000)} {convertDate(item.ctime*1000,'-')}</BPText>
                                        </View>
                                       {item.cancelled && <View >
                                            <BPText style={{  color:Colors.lightWhite, borderColor: Colors.lightWhite, borderWidth:1, padding:5}}>CANCELLED</BPText>
                                        </View>}
                                    </View>

                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginTop:10}}>
                                        <View style={{alignItems:'flex-start'}}>
                                            <BPText>{item.price} {item.divider.a}</BPText>
                                            <BPText style={{fontSize:10, color:Colors.lightWhite}}>Price</BPText>
                                        </View>
                                        <View style={{alignItems:'flex-start'}}>
                                            <BPText>{item.amount} {item.divider.b}</BPText>
                                            <BPText style={{fontSize:10, color:Colors.lightWhite}}>Amount</BPText>
                                        </View>
                                       
                                    </View>

                                    <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginTop:10}}>
                                        <View style={{alignItems:'flex-start'}}>
                                           
                                            <BPText style={{fontSize:8, color:Colors.lightWhite}}>Fee</BPText>
                                            <BPText style={{fontSize:8, color:Colors.lightWhite}}>Total</BPText>
                                        </View>
                                        <View style={{alignItems:'flex-start'}}>
                                            <BPText style={{fontSize:8}}>{Number(item.deal_fee)} {item.divider.a}</BPText>
                                            <BPText style={{fontSize:8}}>{parseFloat(item.deal_money).toFixed(2)} {item.divider.b}</BPText>
                                        </View>
                                       
                                    </View>

                                </View>
    )
}

const OrdersHistory = () => {
    // let today = new Date()
    let [date1, setDate1] = useState((Math.floor(new Date().getTime()) - 86400000));
    let [date2, setDate2] = useState(Math.floor(new Date().getTime()));
    const [orders,setorders] = useState([])
    const user = useSelector(state=>state.authReducer.auth_attributes);

    const setStartDate = (d)=>{
        setDate1(d)
    }
    const setEndDate = (d)=>{
        setDate2(d)
    }

    const getorders = async(date1,date2)=>{
        // alert(Math.floor(new Date().getTime()/1000) - 24*60*60*1000)
        // alert(Math.floor((new Date(date1).getTime()/1000))- 86400)
        setorders([])
        let body={
            data:{
                attributes:{
                    start_time: Math.floor(new Date(date1).getTime()/1000)-86400,
                    end_time: Math.floor(new Date(date2).getTime()/1000),
                    limit:100,
                    market:"ALL",
                    offset:0,
                    side:0,
                    user_id: user.id
                }
            }
        }
        let res = await getFinishedOrders(body);
        if(res.status){
            let resarr= res.data.data.attributes.records
            // alert(resarr.length)
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
        //setorders([])
        
        // alert(Math.floor(new Date().getTime()))
        // setDate2(Math.floor(new Date().getTime()))
        // setDate1((Math.floor(new Date().getTime()) - 86400000))
        
        getorders(date1,date2)
        
    },[date1,date2])

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton title="Order History"/>
                 
                    <View style={{  justifyContent:'flex-start', alignItems:'stretch', backgroundColor: Colors.darkGray3, paddingHorizontal:20}}>
                       <View style={{flexDirection:'row', alignItems:'center', paddingVertical:12}}>
                            <View style={{flex:1, marginHorizontal:12}}>
                                <BPDatePicker label="Start" date={date1}  setDate={setDate1} maxDate={date2}  />
                            </View>
                            <View style={{flex:1, marginHorizontal:12}}>
                                <BPDatePicker label="End" date={date2}  setDate={setDate2} maxDate={new Date()} minDate={date1} />
                            </View>
                             
                       </View>

                      
                      
                    
                    </View>


                    <View style={{flex:1, margin:16}}>
                    {
                         orders.length === 0 ?
                         <ActivityIndicator color={Colors.white} size="large"/>
                         :
                         <FlatList
                         style={{alignSelf:'stretch'}}
                         data={orders}
                         ListHeaderComponent={
                            <View style={{flexDirection:'row', padding:13}}>
                            <View style={{flex:1, justifyContent:'flex-start',}}>
                                <BPText style={{fontSize:12, color:Colors.lightWhite}}>Pair</BPText>
                            </View>

                           <View style={{flex:1, justifyContent:'space-between', flexDirection:'row'}}> 
                            <View style={{flex:1, justifyContent:'center',}}>
                                    <BPText style={{fontSize:12, color:Colors.lightWhite}}>Age/Price</BPText>
                                </View>
                                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                    <BPText style={{fontSize:12, color:Colors.lightWhite}}>Filled/Amount</BPText>
                                </View>
                           </View>
                       </View>

                         }
                         renderItem={({ item }) =>  <ListItem item={item} 
                        //  onPress={()=> cancelthisorder(item)}
                         /> }
                         //Setting the number of column
                         keyExtractor={(item, index) => index.toString()}
                         />
                     }       


                       </View>


                       <FilterFAB />
                 
            </Container>
        </SafeAreaView>
    )
}

export default OrdersHistory
