import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Switch, Button } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors } from '../../../../theme'
import BPText from '../../../../common/BPText/BPText'
import { screenNames } from '../../../../Routes/screenNames/screenNames'

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

                            <Switch
                                trackColor={{ false: Colors.inactiveToggleBG, true: Colors.activeToggleBG }}
                                thumbColor={isEnabled ? Colors.white : Colors.white}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                        <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                            <Button style={{backgroundColor: Colors.white, width: 60, height:19, justifyContent:'center', opacity:0.8}}>
                                <BPText style={{color: Colors.darkGray3, fontSize: 12}}>Clear All</BPText>
                            </Button>
                        </View>

                     </View>
                </View>
            </Content>
        </Container>
    </SafeAreaView>
    )
}

export default Orders
