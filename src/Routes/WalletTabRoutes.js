import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { screenNames } from './screenNames/screenNames';
import Wallet from '../pages/Tabs/Wallet/Wallet';
import Deposit from '../pages/Tabs/Wallet/Deposit/Deposit';
import Withdraw from '../pages/Tabs/Wallet/Withdraw/Withdraw';
const Stack = createStackNavigator();

const WalletTabRoutes = () => {
    return (
        <Stack.Navigator 
        // initialRouteName = {login ? screenNames.DASHBOARD : screenNames.SIGNIN}
        screenOptions={{
        headerShown: false, 
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS ,
        
    }}>
        <Stack.Screen name= {screenNames.WALLET} component={Wallet} />
        <Stack.Screen name= {screenNames.DEPOSIT} component={Deposit} />
        <Stack.Screen name= {screenNames.WITHDRAW} component={Withdraw} />
    </Stack.Navigator>
    )
}

export default WalletTabRoutes
