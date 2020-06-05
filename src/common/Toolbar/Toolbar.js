import React from 'react'
import {Header,Button,Title, Text, Item, Left, Body, Right, Icon, View } from 'native-base';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { primaryColors } from '../../utils/colors';


const Toolbar = ({ enableBackButton,title, backgroundColor , hasTabs, searchbar }) => {
    const navigation = useNavigation();
    return (
        <View> 

            <Header style={{backgroundColor:backgroundColor || 'transparent', paddingTop:10, paddingBottom:0}} hasTabs={hasTabs }>
                <StatusBar translucent barStyle="light-content" backgroundColor={backgroundColor || primaryColors.primeBG} />
                <Left style={{flexDirection:'row', alignItems:'center', flex:0.1}}>
                    {enableBackButton && <Button transparent onPress={()=> navigation.goBack()}>
                        <Icon  name='arrow-back' style={{fontSize:20}} />
                    </Button>}
                   
                </Left>
                <Body style={{flex:0.8}}>
                {
                        title && <Text style={{color:primaryColors.white, fontSize:20,}}>{title}</Text>
                    }
                </Body>
                <Right style={{flex:0.2}}>
                   {searchbar && <Text style={{color:'#fff'}}>O</Text>}
                </Right>
            </Header>
        
        </View>
    )
}

export default Toolbar
