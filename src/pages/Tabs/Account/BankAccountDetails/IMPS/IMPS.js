import React, { useState, useCallback } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { Colors, Fonts } from '../../../../../theme'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import BPInput from '../../../../../common/BPInput/BPInput'
import PickerComp from '../../../../../components/PickerComp/PickerComp'
import BPText from '../../../../../common/BPText/BPText'
import BankConfirmModal from '../../../../../components/BankConfirmModal/BankConfirmModal'
import Modal from 'react-native-modal'
import BPButton from '../../../../../common/BPButton/BPButton'
import { useNavigation } from '@react-navigation/native'

const IMPS = () => {
    const navigation = useNavigation()
    const acctypes = [{label: 'Savings', value:'savings'}, {label: 'Current', value:'current'}];
    const [accNo, setaccNo] = useState('');
    const [acclabel, setacclabel] = useState('');
    const [accname, setaccname] = useState('');
    const [ifsc, setifsc] = useState('');
    const [accType, setAccType] = useState(null)
    const [showModal, setModal] = useState(false)

    const handleModal =useCallback(() =>{
        setModal(!showModal)
    },[showModal])
    
    const isDisabled = useCallback(() =>{
        if(accNo.length === 0 || acclabel.length === 0 || accname.length === 0 || ifsc.length === 0){
            return true
        }
        return false
    })

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}> 
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
            <Toolbar enableBackButton title={screenNames.IMPS}/>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{flex:1, alignSelf:'stretch', marginHorizontal:20, justifyContent:'space-between'}}>
                    <View>
                        <View style={{marginTop:24}}>
                            <BPText style={{fontFamily: Fonts.FONT_MEDIUM, fontSize:18}}>Account type</BPText>
                            <View style={{borderColor: Colors.lightWhite, borderRadius: 4, borderWidth:1, marginTop:8,   flexDirection:'row', alignItems:'center',}}>
                                <PickerComp
                                        items={acctypes}
                                        pickerVal = {accType}
                                        setPickerVal = {setAccType}
                                        chevronPositionTop= {16}
                                        height={48}
                                    />
                            </View>
                        </View>

                        <View style={{marginTop:24}}>
                            <BPInput label="Account Label" labelStyle={{fontSize:18}} placeholder="Enter a label for your bank account" text={acclabel} setText={(t)=> setacclabel(t)}/>
                        </View>
                        <View style={{marginTop:24}}>
                            <BPInput label="Account Name" labelStyle={{fontSize:18}} placeholder="Enter your name as per in bank account" text={accname} setText={(t)=> setaccname(t)}/>
                        </View>
                        <View style={{marginTop:24}}>
                            <BPInput label="Account No" labelStyle={{fontSize:18}} placeholder="Enter your bank account number" text={accNo} setText={(t)=> setaccNo(t)}/>
                        </View>
                        <View style={{marginTop:24}}>
                            <BPInput label="IFSC Code" labelStyle={{fontSize:18}} placeholder="Enter your IFSC Code" text={ifsc} setText={(t)=> setifsc(t)}/>
                        </View>
                    </View>

                    <View style={{marginBottom:40}}>
                        <BPButton label="Submit" onPress={()=>{ handleModal(); }} disabled={isDisabled()} />
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

export default IMPS
