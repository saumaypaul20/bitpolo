import React, { useState, useEffect } from 'react'
import { View, Text, Image, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Content, Button, Container, Switch, Icon } from 'native-base'
import { Images, Colors, Fonts } from '../../../theme'
import BPText from '../../../common/BPText/BPText'
import BPButtonSmall from '../../../common/BPButtonSmall/BPButtonSmall'
import SettingsListItem from '../../../common/SettingsListItem/SettingsListItem'
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../../routes/screenNames/screenNames'
import BPSwitch from '../../../common/BPSwitch/BPSwitch'
import { getAsset } from '../../../api/wallet.api'
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils'

const Wallet = () => {

    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const [assets, setassets] = useState([])
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const sortByAlpha =()=>{
         alert('soon')
    }

    const rightEl =()=>{
        return <BPText>0</BPText>
    }

    const getWalletAsset = async () =>{
        let toPassHeader={
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }
        let res = await getAsset(toPassHeader)
        if (res.status){
            console.log(res)
            setassets(res.data)
        }
    }

    useEffect(() => {
        getWalletAsset()
    }, [])
    return (
        <SafeAreaView style={{flex:1}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'flex-start'}}>
                        
                        <BPText style={{paddingHorizontal:12, fontSize:12, paddingVertical:16, backgroundColor: Colors.darkGray2}}>
                            Total Value (BTC) <BPText style={{fontFamily:Fonts.FONT_MEDIUM, fontSize:11,}}> 0 BTC</BPText> = $0.00
                        </BPText>

                        <View style={{
                            backgroundColor:  Colors.darkGray3,
                            padding:16
                        }}>

                            <BPText>Estimated value</BPText>
 
                            <BPText style={{fontFamily: Fonts.FONT_MEDIUM, letterSpacing: 1.89, fontSize:24}}>0.00000000 BTC </BPText>

                            <View style={{ flexDirection:'row', alignItems:'center', paddingTop:20,}}>
                                <BPButtonSmall 
                                    image={Images.deposit_icon} 
                                    label="Deposit" 
                                    image_size={20} 
                                    onPress={()=> navigation.navigate(screenNames.DEPOSIT)}
                                />

                                <BPButtonSmall 
                                    image={Images.deposit_icon} 
                                    label="Withdraw" 
                                    image_size={20}
                                    onPress={()=> navigation.navigate(screenNames.WITHDRAW)}
                                />
                                <BPButtonSmall 
                                    image={Images.history_icon} 
                                    label="History" 
                                    image_size={13}
                                />
                            </View>
                            
                        </View>

                        <View style={{}}>
                            <View
                            style={{
                                flexDirection:'row', 
                                alignItems:'center',
                                marginHorizontal:16
                            }}>
                                <View style={{ flex:1, flexDirection:'row',justifyContent:'flex-start', alignItems:'flex-start', alignSelf:'stretch', paddingVertical:20}}>
                                    <BPText style={{fontSize:15}}>Hide Other Pairs </BPText>

                                    <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>
                                </View>

                                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                    <Button transparent onPress={()=> sortByAlpha()}>
                                        <Image source={Images.sort_alpha_down_icon} style={{width:15.5}} resizeMode="contain"/>
                                    </Button>
                                </View>
                            </View>

                            <View>
                                {assets.length > 0 && assets.map(item=>{
                                    return (
                                        <SettingsListItem 
                                        key={item._id}
                                        label={`${item.asset_code} (${item.asset_name})`}
                                        image={{uri: item.logo_url}} 
                                        paddingHorizontal={20} 
                                        borderBottom
                                        rightElement={rightEl()}
                                        />
                                    )
                                })}

                                {
                                    assets.length == 0 &&  <ActivityIndicator size="large" color="#fff" />
                                }
                            
                               
                            </View>
                        </View>
                        
                      


                    

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Wallet
