import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Container, Content, Icon, CheckBox, Body } from 'native-base'
import Toolbar from '../../../../../components/Toolbar/Toolbar'
import { Colors, Images } from '../../../../../theme'
import BPText from '../../../../../common/BPText/BPText'
import BPDatePicker from '../../../../../components/BPDatePicker/BPDatePicker'
import BPSwitch from '../../../../../common/BPSwitch/BPSwitch'
import BPButton from '../../../../../common/BPButton/BPButton'
import BPInput from '../../../../../common/BPInput/BPInput'
import Spacer from '../../../../../common/Spacer/Spacer'
import Modal from 'react-native-modal'
import PickerComp from '../../../../../components/PickerComp/PickerComp'

const AddressManagement = () => {
    let today = new Date()
    const options= [
        {label: 'Select Coin...', value: null}
        
    ]
    const [pickerOrderVal, setPickerOrderVal] = useState({label: 'Select Coin', value: null})

    let [date1, setDate1] = useState(today);
    let [date2, setDate2] = useState(today);
    const [query, setquery] = useState('')
    const [address, setaddress] = useState('')
    const [label, setlabel] = useState('')
    const [isEnabled, setIsEnabled] = useState(false);
    const [check, setcheck] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [isVisible, setVisible] = useState(false)
    const [whitelist, setwhitelist] = useState([])
    const showModal =()=>{
        setVisible(!isVisible)
        setaddress('')
        setlabel('')
    }

    const handleCheckBox = ()=>{
        setcheck(!check)
    }
    const handleWhitelist = (item) =>{
        if(whitelist.find(i=> i.id === item.id)){
            let arr = whitelist.filter(i=> i.id !== item.id);
            setwhitelist(arr)
        }else{
            let arr = whitelist.concat([item])
            setwhitelist(arr)
        }
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor: Colors.primeBG}}>
            <Container style={{ flex: 1,  backgroundColor: Colors.primeBG}}>
                {/* <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor="transparent" /> */}
                <Toolbar enableBackButton title={"Address Management"}/>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{  justifyContent:'flex-start', alignItems:'stretch', backgroundColor: Colors.darkGray3, paddingHorizontal:20}}>
                       <View style={{flexDirection:'row', justifyContent:'space-between' ,alignItems:'center', paddingVertical:20}}>

                            <TouchableOpacity onPress={()=> showModal()} style={{flexDirection:'row',alignItems:'center'}}>
                                <View style={{backgroundColor: Colors.white, color: Colors.primeBG, borderRadius:7, width:14,height:14, justifyContent:"center", alignContent:'center'}}>
                                    <Text  style={{textAlign:'center'}}>+</Text>
                                    </View>
                                    <Spacer space={5} />
                               <BPText>Add withdrawal address</BPText>
                           </TouchableOpacity>

                           <View style={{flexDirection:'row', alignItems:'center'}}>
                                <BPSwitch isEnabled={isEnabled} onToggleSwitch={toggleSwitch}/>
                                <BPText>Whitelist Off</BPText>
                                <Image source={Images.about_us_icon} style={{width: 14, marginLeft:5, height:14}} resizeMode="contain"/>
                           </View>
                       </View>
                    
                    </View>

                    <View style={{flexDirection:'row', padding:16, backgroundColor:Colors.primeBG, justifyContent:'space-around'}}>
                           
                                <TouchableOpacity style={{borderWidth:1, borderRadius:4, borderColor: Colors.white, paddingVertical:8 , paddingHorizontal:8, flexDirection:'row', alignItems:'center'}}>
                                    <View style={{backgroundColor: Colors.white, color: Colors.primeBG, borderRadius:7, width:14,height:14, justifyContent:"center", alignContent:'center'}}>
                                    <Text  style={{textAlign:'center'}}>+</Text>
                                    </View>
                                    <Spacer space={5} />
                                    <BPText style={{fontSize:12}}>Add to whitelist</BPText>
                                </TouchableOpacity>
                           
                                <TouchableOpacity style={{borderWidth:1, borderRadius:4, borderColor: Colors.white, paddingVertical:8 , paddingHorizontal:8, flexDirection:'row', alignItems:'center'}}>
                                    <View style={{backgroundColor: Colors.white, color: Colors.primeBG, borderRadius:7, width:14,height:14, justifyContent:"center", alignContent:'center'}}>
                                    <Text  style={{textAlign:'center'}}>-</Text>
                                    </View>
                                    <Spacer space={5} />
                                    <BPText style={{fontSize:12}}>Remove from whitelist</BPText>
                                </TouchableOpacity>
                           
                                <TouchableOpacity style={{borderWidth:1, borderRadius:4, borderColor: Colors.white, paddingVertical:8 , paddingHorizontal:8, flexDirection:'row', alignItems:'center'}}>
                                <View style={{backgroundColor: Colors.white, color: Colors.primeBG, borderRadius:7, width:14,height:14, justifyContent:"center", alignContent:'center'}}>
                                    <Text  style={{textAlign:'center'}}>-</Text>
                                    </View>
                                    <Spacer space={5} />
                                    <BPText style={{fontSize:12}}>Delete</BPText>
                                </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8,backgroundColor:Colors.darkGray, justifyContent:'space-between', alignItems:'center'}}>
                                <BPText style={{fontSize:12}}>Only display whitelisted addresses</BPText>
                                <TouchableOpacity style={{borderWidth:1, borderRadius:4, borderColor: Colors.white, paddingVertical:8 , paddingHorizontal:16}}>
                                    <BPText style={{fontSize:12}}>All</BPText>
                                </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8,backgroundColor:Colors.primeBG, justifyContent:'space-between', alignItems:'center'}}>
                                <BPInput 
                                borderRadius={45}
                                style={{fontSize:12, }}
                                placeholder={"Coin Name"}
                                text={query} setText={(t)=> setquery(t)}
                                rightborderLeftWidth= {0}
                                rightEl={<Image source={Images.market_chart_icon} style={{width:10, height:10}}/> }
                                />
                            
                    </View>


                    <View style={{flex:1, marginHorizontal:16, marginTop:5}}>

                                <ListItem item={{id:'iusidu2232'}}   onPress={()=> handleWhitelist()}/>
                                <ListItem id={'uipkswk872'} onPress={()=> handleWhitelist()}/>
                                <ListItem id={'uipks1k872'} onPress={()=> handleWhitelist()}/>
                       </View>

                    <Modal isVisible={isVisible} onBackButtonPress={()=> showModal()} style={{justifyContent: 'flex-start'}}>
                        <BPText style={{marginVertical: 10}}>Add Address Management</BPText>
                        <View style={{backgroundColor: Colors.white, padding:16, borderRadius:14}}>
                            <View style={{borderColor: Colors.gray, borderWidth:1, }}>
                            <PickerComp
                                items={options}
                                pickerVal = {pickerOrderVal}
                                setPickerVal = {setPickerOrderVal}
                                color={Colors.gray}
                                chevronPositionTop= {16}
                                chevronColor= {Colors.gray}
                                height= {50}
                                marginLeft={-5}
                                width ={Dimensions.get("window").width -10}
                                scale={0.9}
                                
                            /> 
                                               
                            </View>
                            <View style={{borderColor: Colors.gray, borderWidth:1, marginTop:8, paddingHorizontal:16,}}>
                                <TextInput
                                    placeholder="Label"
                                    placeholderTextColor={Colors.gray}
                                    value={label}
                                    onChangeText ={(t)=> setlabel(t)}
                                    style={{color: Colors.gray}}
                                    underlineColorAndroid="transparent"
                                />
                                               
                            </View>
                            <View style={{borderColor: Colors.gray, borderWidth:1, marginTop:8, paddingHorizontal:16,}}>
                                <TextInput
                                        placeholder="Address"
                                        placeholderTextColor={Colors.gray}
                                        value={address}
                                        onChangeText ={(t)=> setaddress(t)}
                                        style={{color: Colors.gray}}
                                        underlineColorAndroid="transparent"
                                    />
                                               
                                </View>
                            <TouchableOpacity  onPress={()=> handleCheckBox()} style={{marginTop:8,flexDirection:'row', justifyContent:'flex-start', alignItems:'center',  marginLeft:-10}}>
                            
                                <CheckBox checked={check} color={Colors.darkGray}/>
                                
                                <Text style={{marginLeft:15}}>Discussion with Client</Text>
                                 
                            
                            </TouchableOpacity>
                            <View style={{marginTop:8,}}>

                                <BPButton borderRadius={0} backgroundColor={Colors.darkGray} label={"Submit"} textColor={Colors.white} />
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

