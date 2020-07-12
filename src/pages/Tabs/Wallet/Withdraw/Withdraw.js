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
import Spacer from '../../../../common/Spacer/Spacer'
import { useNavigation } from '@react-navigation/native'
import ChevronRight from '../../../../common/ChevronRight/ChevronRight'
import BPInput from '../../../../common/BPInput/BPInput'
import { useSelector } from 'react-redux'
import PickerComp from '../../../../components/PickerComp/PickerComp'
import { act } from 'react-test-renderer'



const Tab1 = ({setView, activecoin, setWithdrawAmount, setAddress, setPaymentId,address,payment_id, withdrawAmount}) =>{
console.log(activecoin)
       
    return (
        <Root>
            <View>

           


                <SettingsListItem  
                    onPress= {()=> setView(2)}
                    noBorder 
                    label={`${activecoin.asset_code}`}
                    image = {{uri:activecoin.logo_url}}
                    backgroundColor={Colors.darkGray3} 
                    rightElement={<ChevronRight />}/>
                   
                    <View style={{marginHorizontal:16}}>
                        
                        <WithdrawHeader 
                            available={`0.00000000000 ${activecoin.asset_code}`}
                            order={`0.00000000000 ${activecoin.asset_code}`}
                            total={`0.00000000000 ${activecoin.asset_code}`}
                         />
                       
                    
                       <View style={{paddingVertical:20}}>
                            
                            <BPInput label="Withdraw Amount" text={withdrawAmount} setText={(t)=>setWithdrawAmount(t)} rightEl={<BPText>{activecoin.asset_code}</BPText>}/>

                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingTop:8}}>
                                <BPText style={{fontSize:12}}>Fee: {activecoin.withdrawal_fee} {activecoin.asset_code}</BPText>
                                <BPText style={{fontSize:12}}>You will Get: 0 {activecoin.asset_code}</BPText>
                            </View>

                            <Spacer space={20}/>

                            <BPInput label="Address" text={address} setText={(t)=>setAddress(t)} rightEl={<Image source={Images.small_qr_code_icon} style={{width:16, height:16}} resizeMode="contain" />}/>

                            <Spacer space={20}/>

                            <BPInput label="Payment id" text={payment_id} setText={(t)=>setPaymentId(t)}/>
                            
                            
                       </View>

                       
                        

                       <WalletEndButtons />

                       <View style={{alignSelf:'center', marginTop:44}}>
                            <BPButton label="Submit" style={{paddingHorizontal:60}} />
                        </View>
                    </View>
            </View>
       </Root>
    )
}
const Tab2 = ({setView}) =>{
    return (
        <View>
            <SettingsListItem  
                onPress= {()=> setView(1)}
                noBorder 
                label={"INR (Rupee)"}
                image = {Images.rupee_icon}
                backgroundColor={Colors.darkGray3} 
                rightElement={<ChevronRight/>}/>

                <View style={{marginHorizontal:16,}}>
                    
                    <WithdrawHeader 
                            available={"0.00000000000 BTC"}
                            order={"0.00000000000 BTC"}
                            total={"0.00000000000 BTC"}
                         />

                    <Spacer space={30} />
                    <View style={{alignSelf:'stretch', borderColor: Colors.lightWhite, borderWidth:1, borderRadius:4, alignItems:'center', padding:20}}>
                            <BPText>Please add your bank detals for INR Withdrawals</BPText>
                            <BPButton 
                            onPress={()=> navigation.navigate(screenNames.BANK_ACCOUNT_DETAILS)}
                            label="My Account" 
                            style={{paddingHorizontal:30, alignSelf:'center', marginTop:20}} />
                    </View>

                    <View style={{marginTop:24}}>
                       <WalletEndNotes notes={[
                           "Withdrawals up to 2 Lakhs made between 9AM to 10PM will be processed within one hour.",
                           "Withdrawals made outside the specified time will be processed in the next cycle.s"
                       ]}/>

                       
                        
                       
                    </View>

                </View>

       </View>
    )
}



