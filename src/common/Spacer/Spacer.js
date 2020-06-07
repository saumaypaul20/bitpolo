import React from 'react'
import { View, Text } from 'react-native'

const Spacer = ({space}) => {
    return (
        <View style={{height: space || 10}}/>
    )
}

export default Spacer
