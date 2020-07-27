import React from 'react'
import { Icon } from 'native-base'
import { Colors } from '../../theme'

const ChevronRight = ({arrow='right'}) => {
    return (
        <Icon type="FontAwesome" name={`chevron-${arrow}`} style={{color: Colors.white, fontSize: 11, opacity:0.6}} />
    )
}

export default ChevronRight
