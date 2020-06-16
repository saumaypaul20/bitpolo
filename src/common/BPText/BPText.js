import React from 'react'
import { View, Text, StyleSheet, TextStyle } from 'react-native'
import { primaryColors } from '../../theme/colors';

const BPText = (props) => {
    return (
       <Text {...props}  style={[TextStyle,styles.defaultStyle, props.style]}>
            {props.children}
       </Text>
             
        
    )
}

const styles = StyleSheet.create({
    defaultStyle: {
        color: primaryColors.white,
        fontFamily: 'Inter-Regular',
       
    },
  });

export default BPText
