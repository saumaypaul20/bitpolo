import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Button, ListItem, Left, Body, Right, Icon } from 'native-base'
import {primaryColors} from '../../../styles/colors'
import Toolbar from '../../../components/Toolbar/Toolbar'
import BPButton from '../../../common/BPButton/BPButton'
import SettingsListItem from '../../../common/SettingsListItem/SettingsListItem'
import { useNavigation } from '@react-navigation/native'
import bankaccountimage from '../../../assets/images/items/bank_account_details_icon.png'
import feesimage from '../../../assets/images/items/fees_icon.png'
import securityimage from '../../../assets/images/items/security_icon.png'
import settingsiamge from '../../../assets/images/items/settings_icon.png'
import rateimage from '../../../assets/images/items/rate_us_icon.png'
import aboutimage from '../../../assets/images/items/about_us_icon.png'
import supportimage from '../../../assets/images/items/support_icon.png'
const Account = (props) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{flex:1, backgroundColor: primaryColors.primeBG}}>
        <Container style={{ flex: 1,  backgroundColor: primaryColors.primeBG}}>
            {/* <StatusBar translucent barStyle="light-content" backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title={"Account"}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginTop:42}}>
                    
                    <Image source={require('../../../assets/images/items/user_icon.png')} style={{width:106, height:106, marginBottom:20}} resizeMode="contain"/>
                   
                    <Text style={{color: primaryColors.white, fontSize:16, fontFamily:'Inter-Medium'}}>
                        vrsuresh.choudhary@gmail.com
                        </Text>
                    
                   <Button 
                    bordered 
                    style={styles.btnContainer}>
                        <Text style={styles.btnText}>
                            Edit Profile
                        </Text>
                   </Button>
                    <View style={{alignSelf:'stretch', marginTop:25}}>
                        
                        <SettingsListItem label="Bank Account Details" image={bankaccountimage} onPress={()=> navigation.navigate("BankAccountDetails")}/>
                        <SettingsListItem label="Fees" image={feesimage}/>
                        <SettingsListItem label="Security" image={securityimage}/>
                        <SettingsListItem label="Settings" image={settingsiamge}/>
                        <SettingsListItem label="Support" image={supportimage}/>
                        <SettingsListItem label="Rate Us" image={rateimage}/>
                        <SettingsListItem label="About Us" image={aboutimage}/>
 


                    </View>
                   


                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    btnContainer:{paddingVertical:0, paddingHorizontal:10, marginVertical:12, height:24, borderColor: primaryColors.lightGray},
    btnText:{color: primaryColors.white, fontSize:14, textAlign:'center', paddingVertical:0, marginVertical:0}
   
});

Account.navigationOptions = screenProps => ({
    title: 'Acc',
    tabBarVisible: false
})
export default Account
