import React from 'react'
import {Header,Button,Title, Text, Item, Left, Body, Right, Icon, View } from 'native-base';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Toolbar = ({ title }) => {
    const navigation = useNavigation();
    return (
        <View style={{paddingTop:35}}> 

            <Header style={{backgroundColor:'transaparent', }}>
                <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
                <Left>
                    <Button transparent onPress={()=> navigation.goBack()}>
                        <Icon  name='arrow-back' />
                    </Button>
                </Left>
                <Body/>
                <Right />
            </Header>
        
        </View>
    )
}

export default Toolbar
