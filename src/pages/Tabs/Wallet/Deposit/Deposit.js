import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, Image, Clipboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Button, Icon, Toast, Root, Input } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors, Images, Fonts } from '../../../../theme'
import { screenNames } from '../../../../routes/screenNames/screenNames'
import BPText from '../../../../common/BPText/BPText'
import BPButtonSmall from '../../../../common/BPButtonSmall/BPButtonSmall'
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem'
import BPButton from '../../../../common/BPButton/BPButton'
import WalletEndNotes from '../../../../components/WalletEndNotes/WalletEndNotes'
import WalletEndButtons from '../../../../components/WalletEndButtons/WalletEndButtons'
import ChevronRight from '../../../../common/ChevronRight/ChevronRight'
import { createAssetAddress } from '../../../../api/wallet.api'
import { useSelector } from 'react-redux'
import { getAuthToken, getInfoAuthToken, getDeviceId } from '../../../../utils/apiHeaders.utils'
import { convertDate } from '../../../../utils/converters'
import QRCode from 'react-native-qrcode-svg';

let currentTime = new Date()


const getCurrentTime =()=>{
    return currentTime.toTimeString().split(" ")[0]
}
const rightEl = () => {
    return(
        <BPText style={{color: Colors.lightWhite, fontSize:15}}>History</BPText>
    )
}

const copyAddress =(address) =>{
    Clipboard.setString(address)
    Toast.show({
        text: 'Copied Address!',
        buttonText: 'Okay'
      })
}

const Tab1 = ({address, setView, activecoin}) =>{
    return (
        <Root>
            <View>
                <SettingsListItem  
                    onPress= {()=> setView(2)}
                    noBorder 
                    label={`${activecoin}`}
                    image = {Images.btc_white}
                    backgroundColor={Colors.darkGray3} 
                    rightElement={<ChevronRight />}/>
                    <View style={{marginHorizontal:16}}>

                        <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:20 }}>
                            <BPText style={{color: Colors.lightWhite}}>{activecoin} Deposit Address</BPText>
                            <BPText style={{color: Colors.lightWhite}}>{convertDate((new Date), '-', true)} {getCurrentTime()}</BPText>
                        </View>

                        <BPText 
                        style={{
                            fontSize:10, 
                            textAlign:'center', 
                            borderWidth:1, 
                            borderColor: Colors.lightWhite, 
                            borderRadius:4,
                            paddingVertical:14
                            }}>{address}
                        </BPText>

                        
                        <View style={{alignSelf:'center', padding:15, marginTop:42, borderWidth:1, borderColor: Colors.darkGray}}>
                            {/* <Image source={Images.qr} style={{width:140, height:140}}  resizeMode="contain"/> */}
                                <QRCode
                                    value={address}
                                    size={140}
                                    />
                        </View>

                        <Button 
                        onPress={()=> copyAddress(address)}
                        transparent
                        bordered 
                        style={{
                            flexDirection:'row', 
                            borderColor: Colors.lightWhite, 
                            borderRadius:6, 
                            margin:30, 
                            alignSelf:'center', 
                            paddingVertical:10, 
                            paddingHorizontal:27
                        }}
                        >
                            <Image source={Images.copy_icon} style={{width:18, height:18, marginRight:12}} resizeMode="contain"/>
                            <BPText>Copy Address</BPText>
                        </Button>

                       <WalletEndButtons />
                    </View>
        </View>
       </Root>
    )
}

 
const Tab2 = ({depositAmount, setView}) =>{
    return (
        <View>
            <SettingsListItem  
                onPress= {()=> setView(1)}
                noBorder 
                label={"INR (Rupee)"}
                image = {Images.rupee_icon}
                backgroundColor={Colors.darkGray3} 
                rightElement={<ChevronRight />}/>

                <View style={{marginHorizontal:16, marginTop:27}}>
                    <BPText style={{fontFamily: Fonts.FONT_MEDIUM}}>INR Deposit Details</BPText>

                    <View style={{borderColor: Colors.lightWhite, borderRadius: 6, borderWidth:1, marginTop:8, paddingHorizontal:16}}>
                        <Input
                            placeholder="Enter the amount"
                            placeholderTextColor={Colors.lightWhite}
                            value={depositAmount}
                            onChangeText ={(t)=> setDepositAmount(t)}
                            
                        />
                    </View>

                    <View style={{marginTop:16}}>
                        <WalletEndNotes notes={[
                            "Minimum deposit 10 INR.",
                            "Maximum deposit 1 lakh per transaction."
                        ]}/>


                        <View style={{alignSelf:'center', marginTop:44}}>
                            <BPButton label="Deposit" style={{paddingHorizontal:60}} />
                        </View>
                    </View>

                </View>

       </View>
    )
}

