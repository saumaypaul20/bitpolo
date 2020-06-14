import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import { Fonts, Colors } from '../../theme'

const BankConfirmModal = ({onRecheck, onConfirm, onBackPress, onBackdropPress}) => {
    return (
        <View style={{backgroundColor: Colors.white, alignSelf:'stretch', marginHorizontal:20, padding:20, borderRadius:4}}>

            <Text style={{fontSize:16, fontFamily: Fonts.FONT_MEDIUM, color: Colors.bankModalTextColor}}>Recheck your bank details</Text>

            <Text style={{fontSize:14, fontFamily: Fonts.FONT_MEDIUM, color: Colors.bankModalTextColor, marginTop:12, marginBottom:16, opacity:0.8}}>Please double-check the bank details that you’ve entered. Payments made to incorrect accounts cannot be retracted and BitPolo will not be responsible for such payments.</Text>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                <Button transparent style={{paddingHorizontal:25}}
                onPress={()=>onRecheck()}>
                    <Text style={{fontFamily: Fonts.FONT_MEDIUM, color: Colors.bankModalTextColor}}>Re-Check</Text>
                </Button>

            
                
                <Button style={{backgroundColor: Colors.bankModalTextColor,paddingHorizontal:25, paddingVertical:10, borderRadius:4}}
                onPress={()=>onConfirm()}>
                    <Text style={{fontFamily: Fonts.FONT_MEDIUM,color: Colors.white}}>Confirm</Text>
                </Button>
            </View>

        </View>
    )
}

export default BankConfirmModal
