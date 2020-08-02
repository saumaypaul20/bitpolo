import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, Image, ActivityIndicator, StatusBar } from 'react-native'
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
import { getAsset, getWalletBalance } from '../../../api/wallet.api'
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../utils/apiHeaders.utils'
import { useDispatch, useSelector } from 'react-redux'
import { fetchedWalletBalance, fetchedWalletAssets } from '../../../redux/actions/wallet.actions'
import { getBankAccounts } from '../../../api/payments.api'
import { addBanks } from '../../../redux/actions/payments.action'
import { equalityFnIndexPrice } from '../../../utils/reduxChecker.utils'
import { toDecimal } from '../../../utils/converters'
import { imageRenderer } from '../../../utils/component.utils'


const rightEl =(val)=>{
    return <BPText>{val}</BPText>
}

const Wallet = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const [assets, setassets] = useState([])
    const [balance, setbalance] = useState(null)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    let index_price = useSelector(state=> state.marketReducer.index_price, equalityFnIndexPrice)
    // alert(JSON.stringify(index_price))
    const sortByAlpha =()=>{
         console.log('soon')
    }

    
 
    const getWalletAsset = useCallback(async () =>{
        let toPassHeader={
            Authorization: getAuthToken(),
            info: getInfoAuthToken(),
            device: getDeviceId()
        }
        let assetsResult = await getAsset(toPassHeader)
        if (assetsResult.status){
            let balanceResult = await getWalletBalance(toPassHeader)

            if(balanceResult.status){
                setbalance(balanceResult.data.data)
                setassets(assetsResult.data)

                dispatch(fetchedWalletBalance(balanceResult.data))
                dispatch(fetchedWalletAssets(assetsResult.data))
                getBanksList()
            }
        }
    },[])

    const getBanksList = useCallback(async()=>{
        // setloading(true)
        let res  = await getBankAccounts();
        if(res.status){
            // setloading(false)
            dispatch(addBanks(res.data))
        }
    },[])

    useEffect(() => {
        getWalletAsset()
       


    }, [])

    const totalBTC = ()=>{
        if(!balance){return}
        let arr = Object.values(balance)
        let res = arr.reduce((acc=0, cur)=>{
            console.log(acc)
              return  parseFloat(acc + cur.available?.btc)
               
              
        },0)
       return res
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor={ Colors.primeBG} />
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
               
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'flex-start'}}>
                        
                        {balance && index_price ? <BPText style={{paddingHorizontal:12, fontSize:12, paddingVertical:16, backgroundColor: Colors.darkGray2}}>
                            Total Value (BTC) <BPText style={{fontFamily:Fonts.FONT_MEDIUM, fontSize:11,}}> {toDecimal(totalBTC(),100000)} BTC</BPText> = $ {toDecimal((totalBTC()*index_price.find(i=> i.asset === "BTC").amount)/index_price.find(i=> i.asset === "USDT").amount,100)}
                        </BPText>
                        :
                        <ActivityIndicator color={Colors.white} size="small"/>
                        }

                        <View style={{
                            backgroundColor:  Colors.darkGray3,
                            padding:16
                        }}>

                            <BPText>Estimated value</BPText>
 
                          {balance ?  <BPText style={{fontFamily: Fonts.FONT_MEDIUM, letterSpacing: 1.89, fontSize:24}}>{toDecimal(totalBTC(),100000000)} BTC </BPText>
                          :
                          <ActivityIndicator color={Colors.white} size="large" />
                          }

                            <View style={{ flexDirection:'row', alignItems:'center', paddingTop:20,}}>
                                <BPButtonSmall 
                                    image={Images.deposit_icon} 
                                    label="Deposit" 
                                    image_size={20} 
                                    onPress={()=> navigation.navigate(screenNames.DEPOSIT)}
                                    disabled={assets.length === 0}
                                />

                                <BPButtonSmall 
                                    image={Images.deposit_icon} 
                                    label="Withdraw" 
                                    image_size={20}
                                    onPress={()=> navigation.navigate(screenNames.WITHDRAW)}
                                    disabled={assets.length === 0}
                                />
                                <BPButtonSmall 
                                    image={Images.history_icon} 
                                    label="History" 
                                    image_size={13}
                                    disabled={assets.length === 0}
                                    onPress={()=> navigation.navigate(screenNames.MARKET_PAGE)}
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
                                    <BPText style={{fontSize:15}}>Show All Balances </BPText>

                                    <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>
                                </View>

                                <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
                                    <Button transparent onPress={()=> sortByAlpha()}>
                                        <Image source={Images.sort_alpha_down_icon} style={{width:15.5}} resizeMode="contain"/>
                                    </Button>
                                </View>
                            </View>

                            <View>
                                {assets.length > 0 && balance && assets.map(item=>{
                                    return (
                                        <SettingsListItem 
                                        key={item._id}
                                        label={`${item.asset_code} (${item.asset_name})`}
                                        image={imageRenderer(item.asset_code, 0)} 
                                        paddingHorizontal={20} 
                                        borderBottom
                                        imageType={0}
                                        rightElement={rightEl(balance[item.asset_code].available.balance)}
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
