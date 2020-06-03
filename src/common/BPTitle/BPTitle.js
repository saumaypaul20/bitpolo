import React from 'react'
import { View, Text } from 'react-native'
import { primaryColors } from '../../utils/colors'

const BPTitle = ({title}) => {
    return <Text style={{color: primaryColors.white, fontSize:24, fontWeight: '900'}}>{title}</Text>
}

export default BPTitle
