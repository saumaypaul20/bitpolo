import React from 'react'
import {Header,Button,Title, Text, Item, Left, Body, Right, Icon, View } from 'native-base';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme';
import BPText from '../../common/BPText/BPText';


const Toolbar = ({ enableBackButton,title, backgroundColor , hasTabs, searchbar }) => {
    const navigation = useNavigation();
    return (
        <View> 

            <Header style={{backgroundColor:backgroundColor || 'transparent', paddingTop:10, paddingBottom:0}} hasTabs={hasTabs }>
                <StatusBar translucent barStyle={Colors.barStyle}  backgroundColor={backgroundColor || Colors.primeBG} />
                <Left style={{flexDirection:'row', alignItems:'center', flex:  0.1}}>
                    {enableBackButton && <Button transparent onPress={()=> navigation.goBack()}>
                        <Icon  name='arrow-back' style={{fontSize:20}} />
                    </Button>}
                   
                </Left>
                <Body style={{flex:enableBackButton ? 0.8 : 2}}>
                {
                        title && <BPText style={{fontSize:20,}}>{title}</BPText>
                    }
                </Body>
                <Right style={{flex:0.2}}>
                   {searchbar && <BPText>O</BPText>}
                </Right>
            </Header>
        
        </View>
    )
}

export default Toolbar
