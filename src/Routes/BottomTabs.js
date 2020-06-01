import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Signin from '../pages/Signin/Signin';
import Signup from '../pages/Signup/Signup';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
       
            <Tab.Navigator >
                {/* <Tab.Screen name="Signinn" component={Signin} /> */}
                <Tab.Screen name="Signup" component={Signup} />
                <Tab.Screen name="Signu2p" component={Signup} />
            </Tab.Navigator>
        
    )
}

export default BottomTabs
