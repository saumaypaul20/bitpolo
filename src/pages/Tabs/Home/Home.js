import React from 'react'
import { View, Text, FlatList,  } from 'react-native'
import { primaryColors } from '../../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toolbar from '../../../components/Toolbar/Toolbar'
import { Container, Content } from 'native-base'
import HomeHeaderComp from '../../../components/HomeHeaderComp/HomeHeaderComp'
import BPText from '../../../common/BPText/BPText'
import { Colors } from '../../../styles'

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
                <BPText style={{color: Colors.white, fontFamily:'Inter-Medium' , fontSize:12, alignItems:'center'}}>LINK <BPText style={{color: Colors.lightWhite, fontSize:10, fontFamily:'Inter-Bold'}}>/ BDX</BPText></BPText>
            </View>

            <View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
                <BPText style={{color: Colors.lightWhite, fontFamily:'Inter-Regular', fontSize:12, }}>0.000395656</BPText>
                </View>
            <View style={{flex:1, justifyContent:'center', alignItems:'center', alignSelf:'center'}}>
                <BPText style={{color: Colors.lightWhite, fontFamily:'Inter-Medium' , fontSize:12}}>5,153</BPText>
                </View>
        </View>
    )
}

const Home = () => {
    return (
        <SafeAreaView style={{flex:1,}}>
            <View style={{ flex: 1, backgroundColor: Colors.primeBG }}>
                <Toolbar title="Exchange" backgroundColor={Colors.darkGray2}/>

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
