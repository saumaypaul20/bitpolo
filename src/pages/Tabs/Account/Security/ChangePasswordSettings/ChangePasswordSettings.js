import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { Colors } from '../../../../../theme'
import LabelInput from '../../../../../components/LabelInput/LabelInput'
import { useDispatch } from 'react-redux'
import { TYPES } from '../../../../../redux/types'
import { inputAction } from '../../../../../redux/actions/auth.actions'
import BPButton from '../../../../../common/BPButton/BPButton'

const ChangePasswordSettings = () => {
    const dispatch = useDispatch()
    const [oldPwd, setOldPwd] = useState('');
    const [newPwd, setNewPwd] = useState('')
    const [confirm, setConfirm] = useState('')

    return (
        <SafeAreaView style={{flex:1}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                <Toolbar enableBackButton title={screenNames.CHANGE_PASSWORD_SETTINGS}  />
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, marginHorizontal:20, marginTop:10}}>
                    
                        <LabelInput 
                            keyboardType="password" 
                            label="Enter Old Password"
                            onChangeText={(text)=> setOldPwd(text)} value={oldPwd}/*iconPath={iconLabel1} */ />

                        <LabelInput 
                            keyboardType="password" 
                            label="Enter New Password" 
                            onChangeText={(text)=> setNewPwd(text)} value={newPwd}/*iconPath={iconLabel1} */ />

                        <LabelInput
                            keyboardType="password" 
                            label="Re-Enter New Password" 
                            onChangeText={(text)=> setConfirm(text)} value={confirm}/*iconPath={iconLabel1} */ />

                      <View style={{marginTop:30, marginHorizontal:20 }}>
                        <BPButton label="Submit"  />

                      </View>
                         

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default ChangePasswordSettings
