import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { screenNames } from '../../../../routes/screenNames/screenNames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem'
import BPSwitch from '../../../../common/BPSwitch/BPSwitch'
import { Colors } from '../../../../theme'
import ChevronRight from '../../../../common/ChevronRight/ChevronRight'
import { useNavigation } from '@react-navigation/native'
import { useSelector, shallowEqual } from 'react-redux'

const Security = () => {
    const navigation= useNavigation()
    
    const user = useSelector(state=> state.authReducer.auth_attributes, shallowEqual)
    console.log(user)
    const [isEnabled, toggleSwitch] = useState(false)
    const [g2fenabled, setg2fenabled] = useState(user.attributes.google_auth)

    const onG2Ftoggle =() =>{
        if(!g2fenabled){
            navigation.navigate(screenNames.GOOGLE_AUTHENTICATOR)
        }else{

            setg2fenabled(!g2fenabled)
        }
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
         <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.SECURITY}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch'}}>

                        <SettingsListItem 
                        label="Change Password"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <ChevronRight/>} 
                        onPress={()=> navigation.navigate(screenNames.CHANGE_PASSWORD_SETTINGS)}
                        />

                        <SettingsListItem 
                        label="Device Management"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <ChevronRight/>} 
                        onPress={()=> navigation.navigate(screenNames.DEVICE_MANAGEMENT)}
                        />

                        <SettingsListItem 
                        label="Touch ID" 
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>} 
                        />

                        <SettingsListItem 
                        label="Security Key"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>} 
                        />

                        <SettingsListItem 
                        label="Google Authenticator"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <BPSwitch isEnabled={g2fenabled} onToggleSwitch={onG2Ftoggle}/>} 
                        // onPress={()=> navigation.navigate(screenNames.GOOGLE_AUTHENTICATOR)}
                        />

                         <SettingsListItem 
                        label="SMS Authenticator"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <ChevronRight/>} 
                        />

                        <SettingsListItem 
                        label="Anti-Spoofing Code"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <BPSwitch isEnabled={isEnabled} onToggleSwitch={setg2fenabled}/>} 
                        onPress={()=> navigation.navigate(screenNames.SET_ANTI_SPOOF)}
                        />

                        
                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Security