const Withdraw = () => {
    const navigation = useNavigation()
    const [activeView, setView] = useState(1)
    const [activecoin, setactivecoin] = useState({asset_code:"BTC"})
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [address, setAddress] = useState('')
    const [payment_id, setPaymentId] = useState('')
    const assetList = useSelector(state=>state.walletReducer.assets)
    const [pickerOrderVal, setPickerOrderVal] = useState({label:"BTC", value:"BTC"})
    // const address = '14gC4zbkDdfdn6DscjuYqBufndzzfddLQzGViAg5cdfHJ'
    const copyAddress =() =>{
        Clipboard.setString(address)
        Toast.show({
            text: 'Copied Address!',
            buttonText: 'Okay'
          })
    }

    const changeCoin = (coin) =>{
        let item = assetList.find(i=>i.asset_code === coin)
        setactivecoin(item)
        setPickerOrderVal(coin)
    }
   

   
    const tabRenderer = useCallback(() => activeView === 1 ? <Tab1 withdrawAmount={withdrawAmount} address={address} payment_id={payment_id} setView={(v)=>setView(v)} activecoin={activecoin} setWithdrawAmount={(t)=>setWithdrawAmount(t)}  setAddress={(t)=>setAddress(t)}  setPaymentId={(r)=>setPaymentId(r)}  /> : <Tab2 setView={(v)=>setView(v)}/>,[activeView,activecoin])
    
    return (
        <SafeAreaView style={{flex:1}}>
        <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title={screenNames.WITHDRAW}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginTop:10}}>
                    
                    <View style={{alignSelf:'stretch',  }}>

                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                     { assetList.map((item,index)=>{
                         if(item.asset_code !== "INR"){
                             return <BPButtonSmall 
                             key={index.toString()}
                             label={item.asset_code}  
                             labelStyle={{color: Colors.primeBG}} 
                             backgroundColor={Colors.white}
                             image={{uri:item.logo_url}}
                             image_size={12}
                             onPress={()=>{changeCoin(item.asset_code)}}
                             marginRight={3}
                             />
                         }
                     }

                         
                        )  
                    }
                        
                    </View>

                    <View style={{  alignSelf:'stretch', marginHorizontal:130, borderWidth:1, borderColor: Colors.white, marginTop:10, borderRadius:5}}>
                           {assetList.length >0 &&  <PickerComp
                                items={assetList.filter(i=> {
                                    if(i.asset_code !== 'INR'){
                                        return true
                                    }else{
                                        return false
                                    }
                                }).map(i=>{
                                        let p={label: i.asset_code, value: i.asset_code } ; 
                                        return p
                                    })
                                }
                                pickerVal = {pickerOrderVal}
                                setPickerVal = {(val)=> changeCoin(val)}
                                chevronPositionTop= {12}
                                height= {40}
                                scale={1}
                                color={Colors.white}
                            />}
                        </View>
                      
                       <View style={{marginVertical:16}}>
                        {tabRenderer()}
                       </View>

                    </View>
                 
                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}


// const WithdrawTextInput =({label,text,setText,rightEl}) =>{
//     return(
//         <>
//             <BPText style={{fontFamily: Fonts.FONT_MEDIUM}}>{label}</BPText>
//             <View style={{borderColor: Colors.lightWhite, borderRadius: 6, borderWidth:1, marginTop:8, paddingHorizontal:16, flexDirection:'row', alignItems:'center'}}>
//                 <Input
//                     keyboardType="default"
//                     value={text}
//                     onChangeText ={(t)=> setText(t)}
//                 />
//                {rightEl && <View style={{alignItems:'center', justifyContent:'center', borderLeftWidth:1, borderColor: Colors.lightWhite, position:'absolute', right:0, top:0, bottom:0, padding:14}}>
//                     {rightEl}
//                 </View>}
//             </View>
//         </>
//     )
// }

const WithdrawHeader =({available, order, total}) =>{
    return (
        <>
        <View style={{ alignSelf:'center', justifyContent:'space-between', marginVertical:20 }}>
            <BPText style={{color: Colors.lightWhite, fontSize:12, textAlign:'center'}}>Available Balances</BPText>
            <BPText style={{color: Colors.lightWhite}}>{available}</BPText>
        </View>
        <View style={{borderTopColor: Colors.lightWhite, borderTopWidth:1, flexDirection:'row', alignItems:'center', alignSelf:'stretch', justifyContent:'space-around'}}>
                <View style={{flex:1,alignItems:'center',padding:8, borderColor: Colors.lightWhite, borderRightWidth:0.5}}>
                    <BPText>In Order</BPText>
                    <BPText>{order}</BPText>
                </View>
                <View style={{flex:1,alignItems:'center',padding:8, borderColor: Colors.lightWhite, borderLeftWidth:0.5}}>
                    <BPText>Total Balance</BPText>
                    <BPText>{total}</BPText>
                </View>

        </View>
        </>
    )
}

export default Withdraw
