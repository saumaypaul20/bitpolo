import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native'
import { Images, Colors } from '../../theme'
import Modal from 'react-native-modal'
import BPText from '../../common/BPText/BPText'
import Spacer from '../../common/Spacer/Spacer'
import { Content, Container } from 'native-base'
const FilterFAB = () => {

    const WIDTH = Dimensions.get("window").width;

    const [modalVisible, showModal] = useState(false)
    return (
        <>
            <TouchableOpacity 
            onPress={()=> showModal(true)}
            style={styles.fabContainer}>
                <Image source={Images.filter_icon} resizeMode="center" style={{width:54, height:54}} />
            </TouchableOpacity> 

            <Modal
             isVisible={modalVisible} 
             style={{margin:0,  justifyContent: 'flex-end',}}
             onBackButtonPress={()=> showModal(false)} 
             onBackdropPress={()=> showModal(false)}
             
             >
                   <Container style={styles.modalView}>
                       <Spacer space={12}/>
                        <View style={{backgroundColor: Colors.white, borderRadius:20, height:6, width:90, opacity: 0.6 , alignSelf:'center'}} />

                        <Content  
                            contentContainerStyle={{flexGrow:1, marginHorizontal:24, marginTop:25, alignItems:'stretch', borderWidth:1, borderColor:'#fff'}}>

                            <View style={{ justifyContent:'flex-start', alignItems:'flex-start', flex:1}}>
                                <BPText style={{fontSize:18}}>Order Filter</BPText>
                            </View>

                            
                        </Content>
                   </Container>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    fabContainer:{ 
        position:'absolute', 
        bottom:50, 
        right: 0,  
        justifyContent:'center',
        alignItems:'center'
    },

    modalView:{
        flex:0.7,
        backgroundColor: Colors.tabBackgroundColor, 
        borderTopLeftRadius:25, 
        borderTopRightRadius:25,
        alignItems:'stretch',
        
        width:'100%'
    }
})
export default FilterFAB
