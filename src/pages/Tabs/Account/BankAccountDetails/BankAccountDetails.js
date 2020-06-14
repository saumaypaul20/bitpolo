import React, { useState } from 'react'
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

const BankAccountDetails = () => {
    const navigation = useNavigation()
    const user = useSelector(state=>state.authReducer.auth_attributes);

    const [upiDone, setupiDone] = useState(true)
    const [inrDone, setinrDone] = useState(false)
    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
         <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={"Bank Account Details"}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch'}}>
                        <SettingsListItem label="UPI" image={upiDone? Images.tick_active_icon : Images.tick_hide} paddingHorizontal={16} borderBottom rightElement={<ChevronRight/>} onPress={()=> navigation.navigate(screenNames.UPI)}/>

                        <SettingsListItem label="IMPS / NEFT / RTGS" image={inrDone ? Images.tick_active_icon : Images.tick_hide} paddingHorizontal={16} borderBottom rightElement={<ChevronRight/>}/>
                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default BankAccountDetails
