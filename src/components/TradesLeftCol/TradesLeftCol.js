import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import BPText from '../../common/BPText/BPText'
import { Images, Colors } from '../../theme'
import BPBarChart from '../BPBarChart/BPBarChart'
import PickerComp from '../PickerComp/PickerComp'
import { useNavigation } from '@react-navigation/native'
import { screenNames } from '../../routes/screenNames/screenNames'
import { emitDepthSubscribeEvent } from '../../api/config.ws'
import { useSelector, shallowEqual } from 'react-redux'
import FlatLists from "./FlatList"
import _ from 'lodash'
import { equalityFnMarket, equalityFnDepths, equalityFnIndexPrice } from '../../utils/reduxChecker.utils'
let id = 0


const ListItem = ({ item, type }) => {
    console.log("ListItem")
    return (
        <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between', marginVertical: 3, paddingVertical: 2, marginHorizontal: 16, }}>
            <BPText style={{ fontSize: 12, color: type == 1 ? Colors.red : Colors.lightGreen }}>{item.a.toFixed(2)}</BPText>
            <BPText style={{ fontSize: 12, color: type == 1 ? Colors.red : Colors.lightGreen }}>{item.p.toFixed(2)}</BPText>

        </View>
    )
}
const TradesLeftCol = () => {
    // console.log("trades left reload +++++++++++++++++", id);
    // id++

    const navigation = useNavigation();

    let index_price = useSelector(state => state.marketReducer.index_price, equalityFnIndexPrice)
    // const depths = useSelector(state=> state.depthSubsReducer.data)
    const asks = useSelector(state => state.depthSubsReducer.asks, equalityFnDepths)
    const bids = useSelector(state => state.depthSubsReducer.bids, equalityFnDepths)
    const activeTradePair = useSelector(state => state.marketReducer.activeTradePair, shallowEqual)
    console.log("depths asks left **********", asks)
    console.log("depths bids left **********", bids)
    // console.log("market ata ^^^^^^^^^^^^^^^^^^",market_data)

    const currencies = useSelector(state => state.marketReducer.currencies.find(i => i.value === activeTradePair), shallowEqual)
    const market_data = useSelector(state => state.marketReducer.data.find(i => i.params[0] === activeTradePair), shallowEqual)
    const [list1val, setList1Val] = useState(null)
    const [list2val, setList2Val] = useState(null)
    const [lineNumbers, setlineNumbers] = useState(9)
    const [height, setheight] = useState(245)
    const [activeBPchart, setactiveBPchart] = useState("0")
    const list1 = [{ label: "Default", value: "0" }, { label: "Sells", value: "sells" }, { label: "Buys", value: "buys" }]
    const list2 = [{ label: "6 Decimals", value: "val1" }]

    const onBPValChange = (val) => {
        setList1Val(val)

        switch (val) {
            case "0":
                setlineNumbers(9)
                setheight(245)
                setactiveBPchart("0")
                break
            default:
                setheight(500)

                setactiveBPchart(val)
                setlineNumbers(18)
        }
    }
    const OpenOrders = () => {
        navigation.navigate(screenNames.ORDERS)
    }
    // useEffect(() => {
    //     console.log("statt e,mit")
    //   setTimeout(() => {
    //       if(!activeTradePair){return }
    //      emitDepthSubscribeEvent(activeTradePair)
    //   }, 2000);
    //  }, [activeTradePair])

    // {found?.divider.b === "USDT" ? (parseFloat(found?.params[1]?.l)* index_price.find(i=> i.asset === "USDT").amount).toFixed(2): (parseFloat(found?.params[1]?.l)/ index_price.find(i=> i.asset === "USDT").amount).toFixed(2)}

    const currentMarketPrice = () => {
        let found = market_data
        //console.log("ABCD#####", found)
        if (found) {
            return <BPText style={{ color: parseFloat(found.params[1].cp) > -1 ? Colors.lightGreen : Colors.red, padding: 5 }}>{`${parseFloat(found.params[1].l).toFixed(2)} ${found?.divider.b === "USDT" ? (parseFloat(found?.params[1]?.l) * index_price.find(i => i.asset === "USDT").amount).toFixed(2) : (parseFloat(found?.params[1]?.l) / index_price.find(i => i.asset === "USDT").amount).toFixed(2)}`}</BPText>
        }
    }
    const renderItem1 = ({ item }) => (<ListItem item={item} type={1} />)
    const renderItem2 = ({ item }) => (<ListItem item={item} />)

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.darkGray2, alignSelf: 'stretch', paddingVertical: 10, }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }} onPress={() => OpenOrders()}>
                    <Image source={Images.open_orders_icon} style={{ width: 20, height: 20 }} />
                    <BPText style={{ marginHorizontal: 10 }}>Open Orders</BPText>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-around', paddingVertical: 15, alignItems: 'center' }}>

                <BPText style={{ fontSize: 10 }}>{`Amount(${currencies?.a})`}</BPText>
                <BPText style={{ fontSize: 10 }}>{`Price(${currencies?.b})`}</BPText>

            </View>


            {/* Red Chart 1 */}
            {(activeBPchart === "sells" || activeBPchart === "0") && <View style={{ height: height, alignSelf: 'stretch', width: '97%' }}>
                {/* {asks?.length > 0 ? <BPBarChart data={_.sortBy(asks, 'price').slice(asks.length - lineNumbers).reverse()} color={Colors.lightRed} rightTextColor={Colors.red}/> : <ActivityIndicator size="large" color={Colors.white} />} */}
                {asks?.length > 0 ?
                    // <FlatList
                    //     data={asks}
                    //     renderItem={renderItem1}
                    //     //Setting the number of column
                    //     getItemLayout={(data, index) => {
                    //         return {
                    //             index,
                    //             length: 30, // itemHeight is a placeholder for your amount
                    //             offset: index * 30,
                    //         }
                    //     }}
                    //     keyExtractor={(item, index) => index.toString()}
                    // />
                    <FlatLists data={asks} lineNumbers={lineNumbers} type={1}></FlatLists>
                    : <ActivityIndicator size="large" color={Colors.white} />}
            </View>
            }
            {/* Divider with Value */}
            <View style={{ height: 40, alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', width: '97%' }}>

                <View style={{ borderWidth: 1, borderColor: Colors.gray, borderStyle: "dashed", alignSelf: 'stretch', borderRadius: 1 }} />

                {currentMarketPrice()}

                <View style={{ borderWidth: 1, borderColor: Colors.gray, borderStyle: "dashed", alignSelf: 'stretch', borderRadius: 1 }} />
            </View>

            {/* Red Chart 2 */}
            {/* {(activeBPchart === "buys" || activeBPchart === "0") && <View style={{height:height,  alignSelf:'stretch', paddingBottom:2,width:'97%'}}>
                {bids?.length > 0 ? <BPBarChart data={_.sortBy(bids, 'price').slice(0,lineNumbers)} color={'rgba(46, 213, 115, 0.3)'} rightTextColor={Colors.lightGreen}/> :  <ActivityIndicator size="large" color={Colors.white} />} */}
            {(activeBPchart === "buys" || activeBPchart === "0") && <View style={{ height: height, alignSelf: 'stretch', paddingBottom: 2, width: '97%' }}>
                {bids?.length > 0 ?
                    // <FlatList
                    //     data={bids}
                    //     renderItem={renderItem2}
                    //     getItemLayout={(data, index) => {
                    //         return {
                    //             index,
                    //             length: 30, // itemHeight is a placeholder for your amount
                    //             offset: index * 30,
                    //         }
                    //     }}
                    //     //Setting the number of column
                    //     style={{ alignSelf: 'stretch' }}
                    //     keyExtractor={(item, index) => index.toString()}
                    // />
                    <FlatLists data={bids} lineNumbers={lineNumbers} type={0}></FlatLists>
                    : <ActivityIndicator size="large" color={Colors.white} />}
            </View>
            }
            <View style={{ alignSelf: 'stretch', flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 8 }}>
                <View style={{ flex: 1, borderRadius: 2, borderTopRightRadius: 0, borderBottomRightRadius: 0, alignSelf: 'stretch', borderWidth: 1, borderColor: Colors.gray, opacity: 0.8 }}>
                    <PickerComp
                        items={list1}
                        pickerVal={list1val}
                        setPickerVal={(val) => onBPValChange(val)}
                        chevronPositionTop={5}
                        chevronPositionRight={0}
                        chevronSize={10}
                        height={20}
                        width={140}
                        scale={0.7}
                        color={Colors.white}
                        marginLeft={-20}
                    />

                </View>
                <View style={{ flex: 1, borderRadius: 2, borderTopLeftRadius: 0, borderBottomLeftRadius: 0, alignSelf: 'stretch', borderWidth: 1, borderColor: Colors.gray, opacity: 0.8 }}>
                    <PickerComp
                        items={list2}
                        pickerVal={list2val}
                        setPickerVal={setList2Val}
                        chevronPositionTop={5}
                        chevronPositionRight={0}
                        chevronSize={10}
                        height={20}
                        width={140}
                        scale={0.7}
                        color={Colors.white}
                        marginLeft={-20}
                    />
                </View>
            </View>
        </View>
    )
}

export default TradesLeftCol
