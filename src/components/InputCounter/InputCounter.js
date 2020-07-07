import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Button } from 'native-base'
import BPText from '../../common/BPText/BPText'
import { Colors } from '../../theme'

const InputCounter = ({onIncrease, onDecrease, input, onInputChange, label, disabled}) => {
    return (
        <View style={{flex:1, flexDirection:'row', alignItems:'center',justifyContent:'center', alignSelf:'stretch'}}>
        {!disabled && <Button style={styles.counterBtns} onPress={()=> onIncrease()}>
                <BPText>+</BPText>
            </Button>}

            <TextInput
            placeholder={label} 
            editable={!disabled}
            
            placeholderTextColor={Colors.white}
            value={String(input)}
            onChange={(text)=> onInputChange(text)}
            keyboardType="phone-pad"
            style={{
                alignSelf:'stretch', 
                flex:1, 
                backgroundColor:Colors.darkGray3, 
                color: Colors.white,
                textAlign:'center',
                fontSize:12
                }} />
            
          {!disabled && <Button style={styles.counterBtns} onPress={()=>onDecrease()}>
                <BPText>-</BPText>
            </Button>}

        </View>
    )
}

const styles= StyleSheet.create({
    counterBtns:{flex: 0.5, alignItems:'center', justifyContent:'center', backgroundColor:Colors.darkGray2, height:'100%'}
})

export default InputCounter
