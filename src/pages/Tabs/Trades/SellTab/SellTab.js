import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Colors } from '../../../../theme'
import BPText from '../../../../common/BPText/BPText'
import { Picker, Icon, Col } from 'native-base'
import RedBarChart from '../../../../common/RedBarChart/RedBarChart'

const SellTab = () => {
    const [pickerVal, setPickerVal] = useState(null)
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
                            <Picker 
                                mode="dropdown"
                                style={{ width: 140 , height:20, color: Colors.white, backgroundColor: "transparent", transform: [
                                    { scaleX: 0.8 }, 
                                    { scaleY: 0.8 },
                                 ]}}
                                selectedValue={pickerVal}
                                onValueChange={(val)=> setPickerVal(val)}
                                itemStyle={{
                                    backgroundColor: Colors.transparent,
                                    fontSize:12
                                  }}
                                  itemTextStyle={{ color: Colors.white, fontSize:12 }}
                                >
                                <Picker.Item  label="Limit Order" value="key0" />
                                 
                            </Picker>
                            <Icon type="FontAwesome" name="chevron-down" style={{position:'absolute', top: 2, right: 20, fontSize:14, color: Colors.lightWhite}} />
                        </View>
                
                </View>
            </View>
             
           </View>

        {/* -------------------------------- Main View ------------------------------- */}

        <View style={{flex:1, flexDirection:'row', alignSelf:'stretch'}}>
            <View style={{flex:1, backgroundColor: Colors.primeBG , justifyContent:'flex-start', alignItems:'flex-start'}}>
               
               <View style={{height:245, alignSelf:'stretch',}}>
                <RedBarChart color={Colors.lightRed} rightTextColor={Colors.red}/>
               </View>

                <View style={{height:40, alignSelf:'stretch', justifyContent:'center', alignItems:'center' }}>

                    <View  style={{borderWidth:1, borderColor:Colors.gray, borderStyle:"dashed", alignSelf:'stretch', borderRadius:1}}/>

                    <BPText style={{color: Colors.lightGreen,padding:5}}>0.000003584585 $0.29</BPText>
                    
                    <View  style={{borderWidth:1, borderColor:Colors.gray, borderStyle:"dashed", alignSelf:'stretch', borderRadius:1}}/>
                </View>
               
               <View style={{height:245,  alignSelf:'stretch', paddingBottom:2}}>
                <RedBarChart color={'rgba(46, 213, 115, 0.3)'} rightTextColor={Colors.lightGreen}/>
               </View>

                <View style={{alignSelf:'stretch', flexDirection:'row', flex:1,paddingHorizontal:20}}>
                        <View style={{flex:1, borderRadius:4, alignSelf:'flex-start'}}>
                            <Picker 
                                mode="dropdown"
                                style={{ width: 120 , height:20, color: Colors.white, backgroundColor: "transparent", transform: [
                                    { scaleX: 0.6 }, 
                                    { scaleY: 0.6 },
                                 ]}}
                                selectedValue={pickerVal}
                                onValueChange={(val)=> setPickerVal(val)}
                                itemStyle={{
                                    backgroundColor: Colors.transparent,
                                    fontSize:12
                                  }}
                                  itemTextStyle={{ color: Colors.white, fontSize:12 }}
                                >
                                <Picker.Item  label="Limit Order" value="key0" />
                                 
                            </Picker>
                            <Icon type="FontAwesome" name="chevron-down" style={{position:'absolute', top: 2, right: 20, fontSize:14, color: Colors.lightWhite}} />
                        </View>
                        <View style={{flex:1, borderRadius:4, alignSelf:'center'}}>
                            <Picker 
                                mode="dropdown"
                                style={{ width: 120 , height:20, color: Colors.white, backgroundColor: "transparent", transform: [
                                    { scaleX: 0.6 }, 
                                    { scaleY: 0.6 },
                                 ]}}
                                selectedValue={pickerVal}
                                onValueChange={(val)=> setPickerVal(val)}
                                itemStyle={{
                                    backgroundColor: Colors.transparent,
                                    fontSize:12
                                  }}
                                  itemTextStyle={{ color: Colors.white, fontSize:12 }}
                                >
                                <Picker.Item  label="Limit Order" value="key0" />
                                 
                            </Picker>
                            <Icon type="FontAwesome" name="chevron-down" style={{position:'absolute', top: 2, right: 20, fontSize:14, color: Colors.lightWhite}} />
                        </View>
                </View>
            </View>
            
            <View style={{flex:1, backgroundColor:'blue'}}>
                
            </View>
        </View>

        </View>    

    )
}

export default SellTab
