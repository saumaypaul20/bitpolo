import React from 'react'
import { View, Text } from 'react-native'
import { Item, Button } from 'native-base'
import { primaryColors } from '../utils/colors'

const QueryActions = (props) => {
    return (
        <View style={{backgroundColor:'transparent', justifyContent:'center', alignItems:'center', marginVertical:5}}>
        <Item style={{  borderColor:'transparent', flexDirection: 'row' }}>
            <Text style={{ color: primaryColors.lightWhite, fontSize: 13, fontFamily: 'Asap-Regular' }}>
                {props.query}</Text>
            <Button style={{}} transparent   
                onPress={()=> props.action()} >
                <Text uppercase={false} style={{ fontSize: 13, color: primaryColors.white, fontFamily: 'Asap-Regular' }}> {props.actionName}</Text>
            </Button>
        </Item>
    </View>
    )
}

export default QueryActions
