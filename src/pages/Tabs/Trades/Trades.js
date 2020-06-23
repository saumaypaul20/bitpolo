import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Picker, Icon, CardItem, Form, Tabs, Tab } from 'native-base'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Colors, Images } from '../../../theme'
import BPText from '../../../common/BPText/BPText'
import SellTab from './BuyTab/BuyTab'
import PickerComp from '../../../components/PickerComp/PickerComp'
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../../routes/screenNames/screenNames'
import { useSelector } from 'react-redux'
import { getTradeVolume } from '../../../api/apiCalls'
import io from 'socket.io-client';
const Trades = () => {
  
   

    let user = useSelector(state=> state.authReducer.auth_attributes);
    console.log("user",user)
    const [currencyVal, setCurrency] = useState(null)
    const navigation =  useNavigation()

    const getTrades =async()=>{
        console.log("user_atributes-------------------------",user.attributes)
        try{
            let attr = {
                Authorization: user.attributes.token,
                info: user.attributes.info,
            }
            let res = await getTradeVolume(attr);
            console.log("getTrades",res)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(user){
           
            // getTrades();
        }
    }, [user])

    const currencies = [{label: 'BTC/USDT', value:'key1'}];
    const OpenOrders =()=>{
        navigation.navigate(screenNames.ORDERS)
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar backgroundColor={Colors.darkGray2} title={"Exchange"}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                
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
                    

                    <Tabs locked initialPage={0} 
                    tabBarUnderlineStyle={{borderBottomWidth:0,width:'auto', marginHorizontal:-5 }} 
                    tabContainerStyle={{paddingLeft:'53%', backgroundColor: Colors.darkGray3}} >

                        <Tab heading="Buy" 
                        textStyle={styles.tabTextStyle} 
                        tabStyle={styles.tabStyle} 
                        activeTabStyle={styles.activeTabStyle} >
                            
                           <SellTab />

                        </Tab>

                        <Tab heading="Sell" disabled 
                        textStyle={styles.tabTextStyle} 
                        tabStyle={styles.tabStyle} 
                        activeTabStyle={styles.activeTabStyle} >
                            {/* TO DO */}
                            <View style={{flex:1, backgroundColor: Colors.primeBG}}><BPText>3</BPText></View>    

                        </Tab>

                    </Tabs>
                    
                    <View style={{position:'absolute', top:42, left:0, right:'47%',height:50,  justifyContent:'center', alignItems:'stretch', flex:1}}>
                        <TouchableOpacity style={{flex: 1, justifyContent:'center', alignItems:'center', flexDirection:'row'}} onPress={()=> OpenOrders()}>
                            <Image source={Images.open_orders_icon} style={{width:20, height:20}}/>
                            <BPText style={{marginHorizontal:10}}>Open Orders</BPText>
                        </TouchableOpacity>
                    </View>

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
