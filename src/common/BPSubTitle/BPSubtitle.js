import React from 'react'
import { View, Text } from 'react-native'
import { primaryColors } from '../../utils/colors'

const BPSubtitle = ({text}) => {
    return (
        <Text style={{color: primaryColors.white, fontSize:16, textAlign:'center', paddingVertical:20, lineHeight:23}}>{text}</Text>
    )
}

export default BPSubtitle
