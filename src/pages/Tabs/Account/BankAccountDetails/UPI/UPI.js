import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { Colors, Fonts } from '../../../../../theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { Container, Content, Button } from 'native-base'
import BPInput from '../../../../../common/BPInput/BPInput'
import BPButton from '../../../../../common/BPButton/BPButton'
import Modal from 'react-native-modal'
import Spacer from '../../../../../common/Spacer/Spacer'
import BankConfirmModal from '../../../../../components/BankConfirmModal/BankConfirmModal'
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
const UPI = () => {
    const navigation = useNavigation()
    const [upi, setupi] = useState('')
    const [showModal, setModal] = useState(false)

    const handleModal =() =>{
        setModal(!showModal)
    }
    return (
        <SafeAreaView style={{flex:1}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                <Toolbar enableBackButton title={screenNames.UPI}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{flex:1, justifyContent:'space-between', marginHorizontal:20, marginTop:10}}>
                       <View>
                            <BPInput label="Add UPI Address" placeholder="Enter the UPI address" text={upi} setText={(t)=> setupi(t)}/>
                       </View>

                      <View style={{marginBottom:40}}>
                        <BPButton label="Submit" onPress={()=> handleModal()} />
                      </View>

                        <Modal isVisible={showModal} onBackButtonPress={()=>handleModal()} style={{
                            justifyContent:'center',
                            alignItems:'center',
                            margin:0

                        }}>
                            <BankConfirmModal
                                onBackPress={()=>handleModal()}
                                onRecheck={()=> handleModal()}
                                onConfirm={()=>{handleModal();navigation.navigate(screenNames.GOOGLE_VERIFICATION_CODE,{screen: screenNames.IMPS})}}
                            />
                        </Modal>

                    </View>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

export default UPI
