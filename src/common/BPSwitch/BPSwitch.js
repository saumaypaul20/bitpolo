import React from 'react'
import { View, Text } from 'react-native'
import { Switch } from 'native-base'
import { Colors } from '../../theme'

const BPSwitch = ({isEnabled, onToggleSwitch}) => {
    return (
        <Switch
            trackColor={{ false: Colors.inactiveToggleBG, true: Colors.activeToggleBG }}
            thumbColor={isEnabled ? Colors.white : Colors.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onToggleSwitch}
            value={isEnabled}
        />
    )
}

export default BPSwitch
