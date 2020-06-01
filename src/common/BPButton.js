import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import { primaryColors } from '../utils/colors'

const BPButton = ({label, onPress, marginTop, disabled}) => {
    return (
        <Button disabled={disabled} style={{borderRadius:5, backgroundColor: primaryColors.white, width:275, justifyContent:"center",marginTop:marginTop || 0, opacity: disabled ? 0.5 : 1}} onPress={()=> onPress()}>
            <Text style={{color:primaryColors.primeBG}}>{label}</Text>
        </Button>
    )
}

export default BPButton
