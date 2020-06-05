import React from 'react'
import { View, Text } from 'react-native'
import { primaryColors } from '../../styles/colors'
import BPText from '../BPText/BPText'

const BPSubtitle = ({text}) => {
    return (
        <BPText style={{fontSize:16, textAlign:'center', paddingVertical:20, lineHeight:23}}>{text}</BPText>
    )
}

export default BPSubtitle
