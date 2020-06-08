import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Button } from 'native-base'
import BPText from '../../common/BPText/BPText'
import { Colors } from '../../theme'

const InputCounter = ({onIncrease, onDecrease, input, onInputChange}) => {
    return (
        <View style={{flex:1, flexDirection:'row', alignItems:'center',justifyContent:'center', alignSelf:'stretch'}}>
            <Button style={styles.counterBtns} onPress={()=> onIncrease()}>
                <BPText>+</BPText>
            </Button>

            <TextInput 
            value={input}
            onChange={(text)=> onInputChange(text)}
            keyboardType={"decimal-pad"} 
            style={{
                alignSelf:'stretch', 
                flex:1, 
                backgroundColor:Colors.darkGray3, 
                color: Colors.white,
                textAlign:'center'
                }} />
            
            <Button style={styles.counterBtns} onPress={()=>onDecrease()}>
                <BPText>-</BPText>
            </Button>

        </View>
    )
}

const styles= StyleSheet.create({
    counterBtns:{flex: 0.5, alignItems:'center', justifyContent:'center', backgroundColor:Colors.darkGray2, height:'100%'}
})

export default InputCounter
