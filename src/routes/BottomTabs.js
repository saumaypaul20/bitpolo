import React from 'react'
import { Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Tabs/Home/Home';
import Markets from '../pages/Tabs/Markets/Markets';
import Trades from '../pages/Tabs/Trades/Trades';
import Account from '../pages/Tabs/Account/Account';
import { Colors, Images } from '../theme';
import WalletTabRoutes from './WalletTabRoutes';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    return (
       
            <Tab.Navigator
              keyboardHidesTabBar 
              initialRouteName="Wallet"
              
              tabBarOptions={{
                activeTintColor: Colors.tabActiveTintColor,
                style:{
                    backgroundColor:Colors.tabBackgroundColor,
                    borderTopWidth: 0,
                    
                }
                }}

              screenOptions={({ route }) => ({
                 
                tabBarIcon: ({ size, focused }) => {
                  let iconName, active, inactive;
                  if (route.name == "Home") {
                    active = Images.home_icon
                    inactive = Images.home_gray_icon
                  } else if (route.name == "Markets") {
                    active = Images.markets_icon
                    inactive = Images.markets_gray_icon

                  } else if (route.name == "Trades") {
                    active = Images.trade_icon
                    inactive = Images.trade_gray_icon

                  }else if (route.name == "Wallet") {
                    active = Images.wallet_icon
                    inactive = Images.wallet_gray_icon

                  }else if (route.name == "Account") {
                    active = Images.account_icon
                    inactive = Images.account_gray_icon

                  }
                  iconName= focused ? active : inactive
                  return <Image source={iconName} style={{width:size-2, height:size-2, marginTop: 15, marginBottom:10}} resizeMode="contain" />;
                }
                })}
                >
              
                <Tab.Screen name="Home" component={Home} options={{unmountOnBlur:true}}/>
                <Tab.Screen name="Markets" component={Markets} options={{unmountOnBlur:true}}/>
                <Tab.Screen name="Trades" component={Trades} options={{unmountOnBlur:false}}/>
                <Tab.Screen name="Wallet" component={WalletTabRoutes} options={{unmountOnBlur:true}}/>
                <Tab.Screen name="Account" component={Account} options={{tabBarVisible:false,unmountOnBlur:true }}/>
                
            </Tab.Navigator>
        
    )
}


export default BottomTabs
