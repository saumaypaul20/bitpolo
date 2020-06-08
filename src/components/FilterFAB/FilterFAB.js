import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Images, Colors } from '../../theme'
import Modal from 'react-native-modal'
import BPText from '../../common/BPText/BPText'
import Spacer from '../../common/Spacer/Spacer'
import { Content, Container } from 'native-base'
const FilterFAB = () => {

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
                   <View style={styles.modalView}>
                       <Spacer space={12}/>
                        <View style={{backgroundColor: Colors.white, borderRadius:20, height:6, width:90, opacity: 0.6}} />

                        <Content style={{flex:1, alignSelf:'stretch', width:'100%'}} contentContainerStyle={{flexGrow:1, marginHorizontal:24, marginTop:25, width:'100%'}}>
                            <View style={{width:'100%', justifyContent:'center', alignItems:'stretch', flexGrow:1}}>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            <BPText style={{fontSize:18}}>Order Filter</BPText>
                            </View>
                        </Content>
                   </View>
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
        alignItems:'center',
        alignSelf:'stretch',
        width:'100%'
    }
})
export default FilterFAB
