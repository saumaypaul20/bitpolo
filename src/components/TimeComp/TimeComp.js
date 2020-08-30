import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import BPText from '../../common/BPText/BPText'

export default function TimeComp() {
    const [time, settime] = useState((new Date()).toLocaleTimeString())


    useEffect(()=>{
        setInterval(() => {
                settime((new Date()).toLocaleTimeString())
        }, 1000);
    })
    return (
        <View>
            <BPText>{time.split(':')[0]}:{time.split(':')[1]}</BPText>
        </View>
    )
}
