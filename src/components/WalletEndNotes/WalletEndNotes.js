import React from 'react'
import { View } from 'react-native'
import { Colors, Fonts } from '../../theme'
import BPText from '../../common/BPText/BPText'

const WalletEndNotes = ({notes}) => {

    const listDot = () =>{
        return <View style={{width:6, height:6, borderRadius:3, backgroundColor: Colors.white, marginTop:5}}/>
    }

    return (
        <>
            <BPText style={{fontFamily: Fonts.FONT_MEDIUM}}>Note:</BPText>

            <View style={{marginVertical:8}}>
                {notes.map((note,index)=> <View 
                key={index.toString()} 
                style={{flexDirection:'row', alignItems:'flex-start'}}>
                    {listDot()}
                
                    <BPText style={{fontSize:12, paddingLeft:5, marginBottom:4}}>{note} </BPText>
                    
                </View>)}

                
            
            </View>

        </>
    )
}

export default WalletEndNotes
