import React from 'react'
import DepthChartRenderer from './DepthChartRender'
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { Colors } from '../../theme'
import  _ from 'lodash'
import { equalityFnDepths } from '../../utils/reduxChecker.utils'
import HighChart from '../HighChart/HighChart'
 
export default function DepthChart(props) {
    

    const rawasks = useSelector(state=> state.depthSubsReducer.data?.params[1]?.asks, equalityFnDepths)
    const rawbids = useSelector(state=> state.depthSubsReducer.data?.params[1]?.bids, equalityFnDepths)
    // let askLen = rawasks.length
    const bidsD = _.sortBy(rawbids, 'amount').reverse() || []
    const asksD =  _.sortBy(rawasks, 'amount').reverse() || []
    // console.log("depths-----------",depths)

   
    // const { asks, bids } = props
    // let asks =[
    //     {
    //         total: "154123.56",
    //         price: "703102.44"
    //     },
    //     {
    //         total: "144123.56",
    //         price: "703302.44"
    //     },
    //     {
    //         total: "134123.56",
    //         price: "703202.44"
    //     },

    // ]
    // let bids =[
    //     {
    //         total: "14123.56",
    //         price: "701102.44"
    //     },
    //     {
    //         total: "114123.56",
    //         price: "713302.44"
    //     },
    //     {
    //         total: "124123.56",
    //         price: "703222.44"
    //     },

    // ]

    const rawAsks = [[
    0.1524,
    0.948665
],
[
    0.1539,
    35.510715
],
[
    0.154,
    39.883437
],
[
    0.1541,
    40.499661
],
[
    0.1545,
    43.262994000000006
],
[
    0.1547,
    60.14799400000001
],
[
    0.1553,
    60.30799400000001
],
[
    0.1558,
    60.55018100000001
],
[
    0.1564,
    68.381696
],
[
    0.1567,
    69.46518400000001
],
[
    0.1569,
    69.621464
],
[
    0.157,
    70.398015
],
[
    0.1574,
    70.400197
],
[
    0.1575,
    73.199217
],
[
    0.158,
    77.700017
],
[
    0.1583,
    79.449017
],
[
    0.1588,
    79.584064
],
[
    0.159,  
    80.584064
],
[
    0.16,
    81.58156
],
[
    0.1608,
    83.38156
]]

const rawBids = [
    [
        0.1435,
        242.521842
    ],
    [
        0.1436,
        206.49862099999999
    ],
    [
        0.1437,
        205.823735
    ],
    [
        0.1438,
        197.33275
    ],
    [
        0.1439,
        153.677454
    ],
    [
        0.144,
        146.007722
    ],
    [
        0.1442,
        82.55212900000001
    ],
    [
        0.1443,
        59.152814000000006
    ],
    [
        0.1444,
        57.942260000000005
    ],
    [
        0.1445,
        57.483850000000004
    ],
    [
        0.1446,
        52.39210800000001
    ],
    [
        0.1447,
        51.867208000000005
    ],
    [
        0.1448,
        44.104697
    ],
    [
        0.1449,
        40.131217
    ],
    [
        0.145,
        31.878217
    ],
    [
        0.1451,
        22.794916999999998
    ],
    [
        0.1453,
        12.345828999999998
    ],
    [
        0.1454,
        10.035642
    ],
    [
        0.148,
        9.326642
    ],
    [
        0.1522,
        3.76317
    ]
]

function processData(data, side) {
    return  data.map(item => {
        return {
            p: item.p,
            a: item.a,
            t: item.t
        }
    }).reduce((arr, item, idx) => {
    
        const bid = [
            
            Number(item.p),
           Number( item.a),
    ]   
    
        return [...arr, bid]
    }, [])
}

let asks = processData(asksD, 'ask')
asks =asks 
let bids = processData(bidsD, 'bid')
bids= bids 

    const asksProcessed = asks.map(item => {
        return {
            total: Number(item.total),
            price: Number(item.price),
            side: 'ask',
        }
    })
    const bidProcessed = bids.map(item => {
        return {
            total: Number(item.total),
            price: Number(item.price),
            side: 'bid',
        }
    })
    if(bidsD.length === 0 || asksD.length === 0) return <ActivityIndicator size="large" color={Colors.white}/>
    return (
        <HighChart
            asks={asks}
            bids={bids} />
    )
}