import React from 'react'
import { View, Text, Image } from 'react-native'
import { Button } from 'native-base'
import BPText from '../BPText/BPText'
import { Images, Colors } from '../../theme'

const BPButtonSmall = ({image, label, onPress, image_size = 15, backgroundColor = Colors.darkGray2, borderColor=  Colors.smallButtonBorder, labelStyle, noBorder, marginRight= 5}) => {
    return (
        <Button 
            onPress={()=> onPress ? onPress() : alert('soon')}
            style={{
                height:30, 
                borderColor: borderColor, 
                borderWidth: noBorder ? 0 :2,
                borderRadius: 6 , 
                marginRight: 10,
                paddingHorizontal: 10, 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: backgroundColor  
                }}
            >
            <Image source={image} style={{width:image_size , height:image_size ,marginRight: marginRight}} resizeMode="contain"/>
            <BPText style={labelStyle}>{label}</BPText>
        </Button>
    )
}

export default BPButtonSmall
