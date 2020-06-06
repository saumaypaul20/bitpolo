import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Button, ListItem, Left, Body, Right, Icon } from 'native-base'
import {Colors, Images} from '../../../theme'
import Toolbar from '../../../components/Toolbar/Toolbar'
import BPButton from '../../../common/BPButton/BPButton'
import SettingsListItem from '../../../common/SettingsListItem/SettingsListItem'
import { useNavigation } from '@react-navigation/native'

const Account = (props) => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{flex:1}}>
        <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
            <Toolbar enableBackButton title={"Account"}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'center', marginTop:42}}>
                    
                    <Image source={Images.user_icon} style={{width:106, height:106, marginBottom:20}} resizeMode="contain"/>
                   
                    <Text style={{color: Colors.white, fontSize:16, fontFamily:'Inter-Medium'}}>
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
                        
                        <SettingsListItem label="Bank Account Details" image={Images.bank_account_details_icon} onPress={()=> navigation.navigate("BankAccountDetails")}/>
                        <SettingsListItem label="Fees" image={Images.fees_icon}/>
                        <SettingsListItem label="Security" image={Images.security_icon}/>
                        <SettingsListItem label="Settings" image={Images.settings_icon}/>
                        <SettingsListItem label="Support" image={Images.support_icon}/>
                        <SettingsListItem label="Rate Us" image={Images.rate_us_icon}/>
                        <SettingsListItem label="About Us" image={Images.about_us_icon}/>
 


                    </View>
                   


                   

                </View>
            </Content>
        </Container>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    btnContainer:{paddingVertical:0, paddingHorizontal:10, marginVertical:12, height:24, borderColor: Colors.gray},
    btnText:{color: Colors.white, fontSize:14, textAlign:'center', paddingVertical:0, marginVertical:0}
   
});

Account.navigationOptions = screenProps => ({
    title: 'Acc',
    tabBarVisible: false
})
export default Account