const ListItem = ({item, id, onPress}) =>{
    return(
        <View style={{flexDirection:'row',justifyContent:'space-around', alignItems:'flex-start', borderWidth:1, borderColor: Colors.lightWhite, paddingVertical:12, backgroundColor: Colors.darkGray, marginBottom:10, marginVertical:5}}>
                                    
                                    <View style={{flex:0.5, justifyContent:'center', alignItems:"center"}}>
                                        <TouchableOpacity onPress={()=> onPress(item)} style={{borderColor: Colors.white, borderWidth:1, padding:5, width:10}}>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={{flex:1}}>
                                        <BPText style={{color: Colors.lightWhite, fontSize:12}}>Coin</BPText>
                                        <BPText style={{fontSize:12}}>BTC</BPText>
                                    </View>
                                    <View style={{flex:1}}>
                                        <BPText style={{color: Colors.lightWhite, fontSize:12}}>Label</BPText>
                                        <BPText style={{fontSize:12}}>Wallet</BPText>
                                    </View>
                                    <View style={{flex:2}}>
                                        <BPText style={{color: Colors.lightWhite, fontSize:12}}>Label</BPText>
                                        <BPText style={{fontSize:12}}>jhgskdfdslfhsli</BPText>
                                    </View>
                                    <View style={{flex:1, alignItems:'center'}}>
                                        <BPText style={{color: Colors.lightWhite, fontSize:12}}>Whitelist</BPText>
                                        <Image source={Images.star_icon} style={{width:10, height:10, marginTop:2}}/>
                                    </View>

                                </View>
    )
}

export default AddressManagement
