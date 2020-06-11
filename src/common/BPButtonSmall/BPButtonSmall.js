import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from 'native-base'
import BPText from '../BPText/BPText'
import { Images, Colors } from '../../theme'

const BPButtonSmall = ({image, label, onPress, image_size, backgroundColor, borderColor, labelStyle, noBorder}) => {
    return (
        <Button 
            onPress={()=> onPress ? onPress() : alert('soon')}
            style={{
                height:30, 
                borderColor: borderColor || Colors.smallButtonBorder, 
                borderWidth:noBorder ? 0 :2,
                borderRadius:6 , 
                marginRight:10,
                paddingHorizontal:10, 
                flexDirection:'row', 
                alignItems:'center', 
                backgroundColor: backgroundColor || Colors.darkGray2
                }}
            >
            <Image source={image} style={{width:image_size , marginRight:5}} resizeMode="contain"/>
            <BPText style={labelStyle}>{label}</BPText>
        </Button>
    )
}

export default BPButtonSmall
