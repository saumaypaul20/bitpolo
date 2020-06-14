import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Button } from 'native-base'
import {Colors, Images} from '../../../theme'
import Toolbar from '../../../components/Toolbar/Toolbar'
import SettingsListItem from '../../../common/SettingsListItem/SettingsListItem'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { screenNames } from '../../../Routes/screenNames/screenNames'

const Account = () => {
    let email = useSelector(state=> state.authReducer.email)
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
                       {email}
                        </Text>
                    
                   <Button 
                    bordered 
                    style={styles.btnContainer}>
                        <Text style={styles.btnText}>
                            Edit Profile
                        </Text>
                   </Button>
                    <View style={{alignSelf:'stretch', marginTop:25}}>
                        
                        <SettingsListItem label="Bank Account Details" image={Images.bank_account_details_icon} onPress={()=> navigation.navigate(screenNames.BANK_ACCOUNT_DETAILS)}/>
                        <SettingsListItem label="Fees" image={Images.fees_icon}
                       />
                        <SettingsListItem label="Security" image={Images.security_icon}
                        onPress={()=> navigation.navigate(screenNames.SECURITY)}/>
                        <SettingsListItem label="Settings" image={Images.settings_icon}
                         onPress={()=> navigation.navigate(screenNames.SETTINGS)}/>
                        <SettingsListItem label="Support" image={Images.support_icon}/>
                        <SettingsListItem label="Rate Us" image={Images.rate_us_icon}/>
                        <SettingsListItem label="About Us" image={Images.about_us_icon}
                           onPress={()=> navigation.navigate(screenNames.ABOUT)}/>

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

Account.navigationOptions = () => ({
    title: 'Acc',
    tabBarVisible: false
})
export default Account
