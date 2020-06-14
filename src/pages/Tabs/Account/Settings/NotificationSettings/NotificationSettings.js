import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '../../../../../theme'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { Content, Container, Switch } from 'native-base'
import { screenNames } from '../../../../../Routes/screenNames/screenNames'
import BPText from '../../../../../common/BPText/BPText'
import SettingsListItem from '../../../../../common/SettingsListItem/SettingsListItem'
import BPSwitch from '../../../../../common/BPSwitch/BPSwitch'

const NotificationSettings = () => {

    const [isEnabled, toggleSwitch] = useState(false)
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
         <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.NOTIFICATIONS}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch'}}>

                        <SettingsListItem 
                        label="Notifications"  
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>} 
                        />

                        <SettingsListItem 
                        label="Trade Notifications" 
                        paddingHorizontal={20} 
                        borderBottom 
                        rightElement={ <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>} 
                        />

                        <SettingsListItem 
                        label="Security Notifications"  
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

export default NotificationSettings
