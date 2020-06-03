import React from 'react'
import { View, Text,  } from 'react-native'
import { primaryColors } from '../../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
    return (
        <SafeAreaView style={{flex:1,justifyContent:'flex-start', alignItems:'center', backgroundColor: primaryColors.primeBG}}>
            <Text style={{color: primaryColors.white}}>Home</Text>
        </SafeAreaView>
    )
}

export default Home
