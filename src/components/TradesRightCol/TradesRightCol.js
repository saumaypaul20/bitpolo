import React, { useState, useEffect } from 'react'
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
import { screenNames } from '../../routes/screenNames/screenNames'
import { useNavigation } from '@react-navigation/native'
const TradesRightCol = () => {
    //alert("riglt col")
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            {console.log("TradesOrderTabs1")}
            <TradesOrderTabs />


            <View style={{ marginRight: 16, marginLeft: 3 }}>


                <View  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 16 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <View style={{ height: 14, width: 14, borderRadius: 2, backgroundColor: Colors.lightGreen, marginHorizontal: 5 }} />
                            <BPText style={{ fontSize: 12, fontFamily: Fonts.FONT_MEDIUM }}>Bid</BPText>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
                            <View style={{ height: 14, width: 14, borderRadius: 2, backgroundColor: Colors.red, marginHorizontal: 5 }} />
                            <BPText style={{ fontSize: 12, fontFamily: Fonts.FONT_MEDIUM }}>Ask</BPText>
                        </View>
                    </View>


                    {/* <AreaChart2 /> */}
                    <TouchableOpacity style={{flex:1 }} onPress={()=> navigation.navigate(screenNames.MARKET_PAGE)}>
                        <DepthChart />
                    </TouchableOpacity>
                    {/* <HighChart /> */}
                </View>
            </View>

        </View>
    )
}


export default TradesRightCol
