import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'native-base'
import { Colors } from '../../theme/'

const BPButton = ({label, onPress, marginTop, disabled, backgroundColor, textColor, width, style}) => {
    return (
        <Button disabled={disabled} style={{borderRadius:5, backgroundColor: backgroundColor || Colors.white,   justifyContent:"center",marginTop:marginTop || 0, opacity: disabled ? 0.5 : 1 , ...style}} onPress={()=> onPress ?onPress() : alert('soon')}>
            <Text style={{color: textColor || Colors.primeBG, fontSize: 20, fontWeight: '500'}}>{label}</Text>
        </Button>
    )
}

export default BPButton
