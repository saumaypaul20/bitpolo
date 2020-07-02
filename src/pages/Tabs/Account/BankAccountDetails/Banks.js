import React, { useState } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../../components/Toolbar/Toolbar'
import { useSelector, shallowEqual } from 'react-redux'
import SettingsListItem from '../../../../common/SettingsListItem/SettingsListItem'
import { Colors } from '../../../../theme'
import ChevronRight from '../../../../common/ChevronRight/ChevronRight'
import { screenNames } from '../../../../routes/screenNames/screenNames'
import { useNavigation } from '@react-navigation/native'
import { Container, Content } from 'native-base'
import BPButton from '../../../../common/BPButton/BPButton'

const Banks = () => {
    const navigation = useNavigation()
    const user = useSelector(state=>state.authReducer.auth_attributes, shallowEqual);
    console.log(user)
    
    const [banks] = useState([])
 

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
         <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.BANK_ACCOUNT_DETAILS}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, alignSelf:'stretch'}}>

                        {banks.length > 0 && 
                        <SettingsListItem 
                            label="IMPS / NEFT / RTGS"  
                            paddingHorizontal={16} 
                            borderBottom 
                            rightElement={<ChevronRight/>} 
                            onPress={()=> navigation.navigate(screenNames.IMPS)}
                        />}

                        <View style={{alignSelf:'stretch',justifyContent:'flex-end', marginTop:25, marginHorizontal:30}}>
                            <BPButton 
                                label="Add Bank" 
                                onPress={()=> navigation.navigate(screenNames.IMPS)} 
                            />

                        </View>
                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default Banks
