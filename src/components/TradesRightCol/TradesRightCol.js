import React, { useState } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PickerComp from '../PickerComp/PickerComp'
import { Images, Colors, Fonts } from '../../theme'
import InputCounter from '../InputCounter/InputCounter'
import Spacer from '../../common/Spacer/Spacer'
import BPText from '../../common/BPText/BPText'
import BPButton from '../../common/BPButton/BPButton'
import AreaChart2 from '../AreaChart/AreaChart'

const TradesRightCol = () => {
    const [pickerOrderVal, setPickerOrderVal] = useState(null)
    const orderItems = [{label:"Limit Order", value:"val1"}]
   

    return (
        <View style={{flex:1}}>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: Colors.darkGray2, alignSelf:'stretch', paddingVertical:10,}}>
                <TouchableOpacity style={{ justifyContent:'center', alignItems:'center', flexDirection:'row'}} onPress={()=> OpenOrders()}>
                    <Image source={Images.open_orders_icon} style={{width:20, height:20}}/>
                    <BPText style={{marginHorizontal:10}}>Open Orders</BPText>
                </TouchableOpacity>
            </View>

            <View style={{  flexDirection:'row', alignSelf:'stretch', justifyContent:'flex-end', paddingVertical:15, alignItems:'center'}}>
                
                <View style={{flex:0.6, borderRadius:4, alignSelf:'flex-start'}}>
                        <PickerComp
                            items={orderItems}
                            pickerVal = {pickerOrderVal}
                            setPickerVal = {setPickerOrderVal}
                            chevronPositionTop= {3}
                            height= {20}
                            scale={0.8}
                            color={Colors.white}
                        />
                    </View>
            
            </View>

            <View style={{marginRight:16, marginLeft:3}}>
                <InputCounter />

                <Spacer space={8}/>

                <InputCounter />

                <Spacer space={4}/>
                
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-around', padding:4, opacity:0.5}}>
                        <BPText style={styles.percentages}>25%</BPText>
                        <BPText style={styles.percentages}>50%</BPText>
                        <BPText style={styles.percentages}>75%</BPText>
                        <BPText style={styles.percentages}>100%</BPText>
                </View>

                <Spacer space={17}/>

                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Total (BDX)</BPText>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                    <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Avbl</BPText>
                    <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>{`0`} BTC</BPText>
                </View>

                <Spacer space={8}/>

                <View style={{ alignSelf:'stretch'}}>
                    <BPButton backgroundColor={Colors.lightGreen} textColor={Colors.white} label="Buy" width="auto"/>
                </View>

                <View style={{height:200}}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginVertical:16}}>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding:10}}>
                                <View style={{height:14, width:14, borderRadius:2, backgroundColor: Colors.lightGreen, marginHorizontal:5}}/>
                                <BPText style={{fontSize:12, fontFamily: Fonts.FONT_MEDIUM}}>Bid</BPText>
                            </View>
                            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', padding:10}}>
                                <View style={{height:14, width:14, borderRadius:2, backgroundColor: Colors.red, marginHorizontal:5}}/>
                                <BPText style={{fontSize:12, fontFamily: Fonts.FONT_MEDIUM}}>Ask</BPText>
                            </View>
                    </View>
                    <Spacer space={40}/>

                    <AreaChart2 />
                </View>
                
            </View>

        </View>
    )
}


const styles= StyleSheet.create({
    percentages:{borderWidth:1, borderStyle:'dashed', borderColor: Colors.lightWhite, borderRadius:1, padding:6, textAlign:'center'}
})


export default TradesRightCol
