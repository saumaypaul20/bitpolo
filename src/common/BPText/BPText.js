import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { primaryColors } from '../../styles/colors';

const BPText = (props) => {
    return (
       <Text {...props}  style={[styles.defaultStyle, props.style]}>
            {props.children}
       </Text>
             
        
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        color: primaryColors.white,
        fontFamily: 'Inter-Regular'
    },
  });

export default BPText
