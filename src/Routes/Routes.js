import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabs from './BottomTabs'
import Signin from '../pages/Signin/Signin';

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Signin" component={Signin} />
                <Stack.Screen name="Dashboard" children={BottomTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
