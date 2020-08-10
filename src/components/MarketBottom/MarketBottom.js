import React, { useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import BPText from '../../common/BPText/BPText'
import { Colors } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { useSelector, shallowEqual } from 'react-redux'
import FlatLists from "../../common/FlatlistComp/FlatList"
import _ from 'lodash'
import { equalityFnDepths, equalityFnIndexPrice } from '../../utils/reduxChecker.utils'

 
const MarketBottom = () => {

    //let index_price = useSelector(state => state.marketReducer.index_price, equalityFnIndexPrice)
    // const depths = useSelector(state=> state.depthSubsReducer.data)
    const asks = useSelector(state => state.depthSubsReducer.asks, equalityFnDepths)
    const bids = useSelector(state => state.depthSubsReducer.bids, equalityFnDepths)
    //const activeTradePair = useSelector(state => state.marketReducer.activeTradePair, shallowEqual)
    // console.log("depths asks left **********", asks)
    // console.log("depths bids left **********", bids)
    //const market_data = useSelector(state => state.marketReducer.data.find(i => i.params[0] === activeTradePair), shallowEqual)
    const [] = useState(null)
    const [] = useState(null)
    const [lineNumbers] = useState(10)
    const [height] = useState(245)
    const [] = useState("0")
  
     

    return (
        <View style={{ flexDirection:'row' , alignSelf:'stretch',}}>

            {/* Red Chart 1 */}
            { <View style={{  alignSelf: 'stretch', flex:1,  }}>
                
                {asks?.length > 0 ?
                     
                    <FlatLists data={asks} lineNumbers={lineNumbers} type={1}></FlatLists>
                    : <ActivityIndicator size="large" color={Colors.white} />}
            </View>
            }
     

            { <View style={{  alignSelf: 'stretch', flex:1  }}>
                {bids?.length > 0 ?
                    
                    <FlatLists data={bids} lineNumbers={lineNumbers} type={0}></FlatLists>
                    : <ActivityIndicator size="large" color={Colors.white} />}
            </View>
            }
             
        </View>
    )
}

export default MarketBottom
