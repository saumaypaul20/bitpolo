import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { screenNames } from '../../../../Routes/screenNames/screenNames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem'
import BPSwitch from '../../../../common/BPSwitch/BPSwitch'
import { Colors } from '../../../../theme'
import ChevronRight from '../../../../common/ChevronRight/ChevronRight'

const Security = () => {
    const [isEnabled, toggleSwitch] = useState(false)

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
                        />

                        <SettingsListItem 
                        label="Device Management"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <ChevronRight/>} 
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
                        rightElement={ <ChevronRight/>} 
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
                        rightElement={ <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>} 
                        />

                        
                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Security
