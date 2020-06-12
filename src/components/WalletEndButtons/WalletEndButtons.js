import React from 'react'
import { View } from 'react-native'
import { Images } from '../../theme'
import BPButtonSmall from '../../common/BPButtonSmall/BPButtonSmall'

const WalletEndButtons = () => {
    return (
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
            <BPButtonSmall label="Important" image={Images.information_icon} image_size={16} noBorder labelStyle={{fontSize:12}}/>
            <BPButtonSmall label="Please Note" image={Images.bell_icon} image_size={12} noBorder labelStyle={{fontSize:12}}/>
        </View>
    )
}

export default WalletEndButtons
