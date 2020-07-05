import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Picker, Icon, CardItem, Form, Tabs, Tab, Left } from 'native-base'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Colors, Images, Fonts } from '../../../theme'
import PickerComp from '../../../components/PickerComp/PickerComp'
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils'
import { emitDepthSubscribeEvent } from '../../../api/config.ws'
import TradesLeftCol from '../../../components/TradesLeftCol/TradesLeftCol'
import TradesRightCol from '../../../components/TradesRightCol/TradesRightCol'

const Trades = () => {
   
    // let user = useSelector(state=> state.authReducer.auth_attributes, shallowEqual);
    // console.log("user",user)
    const [currencyVal, setCurrency] = useState(null)

    // const getTrades =async()=>{
    //     // console.log("user_atributes-------------------------",user.attributes)
    //     try{
    //         let attr = {
    //             Authorization:getAuthToken(),
    //             info: getInfoAuthToken(),
    //             device: getDeviceId()
    //         }
    //         let res = await getTradeVolume(attr);
    //         console.log("getTrades",res)
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    useEffect(() => {
       // emitDepthSubscribeEvent()
    }, [])

 
    const currencies = [{label: 'BTC/USDT', value:'key1'}];
   
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1, backgroundColor:Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar backgroundColor={Colors.darkGray2} title={"Exchange"}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', }}>
                
                    <View style={styles.headerContainer}>
                         
                        <View style={{flex:0.5, borderRadius:4, alignSelf:'flex-start'}}>
                            <PickerComp
                                items={currencies}
                                pickerVal = {currencyVal}
                                setPickerVal = {setCurrency}
                                chevronPositionTop= {3}
                            />
                           
                        </View>

                        <View style={{flex:1, justifyContent:'flex-end', alignItems:'center', flexDirection:'row', width:'100%'}}>
                            <TouchableOpacity style={{marginHorizontal:22}}>
                                <Image source={Images.market_chart_icon} style={styles.headerIconStyles} />
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Image source={Images.list_icon} style={styles.headerIconStyles} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    
                    {/* ---------------------------------- */}

                    <View style={{flex:1, flexDirection:'row', alignSelf:'stretch'}}>
                        <TradesLeftCol />
                        <TradesRightCol />
                    </View>

                    {/* {-----------------------------} */}
 

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    tabTextStyle:{ color:Colors.text.lightWhite },
    tabStyle:{ backgroundColor: Colors.darkGray3 },
    activeTabStyle:{ backgroundColor: Colors.darkGray3, borderBottomWidth:1, borderBottomColor:'#fff' },

    headerContainer:{ alignItems:'center', flexDirection:'row', justifyContent:'space-between', width:'100%', paddingVertical:10, backgroundColor: Colors.darkGray2, paddingHorizontal:16},
    headerIconStyles:{width:22, height:22}
})

export default Trades
