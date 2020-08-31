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
            height={props.height}
            asks={asks}
            bids={bids} />
    )
}