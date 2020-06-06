import React from 'react'
import { View } from 'react-native'
import { Item, Button } from 'native-base'
import { primaryColors } from '../../theme/colors'
import BPText from '../../common/BPText/BPText'
import { Fonts } from '../../theme'

const QueryActions = (props) => {
    return (
        <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginVertical:5}}>
            <Item style={{  borderColor:'transparent', flexDirection: 'row' }}>
                <BPText style={{ color: primaryColors.lightWhite, fontSize: 13, fontFamily: Fonts.FONT_REGULAR }}>
                    {props.query}</BPText>
                <Button 
                transparent   
                onPress={()=> props.action()} >
                    <BPText uppercase={false} style={{ fontSize: 13, color: primaryColors.white, fontFamily: Fonts.FONT_REGULAR }}> {props.actionName}</BPText>
                </Button>
            </Item>
        </View>
    )
}

export default QueryActions
