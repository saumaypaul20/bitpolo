import React, { useState } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import PickerComp from '../PickerComp/PickerComp'
import { Images, Colors, Fonts } from '../../theme'
import InputCounter from '../InputCounter/InputCounter'
import Spacer from '../../common/Spacer/Spacer'
import BPText from '../../common/BPText/BPText'
import BPButton from '../../common/BPButton/BPButton'
import AreaChart2 from '../AreaChart/AreaChart'
import TradesOrderTabs from '../TradesOrderTabs/TradesOrderTabs'
import DepthChart from '../AreaChart/DepthChart'
import HighChart from '../HighChart/HighChart'
const TradesRightCol = () => {
    const [pickerOrderVal, setPickerOrderVal] = useState(null)
    const orderItems = [{label:"Limit Order", value:"val1"}]
   

    return (
        <View style={{flex:1}}>
            <TradesOrderTabs />
             

            <View style={{marginRight:16, marginLeft:3}}>
               

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
                     

                    {/* <AreaChart2 /> */}
                    <DepthChart />  
                    {/* <HighChart /> */}
                </View>
            </View>

        </View>
    )
}
 

export default TradesRightCol
