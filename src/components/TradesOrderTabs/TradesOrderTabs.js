import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Colors, Images, Fonts } from '../../theme'
import BPText from '../../common/BPText/BPText'
import PickerComp from '../PickerComp/PickerComp'
import InputCounter from '../InputCounter/InputCounter'
import Spacer from '../../common/Spacer/Spacer'
import BPButton from '../../common/BPButton/BPButton'
import { useSelector, shallowEqual } from 'react-redux'
import { splitIt } from '../../utils/converters'
import { getMatchingMarketList } from '../../api/markets.api'

const divideIt = (i) => {
    let divider = {}
    if (i.match("INR")) {
        divider = splitIt(i, "INR")
    } else if (i.match("USDT")) {
        divider = splitIt(i, "USDT")
    }
    return divider
}
const Tab = ({ label, onPress, active, type }) => {
    return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderBottomColor: Colors.white, borderBottomWidth: active === type ? 1 : 0, paddingVertical: 10 }} onPress={() => onPress()}>
            <BPText style={{ marginHorizontal: 10 }}>{label}</BPText>
        </TouchableOpacity>
    )
}

const TradesOrderTabs = () => {
    //alert("ordertabs")
    const [tab, settab] = useState(1)
    const [inramount, setinramount] = useState('')
    const [cryptoamount, setcryptoamount] = useState('')
    const [total, settotal] = useState(parseInt(inramount) * parseInt(cryptoamount))
    const [range, setrange] = useState(null)
    const [parts,] = useState([25, 50, 75, 100])
    const [pickerOrderVal, setPickerOrderVal] = useState({ label: "Limit Order", value: "limit" })
    const orderItems = [{ label: "Limit Order", value: "limit" }, { label: "Market Order", value: "market" }]
    const activeTradePair = useSelector(state => state.marketReducer.activeTradePair, shallowEqual)
    const balance = useSelector(state => state.walletReducer.balance.data[divideIt(activeTradePair).b], shallowEqual);
    const currencies = useSelector(state => state.marketReducer.currencies.find(i => i.value === activeTradePair), shallowEqual)
    const market_data = useSelector(state => state.marketReducer.data.find(i => i.params[0] === activeTradePair), shallowEqual)
    const getMatchingMarket = async () => {
        let res = await getMatchingMarketList();
        //console.log("getMatchingMarketList", res);
    }

    useEffect(() => {
        getMatchingMarket();
    }, []);

    useEffect(() => {
        if (market_data) {
            setPrice(market_data.params[1].l)
        }

    }, [])

    const setTotal = (t) => {
        settotal(t.toString())

    }
    const onsubmit = () => {
        if (tab === 1) {

        } else {

        }
    }
    const setPrice = (t) => {
        let amt = cryptoamount ? cryptoamount : 0
        setinramount(t);
        setTotal(t * amt)
    }
    const changeAmount = (t) => {
        setcryptoamount(t)
        setTotal(t * inramount)
    }

    const onIncreaseINR = () => {
        let amt = inramount ? inramount : 0
        setinramount((parseInt(amt) + 1).toString())
        //setcryptoamount((100 * amt).toString())
    }
    const onDecreaseINR = () => {
        if (inramount < 1) { return }
        let amt = inramount ? inramount : 0
        setinramount((parseInt(amt) - 1).toString())
    }
    const onIncreaseCRYPTO = () => {
        let amt = cryptoamount ? cryptoamount : 0

        setcryptoamount((parseInt(amt) + 1).toString())
    }
    const onDecreaseCRYPTO = () => {
        if (cryptoamount < 1) { return }
        let amt = cryptoamount ? cryptoamount : 0
        setcryptoamount((parseInt(amt) - 1).toString())
    }
    const onIncreaseTOTAL = () => {
        let amt = total ? total : 0

        settotal((parseInt(amt) + 1).toString())
    }
    const onDecreaseTOTAL = () => {
        if (total < 1) { return }
        let amt = total ? total : 0
        settotal((parseInt(amt) - 1).toString())
    }

    return (
        <View>
            <View style={{ justifyContent: 'space-around', alignItems: 'center', backgroundColor: Colors.darkGray2, alignSelf: 'stretch', flexDirection: 'row' }}>
                <Tab label="Buy" active={tab} type={1} onPress={() => settab(1)} />
                <Tab label="Sell" active={tab} type={2} onPress={() => settab(2)} />
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-end', paddingVertical: 15, alignItems: 'center' }}>
                <View style={{ flex: 0.6, borderRadius: 4, alignSelf: 'flex-start' }}>
                    <PickerComp
                        items={orderItems}
                        pickerVal={pickerOrderVal}
                        setPickerVal={setPickerOrderVal}
                        chevronPositionTop={3}
                        height={20}
                        scale={0.8}
                        color={Colors.white}
                    />
                </View>
            </View>

            <View style={{ marginRight: 16, marginLeft: 3 }}>

                {pickerOrderVal == "market" ? <>
                    <InputCounter label={"Market"}
                        onInputChange={(t) => changeAmount(t)} input={inramount} />
                </> :

                    <InputCounter label={"Amount in INR"} disabled={true}
                        onInputChange={(t) => changeAmount(t)} input={inramount} onIncrease={onIncreaseINR} onDecrease={onDecreaseINR} />
                }

                <Spacer space={8} />
                {pickerOrderVal == "market" ? <>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {/* <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Total (BDX)</BPText> */}
                        <InputCounter label={`Total (${divideIt(activeTradePair).b})`} onInputChange={(t) => setTotal(t)} input={total} onIncrease={onIncreaseTOTAL} onDecrease={onDecreaseTOTAL} />
                    </View></>
                    :
                    <InputCounter label={`Amount in ${divideIt(activeTradePair).a}`} onInputChange={(t) => changeAmount(t)} input={cryptoamount} onIncrease={onIncreaseCRYPTO} onDecrease={onDecreaseCRYPTO} />
                }
                <Spacer space={4} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', padding: 4, opacity: 0.5 }}>
                    {
                        parts.map((i, index) => {
                            return <TouchableOpacity key={index.toString()} onPress={() => setrange(i)}><BPText style={[styles.percentages, { opacity: range === i ? 1 : 0.7 }]}>{i}%</BPText></TouchableOpacity>
                        })
                    }
                </View>

                <Spacer space={17} />

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {/* <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Total (BDX)</BPText> */}
                    <InputCounter label={`Total (${divideIt(activeTradePair).b})`} onInputChange={(t) => setTotal(t)} input={total} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <BPText style={{ opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM }}>Avbl</BPText>
                    <BPText style={{ opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM }}>{`${balance.available.balance}`} {divideIt(activeTradePair).b}</BPText>
                </View>


                <Spacer space={8} />

                <View style={{ alignSelf: 'stretch' }}>
                    <BPButton backgroundColor={tab === 1 ? Colors.lightGreen : Colors.red} textColor={Colors.white} label={tab === 1 ? "Buy" : "Sell"} width="auto" onPress={() => onsubmit()} />
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    percentages: { borderWidth: 1, borderStyle: 'dashed', borderColor: Colors.white, color: Colors.white, borderRadius: 1, padding: 6, textAlign: 'center' }
})


export default TradesOrderTabs
