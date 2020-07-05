import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import BPText from '../../common/BPText/BPText'
import { Images, Colors } from '../../theme'
import BPBarChart from '../BPBarChart/BPBarChart'
import PickerComp from '../PickerComp/PickerComp'
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../routes/screenNames/screenNames'
import { emitDepthSubscribeEvent } from '../../api/config.ws'
import { useSelector } from 'react-redux'

const TradesLeftCol = () => {

    const navigation = useNavigation();
    const depths = useSelector(state=> state.depthSubsReducer.data)
        console.log("depths form rdix", depths)
    const [list1val, setList1Val] = useState(null)
    const [list2val, setList2Val] = useState(null)
    const list1 = [{label:"Default", value:"val1"}]
    const list2 = [{label:"6 Decimals", value:"val1"}]

    const OpenOrders =()=>{
        navigation.navigate(screenNames.ORDERS)
    }
    useEffect(() => {
        console.log("statt e,mit")
      setTimeout(() => {
        emitDepthSubscribeEvent()
      }, 2000);
     }, [])
    
    return (
        <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', }}>

                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: Colors.darkGray2, alignSelf:'stretch', paddingVertical:10,}}>
                    <TouchableOpacity style={{ justifyContent:'center', alignItems:'center', flexDirection:'row'}} onPress={()=> OpenOrders()}>
                        <Image source={Images.open_orders_icon} style={{width:20, height:20}}/>
                        <BPText style={{marginHorizontal:10}}>Open Orders</BPText>
                    </TouchableOpacity>
                </View>

                <View style={{  flexDirection:'row', alignSelf:'stretch', justifyContent:'space-around', paddingVertical:15, alignItems:'center'}}>
            
                    <BPText style={{fontSize:10}}>Amount(BTC)</BPText>  
                    <BPText style={{fontSize:10}}>Price(USDT)</BPText>
                
                </View>

                           
               {/* Red Chart 1 */}
               <View style={{height:245, alignSelf:'stretch',width:'97%'}}>
                  {depths?.params[1]?.asks?.length > 0 ?  <BPBarChart data={depths?.params[1].asks.splice(depths?.params[1].asks.length - 10,depths?.params[1].asks.length-1)} color={Colors.lightRed} rightTextColor={Colors.red}/> : <ActivityIndicator size="large" color={Colors.white} />}
               </View>

                {/* Divider with Value */}
                <View style={{height:40, alignSelf:'stretch', justifyContent:'center', alignItems:'center',width:'97%' }}>

                    <View  style={{borderWidth:1, borderColor:Colors.gray, borderStyle:"dashed", alignSelf:'stretch', borderRadius:1}}/>

                    <BPText style={{color: Colors.lightGreen,padding:5}}>0.000003584585 $0.29</BPText>
                    
                    <View  style={{borderWidth:1, borderColor:Colors.gray, borderStyle:"dashed", alignSelf:'stretch', borderRadius:1}}/>
                </View>
               
               {/* Red Chart 2 */}
               <View style={{height:245,  alignSelf:'stretch', paddingBottom:2,width:'97%'}}>
                {depths?.params[1]?.bids?.length > 0 ?    <BPBarChart data={depths?.params[1].bids.splice(0,9)} color={'rgba(46, 213, 115, 0.3)'} rightTextColor={Colors.lightGreen}/> :  <ActivityIndicator size="large" color={Colors.white} />}
               </View>

                <View style={{ alignSelf:'stretch', flexDirection:'row', paddingHorizontal:16, paddingVertical:8}}>
                        <View style={{flex:1, borderRadius:2, borderTopRightRadius:0, borderBottomRightRadius:0, alignSelf:'stretch',borderWidth:1, borderColor: Colors.gray, opacity:0.8}}>
                                <PickerComp
                                    items={list1}
                                    pickerVal = {list1val}
                                    setPickerVal = {setList1Val}
                                    chevronPositionTop= {5}
                                    chevronPositionRight ={0}
                                    chevronSize={10}
                                    height= {20}
                                    width={140}
                                    scale={0.7}
                                    color={Colors.white}
                                    marginLeft ={-20}
                                />
                             
                        </View>
                        <View style={{flex:1, borderRadius:2, borderTopLeftRadius:0, borderBottomLeftRadius:0, alignSelf:'stretch', borderWidth:1, borderColor: Colors.gray, opacity:0.8}}>
                                <PickerComp
                                    items={list2}
                                    pickerVal = {list2val}
                                    setPickerVal = {setList2Val}
                                    chevronPositionTop= {5}
                                    chevronPositionRight ={0}
                                    chevronSize={10}
                                    height= {20}
                                    width={140}
                                    scale={0.7}
                                    color={Colors.white}
                                    marginLeft ={-20}
                                />
                        </View>
                </View>
            </View>
    )
}

export default TradesLeftCol
