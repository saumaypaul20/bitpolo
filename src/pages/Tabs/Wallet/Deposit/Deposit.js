import React, { useState } from 'react'
import { View, Text, Image, Clipboard } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Button, Icon, Toast, Root, Input } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { Colors, Images, Fonts } from '../../../../theme'
import { screenNames } from '../../../../Routes/screenNames/screenNames'
import BPText from '../../../../common/BPText/BPText'
import BPButtonSmall from '../../../../common/BPButtonSmall/BPButtonSmall'
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem'
import BPButton from '../../../../common/BPButton/BPButton'
import WalletEndNotes from '../../../../components/WalletEndNotes/WalletEndNotes'
import WalletEndButtons from '../../../../components/WalletEndButtons/WalletEndButtons'
const Deposit = () => {


    const [activeView, setView] = useState(1)
    const [depositAmount, setDepositAmount] = useState('')
    const address = '14gC4zbkDdfdn6DscjuYqBufndzzfddLQzGViAg5cdfHJ'
    const copyAddress =() =>{
        Clipboard.setString(address)
        Toast.show({
            text: 'Copied Address!',
            buttonText: 'Okay'
          })
    }
    const rightEl = () => {
        return(
            <BPText style={{color: Colors.lightWhite, fontSize:15}}>History</BPText>
        )
    }
 
    const renderTab1 = () =>{
        return (
            <Root>
                <View>
                    <SettingsListItem  
                        onPress= {()=> setView(2)}
                        noBorder 
                        label={"BTC (Bitcoin)"}
                        image = {Images.btc_white}
                        backgroundColor={Colors.darkGray3} 
                        rightElement={<Icon type="FontAwesome" name="chevron-right" style={{color: Colors.white, fontSize: 14}} />}/>
                        <View style={{marginHorizontal:16}}>

                            <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:20 }}>
                                <BPText style={{color: Colors.lightWhite}}>BTC Deposit Address</BPText>
                                <BPText style={{color: Colors.lightWhite}}>2020-01-27 17:36:25</BPText>
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
                                <Image source={Images.qr} style={{width:140, height:140}}  resizeMode="contain"/>
                            </View>

                            <Button 
                            onPress={()=> copyAddress()}
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
    const renderTab2 = () =>{
        return (
            <View>
                <SettingsListItem  
                    onPress= {()=> setView(1)}
                    noBorder 
                    label={"INR (Rupee)"}
                    image = {Images.rupee_icon}
                    backgroundColor={Colors.darkGray3} 
                    rightElement={<Icon type="FontAwesome" name="chevron-right" style={{color: Colors.white, fontSize: 14}} />}/>

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

    const tabRenderer = () => activeView === 1 ? renderTab1() : renderTab2()
    
    return (
        <SafeAreaView style={{flex:1}}>
        <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title={screenNames.DEPOSIT} rightElement={rightEl()}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginTop:42}}>
                    
                    <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                        <BPButtonSmall 
                            label={"USDT"}  
                            labelStyle={{color: Colors.primeBG}} 
                            backgroundColor={Colors.white}
                            image={Images.change_your_password_icon}
                            image_size={15}
                        />

                        <BPButtonSmall 
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
                        />
                    </View>
                    
                    <View style={{alignSelf:'stretch', marginTop:24}}>
                      
                        {tabRenderer()}

                    </View>
                 
                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}

export default Deposit
