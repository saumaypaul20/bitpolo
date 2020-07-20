import React, { useState } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Images, Fonts } from '../../theme'
import BPText from '../../common/BPText/BPText'
import PickerComp from '../PickerComp/PickerComp'
import InputCounter from '../InputCounter/InputCounter'
import Spacer from '../../common/Spacer/Spacer'
import BPButton from '../../common/BPButton/BPButton'


const Tab =({label , onPress, active, type}) =>{
    return (
        <TouchableOpacity style={{ flex:1, justifyContent:'center', alignItems:'center', flexDirection:'row', borderBottomColor:Colors.white, borderBottomWidth: active === type ? 1 : 0 , paddingVertical:10}} onPress={()=>onPress()}>
                    <BPText style={{marginHorizontal:10}}>{label}</BPText>
                </TouchableOpacity>
    )
}

const TradesOrderTabs = () => {
    const [tab, settab] = useState(1)
    const [inramount, setinramount] = useState('')
    const [cryptoamount, setcryptoamount] = useState('')
    const [total, settotal] = useState('')
    const [pickerOrderVal, setPickerOrderVal] = useState({label:"Limit Order", value:"limit"})
    const orderItems = [{label:"Limit Order", value:"limit"}, {label:"Market Order", value:"market"}]

    const onsubmit = ()=>{
        if(tab === 1 ){

        }else{

        }
    }

    const onIncreaseINR = () => {
        let amt = inramount ? inramount : 0
        setinramount((parseInt(amt) + 1).toString())
    }
    const onDecreaseINR = () => {
        if(inramount  < 1) {return}
        let amt = inramount ? inramount : 0
        setinramount((parseInt(amt) - 1).toString())
    }
    const onIncreaseCRYPTO = () => {
        let amt = cryptoamount ? cryptoamount : 0
         
        setcryptoamount((parseInt(amt) + 1).toString())
    }
    const onDecreaseCRYPTO = () => {
        if(cryptoamount  < 1) {return}
        let amt = cryptoamount ? cryptoamount : 0
        setcryptoamount((parseInt(amt) - 1).toString())
    }

    return (
        <View>

            <View style={{justifyContent:'space-around', alignItems:'center', backgroundColor: Colors.darkGray2, alignSelf:'stretch', flexDirection:'row'}}>
                <Tab label ="Buy" active={tab} type={1} onPress={()=>settab(1)}/>
                <Tab label ="Sell" active={tab}  type={2} onPress={()=>settab(2)}/>
            </View>

            <View style={{  flexDirection:'row', alignSelf:'stretch', justifyContent:'flex-end', paddingVertical:15, alignItems:'center'}}>
                
                <View style={{flex:0.6, borderRadius:4, alignSelf:'flex-start'}}>
                        <PickerComp
                            items={orderItems}
                            pickerVal = {pickerOrderVal}
                            setPickerVal = {setPickerOrderVal}
                            chevronPositionTop= {3}
                            height= {20}
                            scale={0.8}
                            color={Colors.white}
                        />
                    </View>
            
            </View>

            <View style={{marginRight:16, marginLeft:3}}>
                <InputCounter label=  {pickerOrderVal == "limit" ?"Amount in INR" : "Market"} disabled={pickerOrderVal == "market"} onInputChange={(t)=> setinramount(t)} input={inramount} onIncrease={onIncreaseINR} onDecrease={onDecreaseINR}/> 

                <Spacer space={8}/>

                <InputCounter label={`Amount in BTC`} onInputChange={(t)=> setcryptoamount(t)} input={cryptoamount} onIncrease={onIncreaseCRYPTO} onDecrease={onDecreaseCRYPTO}/>

                <Spacer space={4}/>

                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-around', padding:4, opacity:0.5}}>
                        <BPText style={styles.percentages}>25%</BPText>
                        <BPText style={styles.percentages}>50%</BPText>
                        <BPText style={styles.percentages}>75%</BPText>
                        <BPText style={styles.percentages}>100%</BPText>
                </View>

                <Spacer space={17}/>

               {pickerOrderVal == "limit" &&  <>
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    {/* <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Total (BDX)</BPText> */}
                    <InputCounter label={`Total ()`} onInputChange={(t)=> settotal(t)} input={total} /> 
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                    <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Avbl</BPText>
                    <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>{`0`} BTC</BPText>
                </View>
                </>}

                <Spacer space={8}/>

                <View style={{ alignSelf:'stretch'}}>
                    <BPButton backgroundColor={tab === 1? Colors.lightGreen: Colors.red} textColor={Colors.white} label={tab === 1 ? "Buy": "Sell"} width="auto" onPress={()=> onsubmit()}/>
                </View>
            </View>
        </View>
    )
}



const styles= StyleSheet.create({
    percentages:{borderWidth:1, borderStyle:'dashed', borderColor: Colors.lightWhite, borderRadius:1, padding:6, textAlign:'center'}
})


export default TradesOrderTabs
