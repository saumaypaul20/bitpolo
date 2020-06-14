import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { primaryColors } from '../../../../theme/colors'
import { useSelector } from 'react-redux'
import BPText from '../../../../common/BPText/BPText'
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem'
import { Images, Colors } from '../../../../theme'
import ChevronRight from '../../../../common/ChevronRight/ChevronRight'
import BPInput from '../../../../common/BPInput/BPInput'
import { screenNames } from '../../../../Routes/screenNames/screenNames'
import { useNavigation } from '@react-navigation/native'
import { Container, Content } from 'native-base'

const Settings = () => {

    const navigation = useNavigation()
    const rightNotificationEl =() =>{
        return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <BPText>Off </BPText>
                <ChevronRight/>
            </View>
        )
    }

    const rightCleanCacheEl =() =>{
        return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <BPText>0 MB</BPText>
            </View>
        )
    }

    const rightAboutEl =() =>{
        return(
            <View style={{flexDirection:'row', alignItems:'center'}}>
                <BPText>1.12.5 </BPText>
                <ChevronRight/>
            </View>
        )
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
         <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.SETTINGS}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, alignSelf:'stretch'}}>
                    <SettingsListItem label="Notifications"   paddingHorizontal={16} borderBottom rightElement={rightNotificationEl()} onPress={()=> navigation.navigate(screenNames.NOTIFICATIONS)}/>

                    <SettingsListItem label="Clean Cache"   paddingHorizontal={16} borderBottom rightElement={rightCleanCacheEl()}/>

                    <SettingsListItem label="About"   paddingHorizontal={16} borderBottom rightElement={rightAboutEl()}/>

                    <SettingsListItem label="System Feedback"   paddingHorizontal={16} borderBottom rightElement={<ChevronRight/>}/>
                </View>
            </Content>
          </Container>
        </SafeAreaView>
    )
}

export default Settings
