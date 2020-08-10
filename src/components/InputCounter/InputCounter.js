import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Button } from 'native-base'
import BPText from '../../common/BPText/BPText'
import { Colors } from '../../theme'

const InputCounter = ({onIncrease, onDecrease, input, onInputChange, label, disabled, onBlurit}) => {
    return (
        <View style={{ flexDirection:'row', alignItems:'center',justifyContent:'center', alignSelf:'stretch'}}>
        { onIncrease && <Button style={styles.counterBtns} onPress={()=> onIncrease()}>
                <BPText>+</BPText>
            </Button>}

            <TextInput
            placeholder={label} 
            editable={!disabled}
            underlineColorAndroid={'transparent'}
            placeholderTextColor={Colors.white}
            value={ input}
            onChangeText={(text)=> onInputChange(text)}
            onBlur={(event)=> onBlurit ? onBlurit(event.nativeEvent.text) : false }
            keyboardType="phone-pad"
            style={{
                alignSelf:'stretch', 
                flex:1, 
                backgroundColor:Colors.darkGray3, 
                color: Colors.white,
                textAlign:'center',
                fontSize:12
                }} />
            
          { onDecrease && <Button style={styles.counterBtns} onPress={()=>onDecrease()}>
                <BPText>-</BPText>
            </Button>}

        </View>
    )
}

const styles= StyleSheet.create({
    counterBtns:{flex: 0.5, alignItems:'center', justifyContent:'center', backgroundColor:Colors.darkGray2, height:'100%'}
})

export default InputCounter