let Deposit = () => {

    const [activeView, setView] = useState(1)
    const [activecoin, setactivecoin] = useState("BTC")
    const [depositAmount, setDepositAmount] = useState('')
    const [address, setaddress] = useState(null)

    const assetList = useSelector(state=>state.walletReducer.assets)
    console.log(assetList);
    
    const callcreateassetaddress = useCallback(async (coin)=>{
        try {
            let toPassHeader={
                Authorization: getAuthToken(),
                info: getInfoAuthToken(),
                device: getDeviceId()
            }

            let body = {
                data:{
                    attributes:{
                        asset: assetList.find(item=> {
                            if(item.asset_code === coin){
                                return item._id
                            }
                        })
                    }
                }
            }
            console.log("body",body);
            
            let createdaddressres = await createAssetAddress(body, toPassHeader)
            if(createdaddressres.status){
                console.log( "createdaddressres", createdaddressres)
                setaddress(createdaddressres.data)
            }
        } catch (error) {

            console.log(error);
            
            
        }
    },[address])

    useEffect(() => {
        // setaddress('14gC4zbkDdfdn6DscjuYqBufndzzfddLQzGViAg5cdfHJ')
        callcreateassetaddress(activecoin)
        return () => {
            setaddress('')
        }
    }, [])
    

    const generateAddress =(item)=>{
        setactivecoin(item);
        callcreateassetaddress(item)
    }

    const tabRenderer = useCallback(() => activeView === 1 ? <Tab1 address={address} activecoin={activecoin} setView={(v)=>setView(v)}/>: <Tab2 depositAmount={depositAmount} setView={(v)=>setView(v)}/>,[address, activeView, setactivecoin])

    return (
        <SafeAreaView style={{flex:1}}>
        <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title={screenNames.DEPOSIT} rightElement={rightEl()}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginTop:42}}>
                    
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                     { assetList.map(item=>{
                         if(item.asset_code !== "INR"){
                             return <BPButtonSmall 
                             label={item.asset_code}  
                             labelStyle={{color: Colors.primeBG}} 
                             backgroundColor={Colors.white}
                             image={{uri:item.logo_url}}
                             image_size={12}
                             onPress={()=>{generateAddress(item.asset_code)}}
                             marginRight={3}
                             />
                         }
                     }

                         
                        )  
}
                        {/* <BPButtonSmall 
                            label={"BTC"}  
                            labelStyle={{color: Colors.primeBG}} 
                            backgroundColor={Colors.white}
                            image={Images.change_your_password_icon}
                            image_size={15}
                        />

                        <BPButtonSmall 
                            label={"ETH"}  
                            labelStyle={{color: Colors.primeBG}} 
                            backgroundColor={Colors.white}
                            image={Images.change_your_password_icon}
                            image_size={15}
                        />

                        <BPButtonSmall 
                            label={"BDX"}  
                            labelStyle={{color: Colors.primeBG}} 
                            backgroundColor={Colors.white}
                            image={Images.change_your_password_icon}
                            image_size={15}
                        /> */}
                    </View>
                    
                    <View style={{alignSelf:'stretch', marginTop:24}}>
                      
                        {address ? tabRenderer() : null}

                    </View>
                 
                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}
Deposit = React.memo(Deposit)
export default Deposit
