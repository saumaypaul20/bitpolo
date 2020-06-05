import React from 'react'
import { View, Text } from 'react-native'
import { Fonts } from '../../styles'
import BPText from '../BPText/BPText'

const BPTitle = ({title}) => {
    return <BPText style={{ fontSize:24, fontWeight: '900', fontFamily: Fonts.FONT_BOLD}}>{title}</BPText>
}

export default BPTitle
