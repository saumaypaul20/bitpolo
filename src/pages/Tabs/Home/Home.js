import React from 'react'
import { View, Text, FlatList,  } from 'react-native'
import { primaryColors } from '../../../utils/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../common/Toolbar/Toolbar'
import { Container, Content } from 'native-base'
import HomeHeaderComp from '../../../components/HomeHeaderComp/HomeHeaderComp'

const DATA = [
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
    {
        id: (Math.random(80)*1000).toString(),
        gainers: 'LINK',
        gainers_sub: 'BDX',
        losers: 0.000333555,
        volume: 5.333
    },
  
]
const ListItem = () =>{
    return(
        <View style={{ flexDirection:'row', alignItems:'flex-start',  paddingVertical:8}}>
            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Text style={{color: primaryColors.white, fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>LINK <Text style={{color: primaryColors.lightWhite, fontSize:10, fontFamily:'Inter-Bold'}}>/ BDX</Text></Text>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Regular', fontSize:12, }}>0.000395656</Text>
                </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                <Text style={{color: primaryColors.lightWhite, fontFamily:'Inter-Medium' , fontSize:12}}>5,153</Text>
                </View>
        </View>
    )
}

const Home = () => {
    return (
        <SafeAreaView style={{flex:1,}}>
            <View style={{ flex: 1, backgroundColor: primaryColors.primeBG }}>
                <Toolbar title="Exchange" backgroundColor={primaryColors.darkGray2}/>

                   <View style={{flex:1}}> 
                    <View style={{paddingVertical:8}}>
                    <FlatList
                            data={DATA}
                            renderItem={({ item }) => <ListItem title={item} />}
                            keyExtractor={item => item.id}
                            ListHeaderComponent={ <HomeHeaderComp />}
                            stickyHeaderIndices={[0]}
                        />
                            
                    </View>
                        
                   </View>
               
            </View>
        </SafeAreaView>
    )
}

export default Home
