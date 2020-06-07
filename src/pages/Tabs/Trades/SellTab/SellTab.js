import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Fonts, Colors } from '../../../../theme'
import BPText from '../../../../common/BPText/BPText'
import { Picker, Icon, Col, Button } from 'native-base'
import RedBarChart from '../../../../components/RedBarChart/RedBarChart'
import PickerComp from '../../../../components/PickerComp/PickerComp'
import InputCounter from '../../../../components/InputCounter/InputCounter'
import Spacer from '../../../../common/Spacer/Spacer'
import BPButton from '../../../../common/BPButton/BPButton'
import AreaChart from '../../../../components/AreaChart/AreaChart'

const SellTab = () => {
    const [pickerOrderVal, setPickerOrderVal] = useState(null)
    const [list1val, setList1Val] = useState(null)
    const [list2val, setList2Val] = useState(null)

    const orderItems = [{label:"Limit Order", value:"val1"}]
    const list1 = [{label:"Default", value:"val1"}]
    const list2 = [{label:"6 Decimals", value:"val1"}]
    
    return (
        <View style={{flex:1, backgroundColor: Colors.primeBG,}}>
           <View style={{justifyContent:'flex-start', alignItems:'flex-start', flexShrink:1, flexDirection:'column'}}>
            
            <View style={{flexDirection:'row', alignSelf:'stretch', alignItems:'center'}}>
                
                <View style={{flex:1, flexDirection:'row', alignSelf:'stretch', justifyContent:'space-around', paddingVertical:15, alignItems:'center'}}>
                    
                    <BPText style={{fontSize:10}}>Amount(BTC)</BPText>  
                    <BPText style={{fontSize:10}}>Price(USDT</BPText>
                
                </View>
                
                <View style={{flex:1, flexDirection:'row', alignSelf:'stretch', justifyContent:'flex-end', paddingVertical:15, alignItems:'center'}}>
                    
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
            </View>
             
           </View>

        {/* -------------------------------- Main View ------------------------------- */}

        <View style={{flex:1, flexDirection:'row', alignSelf:'stretch'}}>
            {/* Left Column */}
            <View style={{flex:1, backgroundColor: Colors.primeBG , justifyContent:'center', alignItems:'center'}}>
               {/* Red Chart 1 */}
               <View style={{height:245, alignSelf:'stretch',}}>
                    <RedBarChart color={Colors.lightRed} rightTextColor={Colors.red}/>
               </View>

                {/* Divider with Value */}
                <View style={{height:40, alignSelf:'stretch', justifyContent:'center', alignItems:'center' }}>

                    <View  style={{borderWidth:1, borderColor:Colors.gray, borderStyle:"dashed", alignSelf:'stretch', borderRadius:1}}/>

                    <BPText style={{color: Colors.lightGreen,padding:5}}>0.000003584585 $0.29</BPText>
                    
                    <View  style={{borderWidth:1, borderColor:Colors.gray, borderStyle:"dashed", alignSelf:'stretch', borderRadius:1}}/>
                </View>
               
               {/* Red Chart 2 */}
               <View style={{height:245,  alignSelf:'stretch', paddingBottom:2}}>
                    <RedBarChart color={'rgba(46, 213, 115, 0.3)'} rightTextColor={Colors.lightGreen}/>
               </View>

                <View style={{ alignSelf:'stretch', flexDirection:'row', paddingHorizontal:16, paddingVertical:9}}>
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


            {/* Right Column */}
            <View style={{flex:1}}>
                <View style={{marginRight:16}}>
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

                    <Spacer space={18}/>

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

                        <AreaChart />
                    </View>
                    
                </View>



            </View>
        </View>

        </View>    

    )
}

const styles= StyleSheet.create({
    percentages:{borderWidth:1, borderStyle:'dashed', borderColor: Colors.lightWhite, borderRadius:1, padding:6, textAlign:'center'}
})

export default SellTab
