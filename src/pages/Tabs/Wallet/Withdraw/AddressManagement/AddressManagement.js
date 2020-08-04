import React, { useState, useCallback, useEffect } from 'react'
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
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../../../../routes/screenNames/screenNames'
import { useSelector, shallowEqual } from 'react-redux'

const AddressManagement = () => {
    const navigation= useNavigation()
    let today = new Date()
     
    const filter= [
        {label: 'All', value: 'all'},
        {label: 'Whitelisted', value: 'whitelisted'},
        {label: 'UnWhitelisted', value: 'unwhitelisted'},
        
    ]

    const [options, setoptions] = useState([{label: 'Select Coin...', value: null}])
    const [pickerOrderVal, setPickerOrderVal] = useState({label: 'Select Coin', value: null})
    const [filterval, setfilterval] = useState({label: 'Select Coin', value: null})
    const user = useSelector(state=>state.authReducer.auth_attributes, shallowEqual);
    console.log(user)
    let [date1, setDate1] = useState(today);
    let [date2, setDate2] = useState(today);
    const [query, setquery] = useState('')
    const [address, setaddress] = useState('')
    const [label, setlabel] = useState('')
    const [check, setcheck] = useState(false);
    const [isVisible, setVisible] = useState(false)
    const [queue, setqueue] = useState([])
    const [whitelist, setwhitelist] = useState([])
    const items = [{id:'khdjfbksh3'}, {id:'62768332423'}, {id:'87389ndfe'}];
    const assetList = useSelector(state=>state.walletReducer.assets)
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => useCallback(setIsEnabled(previousState => !previousState),[]);
    
    useEffect(() => {
        let arr = assetList.map(i=>{
            let arr = options;
            let item = {
                label: i.asset_code,
                value: i._id
            }

           return item
            
        })
        setoptions(arr)
    }, [])
    const showModal =()=>{
        setVisible(!isVisible)
        setaddress('')
        setlabel('')
    }

    const onAddWithdrawAddress = async ()=>{
        let coin= options.find(i=>
           pickerOrderVal === i.value 
             
        )
        console.log("coin", coin)
        if(!coin){ return }

        if(pickerOrderVal === null){return }
        
        let body ={
            data:{
                attributes:{
                    asset: pickerOrderVal,
                    address: address,
                    label: label,
                    coin: coin.label,
                    is_whitelist: check,
                }
            }
        }
        if(user.attributes.google_auth){
            navigation.navigate(screenNames.GOOGLE_VERIFICATION_CODE, {payload:body,type:'withdraw address', id: user.id})
        }else{
            navigation.navigate(screenNames.OTP_SCREEN, {payload:body, type:'withdraw address'})
        }

        showModal()
    }
    const handleCheckBox = useCallback(()=>{
        setcheck(!check)
    },[check])

    const onStarPress =(item)=>{
        if(whitelist.length>0 && whitelist?.find(i=> i.id === item.id)){
            let arr = whitelist.filter(i=> i.id !== item.id);
            setwhitelist(arr)
        }else{
            let arr = whitelist.concat([item])
            setwhitelist(arr)
        }
    }

    const handleWhitelist = useCallback((item) =>{
        if(queue.length>0 && queue?.find(i=> i.id === item.id)){
            let arr = queue.filter(i=> i.id !== item.id);
            setqueue(arr)
        }else{
            let arr = queue.concat([item])
            setqueue(arr)
        }
    })

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

                            <QuickButtons disabled={queue.length === 0} label={"Add to whitelist"} onPress={()=> console.log("i")}/>
                            <QuickButtons disabled={queue.length === 0} label={"Remove from whitelist"} onPress={()=> console.log("i")}/>
                            <QuickButtons disabled={queue.length === 0} label={"Delete"} onPress={()=> console.log("i")}/>
                               
                    </View>
                    <View style={{flexDirection:'row', paddingHorizontal:16, paddingVertical:8,backgroundColor:Colors.darkGray, justifyContent:'space-between', alignItems:'center'}}>
                                <BPText style={{fontSize:12}}>Only display whitelisted addresses</BPText>
                                <View style={{borderWidth:1, borderRadius:4, borderColor: Colors.white, paddingVertical:8 ,}}>
                                <PickerComp
                                items={filter}
                                pickerVal = {filterval}
                                setPickerVal = {setfilterval}
                                color={Colors.white}
                                chevronPositionTop= {10}
                                chevronColor= {Colors.white}
                                marginLeft={0}
                                width ={80}
                                scale={0.9}
                            /> 
                                </View>
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
                            {
                                items.map((item, index)=>{
                                    return <ListItem active={queue.length>0 && queue.find(i=> item.id=== i.id )? true : false} item={item} key={item.id}  onPress={()=> handleWhitelist(item)} onStarPress={()=> onStarPress(item)} isWhitelist={whitelist.length>0 && whitelist?.find(i=> i.id == item.id)}/>
                                })
                            }
                                
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
                            <TouchableOpacity  onPress={()=> handleCheckBox()} style={{marginVertical:12,flexDirection:'row', justifyContent:'flex-start', alignItems:'center',  marginLeft:-10}}>
                            
                                <CheckBox checked={check} color={Colors.darkGray}/>
                                
                                <Text style={{marginLeft:15}}>Add to Whitelist</Text>
                                 
                            
                            </TouchableOpacity>
                            <View style={{marginTop:8,}}>

                                <BPButton borderRadius={0} backgroundColor={Colors.darkGray} label={"Submit"} textColor={Colors.white} onPress={()=> onAddWithdrawAddress()} />
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>
        </SafeAreaView>
    )
}

