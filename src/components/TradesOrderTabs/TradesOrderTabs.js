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
import { cos } from 'react-native-reanimated'

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
    const [inramount, setinramount] = useState(0)
    const [cryptoamount, setcryptoamount] = useState(0)
    const [total, settotal] = useState(0)
    const [range, setrange] = useState(null)
    const [tradeDetail, setTradeDetail] = useState(null)
    const [parts,] = useState([25, 50, 75, 100])
    const [pickerOrderVal, setPickerOrderVal] = useState({ label: "Limit Order", value: "limit" })
    const orderItems = [{ label: "Limit Order", value: "limit" }, { label: "Market Order", value: "market" }]
    const activeTradePair = useSelector(state => state.marketReducer.activeTradePair, shallowEqual)
    const balance = useSelector(state => state.walletReducer.balance.data[divideIt(activeTradePair).b], shallowEqual);
    const currencies = useSelector(state => state.marketReducer.currencies.find(i => i.value === activeTradePair), shallowEqual)
    const market_data = useSelector(state => state.marketReducer.data.find(i => i.params[0] === activeTradePair), shallowEqual)
    const getMatchingMarket = async () => {
        let res = await getMatchingMarketList();
        //console.log("getMatchingMarketList", JSON.stringify(res));
        if (res.status) {
            res.data[0].map((i, value) => {
                console.log("getMatchingMarketList", i, value)
                console.log("getMatchingMarketList", Object.keys(i))
                let tt = Object.keys(i)[0];
                console.log("getMatchingMarketList", i[tt].filter((key) => key.name == activeTradePair)[0])
                if (i[tt].filter((key) => key.name == activeTradePair).length > 0) {
                    console.log('getMatchingMarketList1', i[tt].filter((key) => key.name == activeTradePair))
                    setTradeDetail(i[tt].filter((key) => key.name == activeTradePair)[0])
                }

                //console.log("getMatchingMarketList", pair)
            }
            )
            //console.log("activeTradePair", activeTradePair)

        }
    }

    useEffect(() => {
        getMatchingMarket();
    }, [activeTradePair]);

    useEffect(() => {
        if (market_data) {
            if (tradeDetail) {
                setPrice(parseFloat(market_data.params[1].l).toFixed(tradeDetail.money_prec))
            }
        }
    }, [tradeDetail])


    const setTotal = (t) => {
        settotal(t.toString())

    }
    const onsubmit = () => {
        if (tab === 1) {

        } else {

        }
    }
    const setPrice = (t) => {
        let amt = cryptoamount ? cryptoamount : 0;
        setinramount(t);
        setTotal(parseFloat(t * amt).toFixed(tradeDetail.money_prec))
    }
    const changeAmount = (t, type) => {
        console.log("total", t, type)
        if (type == 'inramount') {
            let amt = parseFloat(t);
            setinramount(amt.toFixed(tradeDetail.stock_prec))
            setTotal((amt * cryptoamount).toFixed(tradeDetail.money_prec))
        } else if (type == 'cryptoamount') {
            let crpt = parseFloat(t)
            setcryptoamount(crpt.toFixed(tradeDetail.stock_prec))
            setTotal((t * inramount).toFixed(tradeDetail.money_prec))
        }
        else if (type == 'total') {
            console.log("total", (parseFloat(t) / inramount).toFixed(tradeDetail.money_prec))
            setTotal(parseFloat(t).toFixed(tradeDetail.money_prec))
            setcryptoamount((parseFloat(t) / inramount).toFixed(tradeDetail.money_prec))
        }

    }

    const onIncreaseINR = () => {
        let amt = inramount ? inramount : 0
        setinramount((parseFloat(amt) + (1 / Math.pow(10, tradeDetail.money_prec))).toFixed(tradeDetail.money_prec).toString())
        //setcryptoamount((100 * amt).toString())
    }
    const onDecreaseINR = () => {
        if (inramount == 0) { return }
        let amt = inramount ? inramount : 0
        setinramount((parseFloat(amt) - (1 / Math.pow(10, tradeDetail.money_prec))).toFixed(tradeDetail.money_prec).toString())
    }
    const onIncreaseCRYPTO = () => {
        let amt = cryptoamount ? cryptoamount : 0;
        setcryptoamount((parseFloat(amt) + (1 / Math.pow(10, tradeDetail.stock_prec))).toFixed(tradeDetail.stock_prec).toString())
    }
    const onDecreaseCRYPTO = () => {
        if (cryptoamount == 0) { return }
        let amt = cryptoamount ? cryptoamount : 0
        setcryptoamount((parseFloat(amt) - (1 / Math.pow(10, tradeDetail.stock_prec))).toFixed(tradeDetail.stock_prec).toString())
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
                        onInputChange={(t) => changeAmount(t, 'inramount')} input={inramount} onIncrease={onIncreaseINR} onDecrease={onDecreaseINR} />
                }

                <Spacer space={8} />
                {pickerOrderVal == "market" ? <>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        {/* <BPText style={{opacity:0.5, fontFamily: Fonts.FONT_MEDIUM}}>Total (BDX)</BPText> */}
                        <InputCounter label={`Total (${divideIt(activeTradePair).b})`} onInputChange={(t) => setTotal(t)} input={total} onIncrease={onIncreaseTOTAL} onDecrease={onDecreaseTOTAL} />
                    </View></>
                    :
                    <InputCounter label={`Amount  ${divideIt(activeTradePair).a}`} onInputChange={(t) => changeAmount(t, 'cryptoamount')} input={cryptoamount} onIncrease={onIncreaseCRYPTO} onDecrease={onDecreaseCRYPTO} />
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

                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.darkGray3, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <BPText style={{ opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM }}>Total</BPText>
                    </View>
                    <View style={{ flex: 3, backgroundColor: "red" }}>
                        <InputCounter onInputChange={(t) => changeAmount(t, 'total')} input={total} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <BPText style={{ opacity: 0.5, fontFamily: Fonts.FONT_MEDIUM }}>{divideIt(activeTradePair).b}</BPText>
                    </View>



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
