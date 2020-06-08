import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, FlatList } from 'react-native'
import { Images, Colors } from '../../theme'
import Modal from 'react-native-modal'
import BPText from '../../common/BPText/BPText'
import Spacer from '../../common/Spacer/Spacer'
import { Content, Container, Switch } from 'native-base'
import BPButton from '../../common/BPButton/BPButton'
const FilterFAB = () => {

    const WIDTH = Dimensions.get("window").width;

    const dataSource = [{id:1, label:"1 Day"},{id:2, label:'1 Week'}, {id:3, label:"1 Month"}, {id:4, label:"3 Months"}]
    const dataSource2 = [{id:1, label:"All"},{id:2, label:'Coin'},]
    const dataSource3 = [{id:1, label:"Buy"},{id:2, label:'Sell'},{id:3, label:'Buy/Sell'},]

    const [modalVisible, showModal] = useState(false)
    const [dateFilter, setDateFilter] = useState(null)

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
      
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
          data.push({ label: `blank-${numberOfElementsLastRow}`, empty: true });
          numberOfElementsLastRow++;
        }
      
        return data;
      };

    const filterItems= (item)=>{
        if(!item.empty) { 
            return (
           
            <View style={{...styles.radioButtons,  backgroundColor: item.id === dateFilter ?   Colors.radioActiveBG :Colors.radioBG }}>
             <TouchableOpacity onPress={()=> dateFilter(item.id)}
                onPress={()=> setDateFilter(item.id)}
             >
                <BPText style={{fontSize:14, textAlign:'center', color:  item.id === dateFilter ?   Colors.radioActiveText :Colors.radioText }}>{item.label}</BPText>
             </TouchableOpacity>
            </View>
        )
    }else{
        return <View  style={[styles.radioButtons, styles.empty]}/>
    }
    }

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
                            contentContainerStyle={{flexGrow:1, marginHorizontal:24, marginTop:25, }}>

                            <View style={{marginBottom:12}}>
                                <BPText style={{fontSize:18}}>Order Filter</BPText>
                            </View>

                            <View>
                                <BPText style={{fontSize:16, marginVertical: 12}}>Date</BPText>

                                <FlatList
                                    data={formatData(dataSource, 3)}
                                    renderItem={({ item }) =>  filterItems(item) }
                                    //Setting the number of column
                                    numColumns={3}
                                    keyExtractor={(item, index) => index.toString()}
                                    />
                            </View>

                            <View>
                                <BPText style={{fontSize:16, marginVertical: 12}}>Lorem Ipsum</BPText>

                                <FlatList
                                    data={formatData(dataSource2, 3)}
                                    renderItem={({ item }) =>  filterItems(item) }
                                    //Setting the number of column
                                    numColumns={3}
                                    keyExtractor={(item, index) => index.toString()}
                                    />
                            </View>

                            <View>
                                <BPText style={{fontSize:16, marginVertical: 12}}>Type</BPText>

                                <FlatList
                                    data={formatData(dataSource3, 3)}
                                    renderItem={({ item }) =>  filterItems(item) }
                                    //Setting the number of column
                                    numColumns={3}
                                    keyExtractor={(item, index) => index.toString()}
                                    />
                            </View>


                            
                       
                            <View style={{ flexDirection:'row',justifyContent:'space-between', alignItems:'center', paddingVertical:12}}>
                                    <BPText style={{fontSize:15}}>Hide Other Pairs </BPText>

                                    <Switch
                                        trackColor={{ false: Colors.inactiveToggleBG, true: Colors.activeToggleBG }}
                                        thumbColor={isEnabled ? Colors.white : Colors.white}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={toggleSwitch}
                                        value={isEnabled}
                                    />
                                </View>

                                <View style={{paddingVertical:12,flexDirection:'row', alignSelf:'stretch', alignItems:'center', justifyContent:'space-between', }}>
                                        <View style={{flex:1 , marginHorizontal:15}}>
                                            <BPButton label="Reset" width="auto" backgroundColor={Colors.filterResetBG} textColor={Colors.lightWhite}/>
                                        </View>

                                        <View style={{flex:1 , marginHorizontal:15}}>
                                            <BPButton label="Confirm" width="auto" backgroundColor={Colors.lightWhite}/>
                                        </View>
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
        flex:0.6,
        backgroundColor: Colors.tabBackgroundColor, 
        borderTopLeftRadius:25, 
        borderTopRightRadius:25,
        alignItems:'stretch',
        
        width:'100%'
    },
    radioButtons:{ 
        flex: 1,
        flexDirection: 'column',
        marginHorizontal:10, 
        marginBottom:12, 
        padding:6,
        borderRadius:2
    },
    empty:{
        backgroundColor:'transparent'
    }
})
export default FilterFAB