const ListItem = ({item, active, onPress, onStarPress, isWhitelist}) =>{
    return(
        <View style={{flexDirection:'row',justifyContent:'space-around', alignItems:'flex-start', borderWidth:1, borderColor: Colors.lightWhite, paddingVertical:12, backgroundColor: Colors.darkGray, marginBottom:10, marginVertical:5}}>
                                    
                                    <View style={{flex:0.5, justifyContent:'center', alignItems:"center"}}>
                                        <TouchableOpacity onPress={()=> onPress(item)} style={{borderColor: Colors.white, borderWidth:1, padding:5, width:10,height:10, justifyContent
                                        :'center', alignItems:'center'}}>
                                               { active && <View style={{backgroundColor:Colors.white, width:5, height:5}} />}

                                                 
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
                                        <BPText style={{fontSize:12}}>{item.id}</BPText>
                                    </View>
                                    <View style={{flex:1, }}>
                                       <TouchableOpacity style={{alignItems:'center'}} onPress={()=> onStarPress(item)}>
                                        <BPText style={{color: Colors.lightWhite, fontSize:12}}>Whitelist</BPText>
                                        <Image source={!isWhitelist ?Images.star_icon : Images.star_active} style={{width:10, height:10, marginTop:2}}/>
                                       </TouchableOpacity>
                                    </View>

                                </View>
    )
}


const QuickButtons = ({onPress, label, disabled}) =>{
    return (
        <TouchableOpacity disabled={disabled} onPress={()=> onPress()} style={{borderWidth:1, borderRadius:4, borderColor: Colors.white, paddingVertical:8 , paddingHorizontal:8, flexDirection:'row', alignItems:'center', opacity: disabled ? 0.5:1}}>
            <View style={{backgroundColor: Colors.white, color: Colors.primeBG, borderRadius:7, width:14,height:14, justifyContent:"center", alignContent:'center'}}>
            <Text  style={{textAlign:'center'}}>+</Text>
            </View>
            <Spacer space={5} />
            <BPText style={{fontSize:12}}>{label}</BPText>
        </TouchableOpacity>
    )
}
export default AddressManagement
