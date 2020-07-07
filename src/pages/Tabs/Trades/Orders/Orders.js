import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Switch, Button } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors } from '../../../../theme'
import BPText from '../../../../common/BPText/BPText'
import { screenNames } from '../../../../routes/screenNames/screenNames'
import BPSwitch from '../../../../common/BPSwitch/BPSwitch'


const ListItem = () => {
    return(
        <View style={{flex:1, justifyContent:'flex-start', alignItems:'flex-start',alignSelf:'stretch', }}>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch'}}>
                            <View>
                               <View style={{flexDirection:'row', marginBottom:3, alignItems:'center'}}>
                                <BPText>BTC / USDT</BPText>
                                <Text style={{backgroundColor: Colors.lightGreen, color: Colors.white, marginHorizontal:5, paddingHorizontal:5, fontSize:10}}>BUY</Text>
                                {/* <Text style={{backgroundColor: Colors.lightGreen, color: Colors.white, marginHorizontal:5, paddingHorizontal:10}}>BUY</Text> */}
                               </View>
                                <BPText style={{fontSize:10, color:Colors.lightWhite}}>11.20.14 01-25-2020</BPText>
                            </View>
                            <View >
                                <Button style={{backgroundColor: Colors.white, width: 40, height:14, justifyContent:'center', opacity:0.8}}>
                                    <BPText style={{color: Colors.darkGray3, fontSize: 10}}>Clear</BPText>
                                </Button>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignSelf:'stretch', marginTop:10}}>
                       
                            <View  style={{ alignItems:'flex-start'}}>
                                <BPText style={{fontSize:10}}>0.34343</BPText>
                                <BPText style={{fontSize:8, color:Colors.lightWhite}}>Price</BPText>
                            </View>
                            <View  style={{ alignItems:'center'}}>
                                <BPText style={{fontSize:10}}>400</BPText>
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
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const rightToolbarElement = ()=>{
        return(
            <Button transparent onPress={()=> navigation.navigate(screenNames.ORDERS_HISTORY)}>
                <BPText style={{fontSize:15}}>Orders History</BPText>
            </Button>
        )
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
        <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title="Open Orders" rightElement={rightToolbarElement()}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginHorizontal:16}}>
                     <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

                        <View style={{ flex:1, flexDirection:'row',justifyContent:'flex-start', alignItems:'flex-start', alignSelf:'stretch', paddingVertical:20}}>
                            <BPText style={{fontSize:15}}>Hide Other Pairs </BPText>

                            <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>
                        </View>

                        <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                            <Button style={{backgroundColor: Colors.white, width: 60, height:19, justifyContent:'center', opacity:0.8}}>
                                <BPText style={{color: Colors.darkGray3, fontSize: 12}}>Clear All</BPText>
                            </Button>
                        </View>

                     </View>

                     <ListItem />

                     
                </View>
            </Content>
        </Container>
    </SafeAreaView>
    )
}

export default Orders
